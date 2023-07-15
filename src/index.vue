<script setup>
import { useStore } from "@/composables/use-store";
import Loader from "@/components/ui/loader.vue";

const { loaderStore } = useStore();
</script>

<template>
  <loader :isVisible="loaderStore.isLoading" />

  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="scss">
@import url("@/assets/scss/variables.scss");
@import url("@/assets/scss/fonts.scss");
@import url("@/assets/scss/global.scss");

.route-enter-active,
.route-leave-active {
  transition-property: opacity, transform;
  transition-duration: 350ms;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
}

.route-enter-from,
.route-leave-to {
  opacity: 0;
  transform: translateY(-150px);
}
</style>
