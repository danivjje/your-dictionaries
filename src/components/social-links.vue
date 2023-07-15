<script setup>
import { signInUsingGoogle } from "@/api/firebase/firebase-requests";
</script>

<template>
  <ul>
    <li>
      <button
        @click="signInUsingGoogle"
        style="background-image: url('/icons/google-icon.svg')"
      ></button>
    </li>
    <li>
      <button style="background-image: url('/icons/github-icon.svg')"></button>
    </li>
  </ul>
</template>

<style scoped lang="scss">
ul {
  margin-top: 15px;
  display: flex;
  li {
    button {
      cursor: pointer;
      width: 44px;
      height: 44px;
      border: none;
      background: transparent;
      background-size: contain;
      background-repeat: no-repeat;

      transition-property: transform, opacity;
      transition-duration: 200ms;
      transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
      &:hover {
        opacity: 0.81;
      }
      &:active {
        transform: scale(0.91);
      }
    }
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>
