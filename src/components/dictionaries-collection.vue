<script setup>
import { ref } from "vue";

import DictionaryItem from "@/components/dictionary-item.vue";

const { title, data } = defineProps({
  title: String,
  data: Array || Object,
});

const dictionaries = ref(Array.isArray(data) ? data : Object.values(data));
</script>

<template>
  <h2 class="collection-title">{{ title }}</h2>
  <ul class="collection-list">
    <dictionary-item
      v-for="dictionary in dictionaries"
      :title="dictionary.title"
      :key="dictionary.id"
    />
  </ul>
</template>

<style scoped lang="scss">
.collection-title {
  font-size: 19px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 25px;
}

.collection-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}

@media screen and (max-width: 576px) {
  .page {
    height: fit-content;
  }
  .collection-list {
    flex-direction: column;
    justify-content: baseline;
    align-items: center;
  }
}
</style>
