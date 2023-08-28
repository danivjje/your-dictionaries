<script setup lang="ts">
import { Ref, ref } from "vue";

const emit = defineEmits(["add-click"]);
const { xCoordinate, yCoordinate } = defineProps<{
  xCoordinate: number;
  yCoordinate: number;
}>();

const newWord: Ref<string> = ref("");

const handleAddWord = (): void => {
  emit("add-click", newWord.value);
  newWord.value = "";
};
</script>

<template>
  <div
    :style="`left: ${xCoordinate}px; top: ${yCoordinate}px`"
    class="modal-wrapper right-border"
  >
    <div class="modal-left">
      <p @click.stop class="modal-text">enter new word in the field</p>
      <main-input
        @click.stop
        class="modal-input left-border"
        placeholder="new word"
        type="text"
        v-model="newWord"
      />
    </div>
    <button @click.stop="handleAddWord" class="add-button right-border">
      add
    </button>
  </div>
</template>

<style scoped lang="scss">
.modal {
  &-wrapper {
    position: absolute;
    z-index: 894345345;
    padding: 15px 20px;
    background-color: var(--body-color);
    max-width: 250px;
    min-height: 70px;
    display: flex;
    width: 100%;
  }
  &-input {
    font-size: 16px;
    background-color: var(--background-color);
    width: 100%;
    &:focus {
      outline: 1px solid var(--focus-color);
    }
  }
  &-left {
    width: 73%;
    flex-shrink: 0;
    margin-right: 5px;
  }
  &-text {
    color: var(--font-color);
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 8px;
  }
}

.add-button {
  cursor: pointer;
  border: none;
  padding: 8px 15px;
  background-color: var(--background-color);
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  width: 80px;
  flex-shrink: 0;
  transform: translateY(27px) rotate(90deg);
  height: fit-content;
}
</style>
