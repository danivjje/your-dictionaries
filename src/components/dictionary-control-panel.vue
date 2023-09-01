<script setup lang="ts">
import { Ref, ref } from "vue";

const emit = defineEmits(["delete", "rename", "change-private", "toggle-info"]);
const { creationInfoCurrentMode, currentPrivateStatus } = defineProps<{
  creationInfoCurrentMode: boolean;
  currentPrivateStatus: boolean;
}>();

const creationInfoMode: Ref<boolean> = ref(creationInfoCurrentMode);

const handleToggleCreationInfoMode = () => {
  creationInfoMode.value = !creationInfoMode.value;
  emit("toggle-info", creationInfoMode.value);
};
</script>

<template>
  <div class="control-panel">
    <header>
      <span class="text-span">creation info mode:</span>
      <main-button @click="handleToggleCreationInfoMode" borderPosition="left">
        {{ creationInfoMode ? "showed" : "hidden" }}
      </main-button>
    </header>
    <footer>
      <main-button borderPosition="left">dictionary contributors</main-button>
      <main-button @click="emit('change-private')" borderPosition="left">
        make {{ currentPrivateStatus ? "public" : "private" }}
      </main-button>
      <main-button borderPosition="left" @click="emit('rename')"> rename dictionary </main-button>
      <main-button @click="emit('delete')" :danger="true" borderPosition="left" class="delete-button">
        delete dictionary
      </main-button>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.control-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  header {
    margin-bottom: 20px;
    .text-span {
      margin-right: 10px;
    }
  }
  footer {
    button:not(:last-child) {
      margin-right: 20px;
    }
  }
}
</style>
