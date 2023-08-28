<script setup lang="ts">
import { ref, reactive, Ref } from "vue";
import { useStores } from "@/composables/use-stores";
import { IDictionary } from "@/types/interfaces";
import { updateDictionaryValue } from "@/helpers/firebase/firebase-requests";
import { IAddWordModalInformation } from "@/types/interfaces";

import CreateNewWordModal from "./modals/create-new-word-modal.vue";

const { dictionariesStore, commonStore } = useStores();
const { dictionary } = defineProps<{
  dictionary: IDictionary;
}>();

const goEdit: Ref<boolean> = ref(false);
const editedTitle: Ref<string> = ref(dictionary.title);
const addWordModalInfo: IAddWordModalInformation = reactive({
  isActive: false,
  xCoordinate: 0,
  yCoordinate: 0,
});

const handleAddDictionaryWord = async (newWord: string): Promise<void> => {
  await dictionariesStore.addWordInDictionary(dictionary.id, newWord);
  addWordModalInfo.isActive = false;
};

const handleTogglePin = async (): Promise<void> => {
  dictionary.isPinned = !dictionary.isPinned;
  try {
    if ("uid" in commonStore.currentUser) {
      const dictionaryIndex = dictionariesStore.dictionaries.findIndex(
        (item) => {
          return item.id === dictionary.id;
        }
      );
      await updateDictionaryValue(
        commonStore.currentUser.uid,
        dictionary.id,
        "isPinned",
        dictionary.isPinned
      );
      dictionariesStore.dictionaries[dictionaryIndex].isPinned =
        dictionary.isPinned;
      dictionariesStore.sortByPinned();
    }
  } catch (err) {
    console.log("err: ", err);
  }
};

const handleTogglePrivate = (): void => {
  dictionary.isPrivate = !dictionary.isPrivate;
  dictionariesStore.toggleDictionaryPrivateStatus(
    dictionary.id,
    dictionary.isPrivate
  );
};

const handleEditCollectionTitle = (): void | false => {
  if (goEdit.value) {
    if (dictionary.title === editedTitle.value) {
      return (goEdit.value = false);
    }

    dictionary.title = editedTitle.value;
    dictionariesStore.editDictionaryName(dictionary.id, editedTitle.value);
    goEdit.value = false;
  } else {
    goEdit.value = true;
  }
};

const handlePlusButtonClick = (event: Event): void => {
  event.stopPropagation();
  if (!addWordModalInfo.isActive) {
    addWordModalInfo.isActive = true;
    const mouseEvent = event as MouseEvent;
    addWordModalInfo.xCoordinate = mouseEvent.clientX;
    addWordModalInfo.yCoordinate = mouseEvent.clientY;
  } else {
    addWordModalInfo.isActive = false;
  }
};

window.addEventListener("click", (): void => {
  addWordModalInfo.isActive = false;
});
</script>

<template>
  <li class="item">
    <teleport to="body">
      <transition name="word-modal">
        <create-new-word-modal
          v-if="addWordModalInfo.isActive"
          :x-coordinate="addWordModalInfo.xCoordinate"
          :y-coordinate="addWordModalInfo.yCoordinate"
          @add-click="(newWord: string) => handleAddDictionaryWord(newWord)"
        />
      </transition>
    </teleport>
    <router-link class="link" :to="`/dictionary/${dictionary.id}`">
      <mutable-title
        class="dictionary-title"
        :isEdit="goEdit"
        v-model="editedTitle"
        @click.prevent
      />
      <div class="dictionary left-border">
        <div class="buttons-top-wrapper">
          <button
            @click.prevent="handleEditCollectionTitle()"
            class="do-button icon-button edit-button"
          ></button>

          <toggle-icon-button
            class="do-button pin-button"
            @toggle="handleTogglePin"
            @click.prevent
            :defaultValue="dictionary.isPinned"
            activeIcon="pin-icon.svg"
            inactiveIcon="unpin-icon.svg"
          />
        </div>
        <button
          @click.prevent="handlePlusButtonClick($event)"
          class="do-button icon-button plus-button"
        ></button>
        <div class="buttons-bottom-wrapper">
          <toggle-icon-button
            @toggle="handleTogglePrivate"
            @click.prevent
            :defaultValue="dictionary.isPrivate"
            activeIcon="lock-icon.svg"
            inactiveIcon="unlock-icon.svg"
          />
          <button
            @click.prevent="dictionariesStore.removeDictionary(dictionary.id)"
            class="do-button icon-button delete-button"
          ></button>
        </div>
      </div>
    </router-link>
  </li>
</template>

<style scoped lang="scss">
.item {
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 200px;
  width: 100%;
  margin: 0 5px 15px 5px;
  flex-grow: 0;
  .link {
    width: 100%;
  }
  .dictionary {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    min-height: 200px;
    background-color: var(--background-color);
  }
}

.dictionary-title {
  margin-bottom: 5px;
}

.do-button {
  width: 28px;
  height: 28px;
}

.buttons-top-wrapper {
  top: 5px;
  left: 5px;
}

.buttons-top-wrapper,
.buttons-bottom-wrapper {
  display: flex;
  position: absolute;
  z-index: 50;
}

.buttons-bottom-wrapper {
  bottom: 5px;
  right: 5px;
}

.pin-button {
  transform: scaleX(-1);
}

.edit-button {
  background-image: url("/icons/edit-icon.svg");
}

.plus-button {
  background-image: url("/icons/add-icon.svg");
}

.delete-button {
  background-image: url("/icons/remove-icon.svg");
}

.word-modal-enter-active,
.word-modal-leave-active {
  transition-property: opacity, transform;
  transition-duration: 350ms;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
}

.word-modal-enter-from,
.word-modal-leave-to {
  opacity: 0;
  transform: translateY(-150px);
}

@media screen and (max-width: 576px) {
  .item {
    max-width: 100%;
  }
}
</style>
