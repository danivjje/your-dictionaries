<script setup lang="ts">
const { color } = defineProps<{
  color: string;
}>();
const cssVariable: string = color ? `var(--${color}-color)` : "";
</script>

<template>
  <label class="wrapper">
    <input type="checkbox" />
    <span :style="cssVariable ? `background-color: ${cssVariable}` : ''"></span>
  </label>
</template>

<style scoped lang="scss">
.wrapper {
  cursor: pointer;
  display: block;
  width: 20px;
  height: 20px;
  position: relative;
  input {
    cursor: pointer;
    position: absolute;
    inset: 0;
    z-index: 10;
    opacity: 0;
    &:checked ~ span::after {
      opacity: 1;
    }
  }
  span {
    position: absolute;
    inset: 0;
    border-radius: 7px;
    background-color: var(--body-color);
    &::after {
      inset: 0;
      opacity: 0;
      content: "";
      display: block;
      position: absolute;
      background-repeat: no-repeat;
      background-size: 60% 60%;
      background-position: center center;
      background-image: url("/icons/checkmark-icon.svg");
      transition: opacity 120ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
  }
}
</style>
