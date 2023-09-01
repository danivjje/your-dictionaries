<script setup lang="ts">
import { IDictionaryWord } from "@/types/interfaces";

const emit = defineEmits(["word-delete", "toggle-favorite"]);
const { words } = defineProps<{
  words: IDictionaryWord[];
  showCreationInfo: boolean;
}>();
</script>
<template>
  <ul class="list">
    <transition-group name="words">
      <li
        v-for="(word, index) in words"
        :show-creation-info="showCreationInfo"
        :word="word"
        :key="`${word.word}-${index}`"
        class="item"
      >
        <toggle-icon-button
          @click="emit('toggle-favorite', word)"
          class="favorite-button"
          :defaultValue="word.isFavorite"
          activeIcon="favorite-icon.svg"
          inactiveIcon="unfavorite-icon.svg"
        />
        <div class="word-wrapper left-border">
          <span class="word">{{ word.word }}</span>
          <button @click="emit('word-delete', word)" class="delete-wrapper icon-button left-border">
            <span class="icon-button delete-icon"></span>
          </button>
        </div>
        <transition name="creation-info">
          <span v-if="showCreationInfo" class="create-info">
            {{ word.creationDate }}
          </span>
        </transition>
      </li>
    </transition-group>
  </ul>
</template>

<style scoped lang="scss">
.list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 80px;
  li {
    margin: 0 10px 10px 10px;
  }
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.favorite-button {
  width: 22px;
  height: 18px;
  margin-bottom: 5px;
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
  margin-top: 2px;
  font-size: 14px;
}

.creation-info-enter-active,
.creation-info-leave-active {
  transition-property: opacity, transform;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
}

.creation-info-enter-from,
.creation-info-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.words-enter-active,
.words-leave-active {
  transition-property: opacity, transform;
  transition-duration: 350ms;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
}

.words-enter-from,
.words-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
</style>
