<script setup>
const { borderPosition } = defineProps({
  borderPosition: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <button :class="borderPosition + '-border'">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
button {
  cursor: pointer;
  padding: 10px 30px;
  background-color: var(--background-color);
  border: none;

  transition-property: background-color, transform;
  transition-duration: 225ms;
  transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  &:hover {
    background-color: var(--background-hover-color);
  }
  &:active {
    transform: scale(0.94);
  }
  &:focus-visible {
    outline: 3px solid var(--focus-color);
  }
}
</style>
