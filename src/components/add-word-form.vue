<script setup lang="ts">
import { ref, Ref } from "vue";

const word: Ref<string> = ref("");
</script>

<template>
  <form @submit.prevent>
    <main-input
      class="input"
      :placeholder="'enter a word'"
      :type="'text'"
      :borderPosition="'left'"
      v-model="word"
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
