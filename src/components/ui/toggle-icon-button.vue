<script setup lang="ts">
import { Ref, ref } from "vue";

const emit = defineEmits(["toggle"]);
const { activeIcon, inactiveIcon, defaultValue } = defineProps<{
  activeIcon: string;
  inactiveIcon: string;
  defaultValue: boolean;
}>();

const isActive: Ref<boolean> = ref(defaultValue);

const handleToggleIcon = (): void => {
  emit("toggle");
  isActive.value = !isActive.value;
};
</script>

<template>
  <div class="wrapper">
    <transition name="icon">
      <button
        v-if="isActive"
        @click="handleToggleIcon"
        :style="`background-image: url(/icons/${activeIcon})`"
        class="icon-button"
      ></button>
      <button
        v-else
        @click="handleToggleIcon"
        :style="`background-image: url(/icons/${inactiveIcon})`"
        class="icon-button"
      ></button>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  position: relative;
  width: 28px;
  height: 28px;
  button {
    background-size: contain;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
}

.icon-enter-active,
.icon-leave-active {
  transition-property: opacity, transform;
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
}

.icon-enter-from,
.icon-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
