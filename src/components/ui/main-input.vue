<script setup lang="ts">
defineEmits(["update:modelValue"]);

const { borderPosition } = defineProps<{
  borderPosition?: string;
  modelValue: string;
}>();
</script>

<template>
  <input
    :class="borderPosition + '-border'"
    :value="modelValue"
    @input="$emit('update:modelValue', (<HTMLInputElement>$event.target).value)"
  />
</template>

<style scoped lang="scss">
input {
  width: 100%;
  font-size: 16px;
  line-height: 18px;
  background-color: var(--background-color);
  border: none;
  padding: 10px 25px;
  &:focus {
    outline: 3px solid var(--focus-color);
  }
}
</style>
