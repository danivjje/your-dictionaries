<script setup lang="ts">
import { IDictionaryWord } from "@/types/interfaces";
import { onMounted, ref, Ref, toRefs, watch } from "vue";

const props = defineProps<{
  words: IDictionaryWord[];
}>();

const { words } = toRefs(props);
const generatedWord: Ref<string> = ref("");

const generateWord = (): string => {
  if (words.value.length) {
    if (words.value.length > 1) {
      const randomIndex: number = Math.round(Math.random() * (words.value.length - 1));
      const randomWord: string = words.value[randomIndex].word + " (click)";
      if (randomWord !== generatedWord.value) return randomWord;
      else {
        return generateWord();
      }
    } else {
      return words.value[0].word + " (click)";
    }
  } else {
    return "you haven't any words in you dictionary(-ies)";
  }
};

const changeWord = (): void => {
  generatedWord.value = generateWord();
};

watch(words, () => changeWord());
onMounted(() => changeWord());
</script>

<template>
  <main-button borderPosition="left" @click="changeWord">
    {{ generatedWord }}
  </main-button>
</template>

<style scoped lang="scss"></style>
