<script setup lang="ts">
import { ref, Ref } from "vue";

const { placeholder, modelValue, borderPosition } = defineProps<{
  placeholder: string;
  borderPosition: string;
  modelValue: string;
}>();

const isVisible: Ref<boolean> = ref(false);
const isFocus: Ref<boolean> = ref(false);

const handleToggleVisibility = (): void => {
  isVisible.value = !isVisible.value;
};
</script>

<template>
  <div
    :class="`${borderPosition}-border ${isFocus ? 'div-focus' : ''} wrapper`"
  >
    <input
      :type="isVisible ? 'text' : 'password'"
      :placeholder="placeholder"
      :value="modelValue"
      @input="
        $emit('update:modelValue', (<HTMLInputElement>$event.target).value)
      "
      @focus="isFocus = true"
      @blur="isFocus = false"
    />
    <span
      @click="handleToggleVisibility"
      @keydown.space="handleToggleVisibility"
      tabindex="0"
      class="visibility-wrapper"
    >
      <transition name="visibility">
        <span
          v-if="isVisible"
          class="visibility-icon"
          style="background-image: url('/icons/visibility-icon.svg')"
        ></span>
        <span
          v-else
          class="visibility-icon"
          style="background-image: url('/icons/invisibility-icon.svg')"
        ></span>
      </transition>
    </span>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  background-color: var(--background-color);
  padding: 7.6px 25px;
  display: flex;
  align-items: center;
  input {
    background: transparent;
    width: 100%;
    font-size: 15px;
    border: none;
    margin-right: 15px;
    &:focus {
      outline: none;
    }
  }
}

.visibility-wrapper {
  display: block;
  width: 24px;
  height: 24px;
  transform: translateX(10px);
  position: relative;
  flex-shrink: 0;
  span {
    position: absolute;
    inset: 0;
    cursor: pointer;
    background-repeat: no-repeat;
    background-size: contain;
  }
  &:focus-visible {
    outline: 3px solid var(--focus-color);
    border-radius: 5px;
  }
}

.div-focus {
  outline: 3px solid var(--focus-color);
}

.visibility-enter-active,
.visibility-leave-active {
  transition-property: opacity, transform;
  transition-duration: 350ms;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
}

.visibility-enter-from,
.visibility-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
