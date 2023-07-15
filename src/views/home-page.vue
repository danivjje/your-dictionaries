<script setup>
import { data } from "@/api/test-api";
import { signOutUser } from "@/api/firebase/firebase-requests";

import DictionariesCollection from "@/components/dictionaries-collection.vue";
import GenerateWord from "@/components/generate-word.vue";

const words = ["asssssssd", "htroijfohjf", "qwweeeee", "zxxcccc"];
</script>

<template>
  <div class="page">
    <main-button
      class="log-out-btn"
      :borderPosition="'left'"
      @click="signOutUser"
      >log out from account</main-button
    >
    <generate-word :words="words" class="gen-btn" />
    <dictionaries-collection :title="'my collection'" :data="data" />
  </div>
</template>

<style scoped lang="scss">
.page {
  padding: 0 15px;
}

.log-out-btn {
  margin-bottom: 25px;
}

.gen-btn {
  margin-bottom: 35px;
}
</style>
