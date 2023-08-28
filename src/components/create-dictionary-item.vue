<script setup lang="ts">
import { ref, Ref } from "vue";
import { useStores } from "@/composables/use-stores";

const newTitle: Ref<string> = ref("");
const { dictionariesStore } = useStores();

const handleAddDictionary = (): void => {
  dictionariesStore.addDictionary(newTitle.value);
  newTitle.value = "";
};
</script>

<template>
  <li class="create-dictionary-item">
    <div>
      <input
        type="text"
        v-model="newTitle"
        :placeholder="'your new dictionary'"
      />
      <div class="left-border">
        <transition name="span">
          <span class="enter-text-span" v-if="!newTitle">
            enter text in field for create a dictionary
          </span>
        </transition>
        <button
          :disabled="!newTitle"
          class="icon-button plus-button"
          @click="handleAddDictionary"
        ></button>
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
.create-dictionary-item {
  display: flex;
  align-items: flex-end;
  max-width: 200px;
  width: 100%;
  margin: 0 5px 15px 5px;
  flex-grow: 0;
  input {
    margin-top: auto;
    background: transparent;
    border: none;
    font-size: 15px;
    padding: 5px 15px;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 5px;
    width: 100%;
    outline: 2px solid var(--focus-color);
  }
  div {
    div {
      position: relative;
      margin-top: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: var(--background-color);
      width: 100%;
      padding: 10px;
      min-height: 200px;
    }
  }
}

.enter-text-span {
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  position: absolute;
  top: 30px;
  max-width: 90%;
}

.plus-button {
  width: 28px;
  height: 28px;
  background-image: url("/icons/add-icon.svg");
}

.span-enter-active,
.span-leave-active {
  transition-property: opacity, transform;
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
}

.span-enter-from,
.span-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
