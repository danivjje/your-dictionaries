<script setup lang="ts">
import { useStores } from "@/composables/use-stores";

import Loader from "@/components/ui/loader.vue";
import Confirm from "@/components/ui/confirm.vue";
import Notification from "@/components/ui/notification.vue";

const { commonStore } = useStores();
</script>

<template>
  <confirm />
  <loader :isVisible="commonStore.isLoading" />
  <notification
    :is-showed="Boolean(commonStore.currentNotification.text)"
    :text="commonStore.notificationsQueue[0]?.text || ''"
  />

  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped lang="scss">
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
