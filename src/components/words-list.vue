<script setup lang="ts">
import WordItem from "@/components/word-item.vue";
import { IDictionaryWord } from "@/types/interfaces";

const { words } = defineProps<{
  words: IDictionaryWord[];
}>();
</script>

<template>
  <ul class="list">
    <word-item v-for="word in words" :word="word" />
  </ul>
</template>

<style scoped lang="scss">
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 35px;
  li {
    margin: 0 10px;
  }
}
</style>
