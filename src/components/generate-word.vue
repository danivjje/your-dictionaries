<script setup lang="ts">
import { onMounted, ref, Ref, watch } from "vue";
const { words } = defineProps<{
  words: string[];
}>();

watch(words, () => {
  generatedWord.value = generateWord();
});

const generatedWord: Ref<string> = ref("");

const generateWord = (): string => {
  if (words.length) {
    const randomIndex: number = Math.ceil(Math.random() * (words.length - 1));
    const randomWord: string = words[randomIndex];
    if (randomWord !== generatedWord.value) {
      generatedWord.value = randomWord;
      return randomWord;
    } else {
      return generateWord();
    }
  }

  return "you don't have any words in your dictionary(-ies)";
};

onMounted(() => (generatedWord.value = generateWord()));
</script>

<template>
  <main-button :borderPosition="'left'" @click="generateWord">
    {{ generatedWord }} (click)
  </main-button>
</template>

<style scoped lang="scss"></style>
