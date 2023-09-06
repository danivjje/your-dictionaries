<script setup lang="ts">
import { ref, Ref, StyleValue } from "vue";

defineEmits(["update:modelValue"]);
const { isEdit, inputStyles } = defineProps<{
  isEdit: boolean;
  modelValue: string;
  inputStyles?: StyleValue;
}>();

const inputReference: Ref<null | HTMLInputElement> = ref(null);

defineExpose({
  inputReference,
});
</script>

<template>
  <div>
    <transition name="toggle">
      <h1 v-if="!isEdit" class="title">{{ modelValue }}</h1>
      <input
        v-else
        @input="$emit('update:modelValue', (<HTMLInputElement>$event.target).value)"
        :style="inputStyles"
        :value="modelValue"
        ref="inputReference"
        class="input left-border"
        type="text"
      />
    </transition>
  </div>
</template>

<style scoped lang="scss">
div {
  position: relative;
  width: 100%;
  min-height: 38px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  .title {
    font-size: 16px;
    word-break: break-all;
    font-weight: 400;
    text-align: center;
  }
}

.input {
  width: 100%;
  font-size: 16px;
  line-height: 18px;
  background-color: var(--background-color);
  border: none;
  padding: 10px 25px;
  position: absolute;
  height: 100%;
  bottom: 0;
  &:focus {
    outline: 3px solid var(--focus-color);
  }
}

.toggle-enter-active,
.toggle-leave-active {
  transition-property: opacity, transform;
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
}

.toggle-enter-from,
.toggle-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
