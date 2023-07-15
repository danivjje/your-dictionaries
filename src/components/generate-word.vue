<script setup>
import { onMounted, ref } from "vue";

const { words } = defineProps({
  words: {
    type: Array,
    required: true,
  },
});

const generatedWord = ref("");

const generateWord = () => {
  const randomIndex = Math.ceil(Math.random() * (words.length - 1));
  const randomWord = words[randomIndex];
  if (randomWord !== generatedWord.value) {
    generatedWord.value = randomWord;
    return randomWord;
  } else generateWord();
};

onMounted(() => (generatedWord.value = generateWord()));
</script>

<template>
  <main-button :borderPosition="'left'" @click="generateWord">
    {{ generatedWord }} (click)
  </main-button>
</template>

<style scoped lang="scss"></style>
