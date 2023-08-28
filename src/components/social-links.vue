<script setup lang="ts">
import {
  signInUsingGoogle,
  signInUsingGithub,
} from "@/helpers/firebase/firebase-requests";
import { useStores } from "@/composables/use-stores";
import { useRouter } from "vue-router";

const { commonStore } = useStores();
const router = useRouter();

const handleSignInUsingGoogle = async () => {
  try {
    commonStore.startLoading();
    await signInUsingGoogle();
    await commonStore.changeCurrentUser();
  } catch (err) {
    console.log("error: ", err);
  } finally {
    router.push({ path: "/" });
    commonStore.finishLoading();
  }
};

const handleSignInUsingGithub = async () => {
  try {
    commonStore.startLoading();
    await signInUsingGithub();
    await commonStore.changeCurrentUser();
  } catch (err) {
    console.log("error: ", err);
  } finally {
    router.push({ path: "/" });
    commonStore.finishLoading();
  }
};
</script>

<template>
  <ul>
    <li>
      <button
        @click="handleSignInUsingGoogle"
        style="background-image: url('/icons/google-icon.svg')"
      ></button>
    </li>
    <li>
      <button
        @click="handleSignInUsingGithub"
        style="background-image: url('/icons/github-icon.svg')"
      ></button>
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
