<script setup>
const { title } = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <li class="item">
    <h3>{{ title }}</h3>
    <div class="dictionary left-border">
      <div class="buttons-top-wrapper">
        <button class="do-button edit-button"></button>
        <button class="do-button pin-button"></button>
      </div>
      <button class="do-button plus-button"></button>
      <div class="buttons-bottom-wrapper">
        <button class="do-button access-button"></button>
        <button class="do-button delete-button"></button>
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
.item {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  max-width: 200px;
  width: 100%;
  h3 {
    font-size: 15px;
    font-weight: 400;
    text-align: center;
    margin-bottom: 5px;
  }
  .dictionary {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    min-height: 200px;
    background-color: var(--background-color);
  }
  &:not(:nth-child(5n)) {
    margin-right: 20px;
  }
}

.do-button {
  width: 28px;
  height: 28px;
  border: none;
  cursor: pointer;
  background: transparent;
  background-repeat: no-repeat;
  background-size: contain;
}

.buttons-top-wrapper {
  position: absolute;
  top: 5px;
  left: 5px;
}

.buttons-bottom-wrapper {
  position: absolute;
  bottom: 5px;
  right: 5px;
}

.edit-button {
  background-image: url("/icons/edit-icon.svg");
}

.pin-button {
  background-image: url("/icons/pin-icon.svg");
  transform: scaleX(-1);
}

.plus-button {
  background-image: url("/icons/add-icon.svg");
}

.access-button {
  background-image: url("/icons/lock-icon.svg");
}

.delete-button {
  background-image: url("/icons/remove-icon.svg");
}
</style>
