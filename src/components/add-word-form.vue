<script setup lang="ts">
import { ref, Ref } from "vue";

const emit = defineEmits(["add-word"]);
const newWord: Ref<string> = ref("");

const handleAddWord = (): void => {
  emit("add-word", newWord.value);
  newWord.value = "";
};
</script>

<template>
  <form @submit.prevent="handleAddWord">
    <main-input
      class="input"
      :placeholder="'enter a word'"
      :type="'text'"
      :borderPosition="'left'"
      v-model="newWord"
    />
    <main-button class="submit-button" :borderPosition="'left'">
      add
    </main-button>
  </form>
</template>

<style scoped lang="scss">
form {
  position: relative;
}

.input {
  padding-right: 100px;
}

.submit-button {
  position: absolute;
  right: 0;
  background-color: var(--body-color);
  &:hover {
    background-color: var(--body-color);
  }
}
</style>
