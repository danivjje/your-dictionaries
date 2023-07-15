<script setup>
import { ref } from "vue";

const { activeIcon, inactiveIcon, defaultValue } = defineProps({
  activeIcon: {
    type: String,
    required: true,
  },
  inactiveIcon: {
    type: String,
    required: true,
  },
  defaultValue: {
    type: Boolean,
    // required: true
  },
});

const isActive = ref(defaultValue);
const emit = defineEmits(["ontoggle"]);

const toggleActive = () => {
  emit("ontoggle", !isActive.value);
  isActive.value = !isActive.value;
};
</script>

<template>
  <div class="wrapper">
    <transition name="icon">
      <button
        v-if="isActive"
        @click="toggleActive"
        class="icon-button"
        :style="`background-image: url(/icons/${activeIcon})`"
      ></button>
      <button
        v-else
        @click="toggleActive"
        class="icon-button"
        :style="`background-image: url(icons/${inactiveIcon})`"
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
