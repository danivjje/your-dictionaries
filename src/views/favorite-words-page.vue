<script setup lang="ts">
import GenerateWord from "@/components/generate-word.vue";
import WordsList from "@/components/words-list.vue";
import { useStores } from "@/composables/use-stores";
import { IDictionaryWord } from "@/types/interfaces";
import { Ref, onMounted, ref } from "vue";

const { dictionariesStore } = useStores();
const favoriteWords: Ref<IDictionaryWord[]> = ref([]);
const showCreationInfo: Ref<boolean> = ref(localStorage.getItem("FAVORITE-creation-info-mode") === "true");

const handleCreationInfoMode = (): void => {
  showCreationInfo.value = !showCreationInfo.value;
  localStorage.setItem("FAVORITE-creation-info-mode", String(showCreationInfo.value));
};

onMounted(async () => {
  dictionariesStore.clearDictionariesList();
  await dictionariesStore.fetchDictionaries();

  favoriteWords.value = dictionariesStore.dictionaries.reduce((acc: IDictionaryWord[], dictionary) => {
    acc.push(...dictionary.words.filter((item) => item.isFavorite === true));
    return acc;
  }, []);
});
</script>

<template>
  <div class="page">
    <router-link class="back-link" to="/">
      <button class="back-button icon-button"></button>
    </router-link>

    <h1 class="title">favorite words</h1>
    <div class="header-buttons">
      <generate-word class="gen-btn" :words="favoriteWords" />
      <main-button :danger="true" borderPosition="right">clear dictionary</main-button>
    </div>
    <words-list :words="favoriteWords" :show-creation-info="showCreationInfo" />

    <div class="toggle-info-wrapper">
      <span class="toggle-info-span">creation info mode:</span>
      <main-button @click="handleCreationInfoMode" borderPosition="right">
        {{ showCreationInfo ? "show" : "hide" }}
      </main-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  padding: 0 15px 10px 15px;
}

.back-button {
  width: 35px;
  height: 28px;
  background-image: url("/icons/back-icon.svg");
}

.back-link {
  position: absolute;
  top: 15px;
  left: 15px;
}

.title {
  margin-bottom: 25px;
  font-size: 18px;
  font-weight: 400;
  max-width: 30%;
}

.header-buttons {
  display: flex;
  margin-bottom: 25px;
}

.gen-btn {
  margin-right: 20px;
}

.toggle-info {
  &-wrapper {
    margin-top: auto;
  }
  &-span {
    margin-right: 15px;
  }
}
</style>
