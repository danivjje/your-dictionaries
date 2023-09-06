<script setup lang="ts">
import { signOutUser } from "@/helpers/firebase/firebase-requests";
import { useStores } from "@/composables/use-stores";
import { useRouter } from "vue-router";
import { Ref, onMounted, ref } from "vue";

import DictionariesCollection from "@/components/dictionaries-collection.vue";
import GenerateWord from "@/components/generate-word.vue";
import { IDictionaryWord } from "@/types/interfaces";

const { commonStore, dictionariesStore } = useStores();
const router = useRouter();
const words: Ref<IDictionaryWord[]> = ref([]);

const handleSignOut = async (): Promise<void> => {
  try {
    commonStore.startLoading();
    await signOutUser();
    dictionariesStore.clearDictionariesList();
    commonStore.useNotification("logout: successfully");
    router.push({ path: "/sign-in" });
  } catch (err) {
    commonStore.useNotification("logout: oops.. unknown error, try again or reload the page (f5). sorry =(");
  } finally {
    commonStore.finishLoading();
  }
};

onMounted(async () => {
  dictionariesStore.clearDictionariesList();

  await dictionariesStore.fetchDictionaries();
  dictionariesStore.sortByPinned();

  words.value = [
    ...dictionariesStore.dictionaries.reduce((totalWords: IDictionaryWord[], dictionary) => {
      totalWords.push(...dictionary.words);
      return totalWords;
    }, []),
  ];
});
</script>

<template>
  <div class="page">
    <main-button class="log-out-btn" borderPosition="top" @click="handleSignOut">log out from account</main-button>
    <div class="header-buttons">
      <generate-word :words="words" class="gen-btn" />
      <router-link to="/favorite-dictionary">
        <main-button class="favorite-words-button" borderPosition="right">favorite words</main-button>
      </router-link>
    </div>
    <dictionaries-collection :title="'my collection'" :data="dictionariesStore.dictionaries" />
  </div>
</template>

<style scoped lang="scss">
.page {
  padding: 10px 15px;
}

.log-out-btn {
  margin-bottom: 15px;
}

.header-buttons {
  display: flex;
  margin-bottom: 35px;
  button {
    &:not(:last-child) {
      margin-right: 15px;
    }
  }
}

.favorite-words-button {
  height: 100%;
}
</style>
