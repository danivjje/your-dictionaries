<script setup>
const { placeholder, required, borderPosition } = defineProps({
  borderPosition: {
    type: String,
    required: true,
  },
  modelValue: String,
  required: Boolean,
});
</script>

<template>
  <input
    :class="borderPosition + '-border'"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
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
