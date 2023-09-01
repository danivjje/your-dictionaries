<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { getDictionary, toggleIsFavoriteWord } from "@/helpers/firebase/firebase-requests";
import { ref, Ref, onMounted, ComponentPublicInstance } from "vue";
import { useStores } from "@/composables/use-stores";
import { IDictionary, IDictionaryWord } from "@/types/interfaces";

import AddWordForm from "@/components/add-word-form.vue";
import GenerateWord from "@/components/generate-word.vue";
import WordsList from "@/components/words-list.vue";
import DictionaryControlPanel from "@/components/dictionary-control-panel.vue";

const route = useRoute();
const router = useRouter();
const { commonStore, dictionariesStore } = useStores();

let dictionaryId: string = "";
if (Array.isArray(route.params.id)) {
  dictionaryId = route.params.id[0];
} else {
  dictionaryId = route.params.id;
}

const goEdit: Ref<boolean> = ref(false);
const editedTitle: Ref<string> = ref("title");
const creationInfoShowMode: Ref<boolean> = ref(getCurrentCreationInfoMode());

const mutableTitleReference: Ref<null | ComponentPublicInstance> = ref(null);

const dictionary: Ref<IDictionary | null> = ref(null);
const dictionaryWords: Ref<IDictionaryWord[]> = ref([]);
const dictionaryIsPrivate: Ref<boolean> = ref(false);

const handleToggleCreationInfoMode = (): void => {
  creationInfoShowMode.value = !creationInfoShowMode.value;
  localStorage.setItem("creation-info-mode", String(creationInfoShowMode.value));
};

const handleRenameDictionary = (): void => {
  if (!goEdit.value) {
    goEdit.value = true;
    window.scrollTo(0, 0);
    window.addEventListener("scrollend", () => {
      setTimeout(() => {
        if (mutableTitleReference.value) {
          const childRef = mutableTitleReference.value;

          if (childRef.$refs.inputReference) {
            const inputElement = childRef.$refs.inputReference as HTMLInputElement;
            inputElement.focus();
          }
        }
      }, 50);
    });
  } else {
    if (editedTitle.value !== dictionary.value?.title) {
      dictionariesStore.editDictionaryName(dictionaryId, editedTitle.value);
    }
    goEdit.value = false;
  }
};

const handleDeleteDictionary = async (): Promise<void> => {
  await dictionariesStore.removeDictionary(dictionaryId);
  router.push({ path: "/" });
};

const handleToggleDictionaryPrivateStatus = async (): Promise<void> => {
  dictionaryIsPrivate.value = !dictionaryIsPrivate.value;
  await dictionariesStore.toggleDictionaryPrivateStatus(dictionaryId, dictionaryIsPrivate.value);
};

const handleAddDictionaryWord = async (newWord: string): Promise<void> => {
  await dictionariesStore.addWordInDictionary(dictionaryId, newWord, dictionaryWords.value);
  dictionaryWords.value = dictionaryWords.value.slice(0);
};

const handleDeleteDictionaryWord = async (word: IDictionaryWord): Promise<void> => {
  const wordsWithoutRemovedWord = await dictionariesStore.removeWordFromDictionary(
    dictionaryId,
    word,
    dictionaryWords.value,
  );
  if (wordsWithoutRemovedWord) {
    dictionaryWords.value = wordsWithoutRemovedWord;
  }
};

const handleToggleFavoriteWord = async (word: IDictionaryWord): Promise<void> => {
  if ("uid" in commonStore.currentUser) {
    try {
      commonStore.startLoading();
      await toggleIsFavoriteWord(commonStore.currentUser.uid, dictionaryId, word);
    } catch (err) {
      console.log(err);
    } finally {
      commonStore.finishLoading();
    }
  }
};

function getCurrentCreationInfoMode(): boolean {
  const currentValue: string | null = localStorage.getItem("creation-info-mode");
  return currentValue === "true";
}

async function fetchDictionary(): Promise<void> {
  const foundDictionaryIndex: number = dictionariesStore.dictionaries.findIndex((item) => {
    return item.id === dictionaryId;
  });
  if (foundDictionaryIndex !== -1) {
    dictionary.value = dictionariesStore.dictionaries[foundDictionaryIndex];
    editedTitle.value = dictionariesStore.dictionaries[foundDictionaryIndex].title;
    dictionaryWords.value = dictionariesStore.dictionaries[foundDictionaryIndex].words;
    dictionaryIsPrivate.value = dictionariesStore.dictionaries[foundDictionaryIndex].isPrivate;
  } else {
    if ("uid" in commonStore.currentUser) {
      try {
        commonStore.startLoading();
        const fetchedDictionary: IDictionary = await getDictionary(commonStore.currentUser.uid, dictionaryId);
        dictionary.value = fetchedDictionary;
        editedTitle.value = fetchedDictionary.title;
        dictionaryWords.value = fetchedDictionary.words;
        dictionaryIsPrivate.value = fetchedDictionary.isPrivate;
      } catch (err) {
        console.log(err);
      } finally {
        commonStore.finishLoading();
      }
    }
  }
}

onMounted(() => {
  fetchDictionary();
});
</script>

<template>
  <div class="page">
    <router-link class="back-link" to="/">
      <button class="back-button icon-button"></button>
    </router-link>

    <mutable-title
      @keydown.enter="handleRenameDictionary"
      class="title"
      ref="mutableTitleReference"
      v-model="editedTitle"
      :isEdit="goEdit"
    />
    <div class="header-buttons">
      <generate-word class="gen-btn" :words="dictionaryWords" />
      <add-word-form @add-word="(newWord: string) => handleAddDictionaryWord(newWord)" />
    </div>
    <words-list
      :words="dictionaryWords"
      :show-creation-info="creationInfoShowMode"
      @word-delete="(word) => handleDeleteDictionaryWord(word)"
      @toggle-favorite="(word) => handleToggleFavoriteWord(word)"
    />
    <dictionary-control-panel
      @delete="handleDeleteDictionary"
      @rename="handleRenameDictionary"
      @toggle-info="handleToggleCreationInfoMode"
      @change-private="handleToggleDictionaryPrivateStatus"
      :creationInfoCurrentMode="creationInfoShowMode"
      :current-private-status="dictionaryIsPrivate"
    />
  </div>
</template>

<style scoped lang="scss">
.page {
  padding: 0 15px 10px 15px;
}

.back-button {
  width: 35px;
  height: 28px;
  background-image: url("/icons/back-icon.svg");
}

.back-link {
  position: absolute;
  top: 15px;
  left: 15px;
}

.title {
  margin-bottom: 25px;
  font-size: 18px;
  font-weight: 400;
  max-width: 30%;
}

.header-buttons {
  display: flex;
  margin-bottom: 25px;
}

.gen-btn {
  margin-right: 20px;
}
</style>
