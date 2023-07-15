<script setup>
const { word } = defineProps({
  word: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <li class="item">
    <!-- <button class="icon-button favorite-button"></button> -->
    <toggle-icon-button
      class="favorite-button"
      :activeIcon="'favorite-icon.svg'"
      :inactiveIcon="'unfavorite-icon.svg'"
    />
    <div class="word-wrapper left-border">
      <span class="word">{{ word.word }}</span>
      <button class="delete-wrapper icon-button left-border">
        <span class="icon-button delete-icon"></span>
      </button>
    </div>
    <span class="create-info">{{ word.creationDate }}</span>
  </li>
</template>

<style scoped lang="scss">
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.favorite-button {
  width: 22px;
  height: 18px;
  margin-bottom: 3px;
}

.word-wrapper {
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  .word {
    font-size: 16px;
    line-height: 18px;
    padding: 0 33px;
  }
}

.delete-wrapper {
  cursor: pointer;
  border: none;
  background-color: var(--danger-color);
  width: 34px;
  height: 34px;
  position: relative;
}

.delete-icon {
  position: absolute;
  inset: 0;
  background-image: url("/icons/remove-icon.svg");
  background-position: center center;
  background-size: 65% 65%;
  transform: rotate(-33deg);
}

.create-info {
  font-size: 14px;
}
</style>
