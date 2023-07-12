<script setup>
const { placeholder, required, modelValue, borderPosition } = defineProps({
  placeholder: {
    type: String,
    required: true,
  },
  borderPosition: {
    type: String,
    required: true,
  },
  modelValue: String,
  required: Boolean,
});
</script>

<template>
  <div class="wrapper">
    <input
      type="password"
      :class="borderPosition + '-border'"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :required="required"
    />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  input {
    width: 100%;
    font-size: 15px;
    background-color: var(--background-color);
    border: none;
    padding: 10px 25px;
    &:focus {
      outline: 3px solid var(--focus-color);
    }
  }
}
</style>
