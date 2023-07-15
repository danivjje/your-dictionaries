<script setup>
import WordItem from "@/components/word-item.vue";

const { words } = defineProps({
  words: {
    type: Array,
    required: true,
  },
});
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
