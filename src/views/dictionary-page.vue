<script setup>
import AddWordForm from "@/components/add-word-form.vue";
import GenerateWord from "@/components/generate-word.vue";
import WordsList from "@/components/words-list.vue";

const words = [
  {
    word: "скинхеду",
    isFavorite: false,
    creationDate: "7/14/2023",
  },
  {
    word: "яйца",
    isFavorite: false,
    creationDate: "7/14/2023",
  },
  {
    word: "отрежу",
    isFavorite: false,
    creationDate: "7/14/2023",
  },
  {
    word: "борщик",
    isFavorite: false,
    creationDate: "7/14/2023",
  },
  {
    word: "когда",
    isFavorite: false,
    creationDate: "7/14/2023",
  },
];
</script>

<template>
  <div class="page">
    <router-link class="back-link" to="/">
      <button class="back-button icon-button"></button>
    </router-link>

    <div class="title-wrapper">
      <h1>dictionary title</h1>
      <button class="edit-button icon-button"></button>
    </div>
    <div class="header-buttons">
      <generate-word
        class="gen-btn"
        :words="['скинхеду', 'яйца', 'отрежу', 'борщик', 'когда']"
      />
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
  }
  footer {
    button:not(:last-child) {
      margin-right: 20px;
    }
  }
}
</style>
