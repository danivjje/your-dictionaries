<script setup></script>

<template>
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
  transform: scale(0);
}
</style>
