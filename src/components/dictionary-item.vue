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
        <button class="do-button icon-button edit-button"></button>

        <toggle-icon-button
          class="pin-button"
          :activeIcon="'pin-icon.svg'"
          :inactiveIcon="'unpin-icon.svg'"
        />
      </div>
      <button class="do-button icon-button plus-button"></button>
      <div class="buttons-bottom-wrapper">
        <toggle-icon-button
          :activeIcon="'lock-icon.svg'"
          :inactiveIcon="'unlock-icon.svg'"
        />
        <button class="do-button icon-button delete-button"></button>
      </div>
    </div>
  </li>
</template>

<style scoped lang="scss">
.item {
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 200px;
  width: 100%;
  margin: 0 5px 15px 5px;
  flex-grow: 0;
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
}

.do-button {
  width: 28px;
  height: 28px;
}

.buttons-top-wrapper {
  display: flex;
  position: absolute;
  top: 5px;
  left: 5px;
}

.buttons-bottom-wrapper {
  display: flex;
  position: absolute;
  bottom: 5px;
  right: 5px;
}

.pin-button {
  transform: scaleX(-1);
}

.edit-button {
  background-image: url("/icons/edit-icon.svg");
}

.plus-button {
  background-image: url("/icons/add-icon.svg");
}

.delete-button {
  background-image: url("/icons/remove-icon.svg");
}

@media screen and (max-width: 576px) {
  .item {
    max-width: 100%;
  }
}
</style>
