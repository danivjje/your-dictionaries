<script setup lang="ts">
defineEmits(["update:modelValue"]);
const { isEdit } = defineProps<{
  isEdit: boolean;
  modelValue: string;
}>();
</script>

<template>
  <div>
    <transition name="toggle">
      <h1 v-if="!isEdit" class="title">{{ modelValue }}</h1>
      <input
        v-else
        class="input left-border"
        type="text"
        :value="modelValue"
        @input="
          $emit('update:modelValue', (<HTMLInputElement>$event.target).value)
        "
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
  h1 {
    font-size: 16px;
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
  flex-shrink: 0;
  position: absolute;
  bottom: 0;
  &:focus {
    outline: 3px solid var(--focus-color);
  }
}

.toggle-enter-active,
.toggle-leave-active {
  transition-property: opacity, transform;
  transition-duration: 350ms;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
}

.toggle-enter-from,
.toggle-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
