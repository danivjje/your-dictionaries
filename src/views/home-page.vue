<script setup>
import DictionariesCollection from "@/components/dictionaries-collection.vue";

const data = [
  { title: "grushko words", id: 1 },
  { title: "grushko words", id: 2 },
  { title: "grushko words", id: 3 },
  { title: "grushko words", id: 4 },
];
</script>

<template>
  <dictionaries-collection :title="'my collection'" :data="data" />
</template>

<style scoped lang="scss"></style>
