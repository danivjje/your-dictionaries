<script setup lang="ts">
import { signOutUser } from "@/helpers/firebase/firebase-requests";
import { useStores } from "@/composables/use-stores";
import { useRouter } from "vue-router";
import { Ref, onMounted, ref } from "vue";

import DictionariesCollection from "@/components/dictionaries-collection.vue";
import GenerateWord from "@/components/generate-word.vue";

const { commonStore, dictionariesStore } = useStores();
const router = useRouter();
const words: Ref<string[]> = ref([]);

const handleSignOut = async (): Promise<void> => {
  try {
    commonStore.startLoading();
    await signOutUser();
    dictionariesStore.clearDictionariesList();
    commonStore.useNotification("logout: successfully");
    router.push({ path: "/sign-in" });
  } catch (err) {
    commonStore.useNotification(
      "logout: oops.. unknown error, try again or reload the page (f5). sorry =("
    );
  } finally {
    commonStore.finishLoading();
  }
};

onMounted(async () => {
  dictionariesStore.clearDictionariesList();
  words.value.length = 0;

  await dictionariesStore.fetchDictionaries();
  dictionariesStore.sortByPinned();

  words.value.push(
    ...dictionariesStore.dictionaries.reduce(
      (totalWords: string[], dictionary) => {
        const dictionaryWords = dictionary.words.reduce(
          (dicWords: string[], word) => {
            dicWords.push(word.word);
            return dicWords;
          },
          []
        );

        totalWords.push(...dictionaryWords);
        return totalWords;
      },
      []
    )
  );
});
</script>

<template>
  <div class="page">
    <main-button
      class="log-out-btn"
      :borderPosition="'left'"
      @click="handleSignOut"
      >log out from account</main-button
    >
    <generate-word :words="words" class="gen-btn" />
    <dictionaries-collection
      :title="'my collection'"
      :data="dictionariesStore.dictionaries"
    />
  </div>
</template>

<style scoped lang="scss">
.page {
  padding: 10px 15px;
}

.log-out-btn {
  margin-bottom: 15px;
}

.gen-btn {
  margin-bottom: 35px;
}
</style>
