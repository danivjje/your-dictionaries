<script setup lang="ts">
import { toRefs } from "vue";
import { IDictionary } from "@/types/interfaces";

import DictionaryItem from "@/components/dictionary-item.vue";
import CreateDictionaryItem from "@/components/create-dictionary-item.vue";

const props = defineProps<{
  title: string;
  data: IDictionary[];
}>();

const { title, data } = toRefs(props);
</script>

<template>
  <h2 class="collection-title">{{ title }}</h2>
  <ul class="collection-list">
    <transition-group name="dictionaries">
      <dictionary-item
        v-for="dictionary in data"
        :dictionary="dictionary"
        :key="dictionary.id"
      />
      <create-dictionary-item key="create-new-item" />
    </transition-group>
  </ul>
</template>

<style scoped lang="scss">
.collection-title {
  font-size: 19px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 5px;
}

.collection-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}

.dictionaries-enter-active,
.dictionaries-leave-active {
  transition-property: opacity, transform;
  transition-duration: 350ms;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
}

.dictionaries-enter-from,
.dictionaries-leave-to {
  opacity: 0;
  transform: translateY(-100px);
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
