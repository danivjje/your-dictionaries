<script setup lang="ts">
const { isVisible } = defineProps<{
  isVisible: boolean;
}>();
</script>

<template>
  <transition name="loader" mode="out-in">
    <div v-if="isVisible" class="wrapper">
      <span class="loader"></span>
    </div>
  </transition>
</template>

<style scoped>
.wrapper {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9999999999999999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader {
  display: block;
  width: 250px;
  height: 250px;
  background-color: var(--background-color);
  border-radius: 50%;
  position: relative;
  box-shadow: 0 0 30px 4px rgba(0, 0, 0, 0.5) inset,
    0 5px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 45%;
  top: -40%;
  background-color: var(--body-color);
  animation: wave 5s linear infinite;
}
.loader:before {
  border-radius: 30%;
  background: rgba(255, 255, 255, 0.4);
  animation: wave 5s linear infinite;
}
@keyframes wave {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader-enter-active,
.loader-leave-active {
  transition-property: opacity, transform;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
}

.loader-enter-from,
.loader-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>
