<script setup lang="ts">
import { useStores } from "@/composables/use-stores";

const { commonStore } = useStores();
const emit = defineEmits(["response"]);

const handleSendGoodResponse = (): void => {
  emit("response", true);
  commonStore.confirm.isShowed = false;
};

const handleSendBadResponse = (): void => {
  emit("response", false);
  commonStore.confirm.isShowed = false;
};
</script>

<template>
  <transition name="confirm">
    <div v-if="commonStore.confirm.isShowed" class="confirm-wrapper left-border">
      <h4 class="confirm-wrapper-title">{{ commonStore.confirm.text }}</h4>
      <div class="confirm-wrapper-buttons">
        <main-button @click="handleSendGoodResponse" borderPosition="left" class="choose-button">okey</main-button>
        <main-button @click="handleSendBadResponse" borderPosition="left" class="choose-button">cancel</main-button>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.confirm-wrapper {
  position: fixed;
  z-index: 999999999999999999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 280px;
  padding: 15px 30px;
  background-color: var(--background-color);
  &-title {
    color: var(--font-color);
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 30px;
  }
  &-buttons {
    display: flex;
    button {
      border-radius: 5px 15px 5px 15px;
      &:hover {
        background-color: var(--body-color);
      }
      &:not(:last-child) {
        margin-right: 15px;
      }
    }
  }
}

.choose-button {
  background-color: var(--body-color);
}

.confirm-enter-active,
.confirm-leave-active {
  transition-property: opacity, transform;
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
}

.confirm-enter-from,
.confirm-leave-to {
  opacity: 0;
  transform: translate(-50%, -300px);
}
</style>
