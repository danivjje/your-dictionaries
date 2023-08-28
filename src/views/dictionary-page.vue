<script setup lang="ts">
import { useRoute } from "vue-router";
import { getDictionary } from "@/helpers/firebase/firebase-requests";
import { ref, computed, Ref, onMounted } from "vue";
import { useStores } from "@/composables/use-stores";
import { IDictionary, IDictionaryWord } from "@/types/interfaces";

import AddWordForm from "@/components/add-word-form.vue";
import GenerateWord from "@/components/generate-word.vue";
import WordsList from "@/components/words-list.vue";

const route = useRoute();
const { commonStore } = useStores();

const dictionary: Ref<IDictionary | undefined> = ref();
const words: Ref<IDictionaryWord[]> = ref([]);
const wordsInWords = computed<string[]>(() => {
  return words.value.reduce((totalWords: string[], word) => {
    totalWords.push(word.word);

    return totalWords;
  }, []);
});

let dictionaryId: string = "";
if (Array.isArray(route.params.id)) {
  dictionaryId = route.params.id[0];
} else {
  dictionaryId = route.params.id;
}

onMounted(async () => {
  if ("uid" in commonStore.currentUser) {
    try {
      commonStore.startLoading();
      const fetchedDictionary = await getDictionary(
        commonStore.currentUser.uid,
        dictionaryId
      );

      if (fetchedDictionary) {
        dictionary.value = fetchedDictionary;

        words.value.push(
          ...dictionary.value.words.reduce((words: IDictionaryWord[], word) => {
            words.push(word);

            return words;
          }, [])
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      commonStore.finishLoading();
    }
  }
});
</script>

<template>
  <div class="page">
    <router-link class="back-link" to="/">
      <button class="back-button icon-button"></button>
    </router-link>

    <div class="title-wrapper">
      <h1>{{ dictionary?.title }}</h1>
      <button class="edit-button icon-button"></button>
    </div>
    <div class="header-buttons">
      <generate-word class="gen-btn" :words="wordsInWords" />
      <add-word-form />
    </div>
    <words-list :words="words" />

    <div class="control-panel">
      <header>
        <span class="text-span">creation info mode:</span>
        <main-button :borderPosition="'left'">on hover / always</main-button>
      </header>
      <footer>
        <main-button :borderPosition="'left'">
          dictionary contributors
        </main-button>
        <main-button :borderPosition="'left'">rename dictionary</main-button>
        <main-button :borderPosition="'left'">
          make private/public
        </main-button>
        <main-button
          :danger="true"
          :borderPosition="'left'"
          class="delete-button"
        >
          delete dictionary
        </main-button>
      </footer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.back-button {
  width: 35px;
  height: 28px;
  background-image: url("/icons/back-icon.svg");
}

.edit-button {
  width: 24px;
  height: 24px;
  background-image: url("/icons/edit-icon.svg");
}

.back-link {
  position: absolute;
  top: 15px;
  left: 15px;
}

.title-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  h1 {
    font-size: 18px;
    font-weight: 400;
    margin-right: 5px;
  }
}

.header-buttons {
  display: flex;
  margin-bottom: 25px;
}

.gen-btn {
  margin-right: 20px;
}

.control-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  header {
    margin-bottom: 20px;
    .text-span {
      margin-right: 10px;
    }
  }
  footer {
    button:not(:last-child) {
      margin-right: 20px;
    }
  }
}
</style>
