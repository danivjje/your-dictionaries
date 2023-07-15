<script setup>
import { reactive } from "vue";
import { signUpUser } from "@/api/firebase/firebase-requests";
import { useStore } from "@/composables/use-store";

import SocialLinks from "@/components/social-links.vue";

const { loaderStore } = useStore();
const userData = reactive({
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
});

const handleSignUp = async () => {
  loaderStore.startLoading();
  setTimeout(() => loaderStore.finishLoading(), 3000);
};
</script>

<template>
  <div class="page">
    <router-link to="sign-in">
      <h1 class="title">
        Hello, sign up please! <br />
        (or click here, if you are already registered)
      </h1>
    </router-link>
    <form @submit.prevent>
      <main-input
        class="input"
        placeholder="your username"
        type="text"
        borderPosition="top"
        v-model="userData.username"
      />
      <main-input
        class="input"
        placeholder="your email"
        type="email"
        borderPosition="bottom"
        v-model="userData.email"
      />
      <password-input
        class="input"
        :placeholder="'your password'"
        borderPosition="top"
        v-model="userData.password"
      />
      <password-input
        class="input"
        :placeholder="'repeat your password, please'"
        borderPosition="bottom"
        v-model="userData.repeatPassword"
      />
      <main-button
        @click="handleSignUp"
        class="submit-button"
        borderPosition="bottom"
        >sign up</main-button
      >
    </form>

    <social-links />
  </div>
</template>

<style scoped lang="scss">
.title {
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  line-height: 1.1;
  margin-bottom: 35px;
}

form {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input {
  margin-bottom: 10px;
}

.submit-button {
  width: fit-content;
}
</style>
