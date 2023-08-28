<script setup lang="ts">
import { reactive } from "vue";
import { signInUser } from "@/helpers/firebase/firebase-requests";
import { useStores } from "@/composables/use-stores";
import { useRouter } from "vue-router";

import SocialLinks from "@/components/social-links.vue";
import { AUTH_ERRORS_MESSAGES } from "@/assets/constants/auth-errors-messages";

const userData = reactive({ email: "", password: "" });
const { commonStore } = useStores();
const router = useRouter();

const handleLogin = async (): Promise<void> => {
  if (userData.email && userData.password) {
    try {
      commonStore.startLoading();
      await signInUser(userData.email.trim(), userData.password.trim());
      await commonStore.changeCurrentUser();
      commonStore.useNotification("authorization: successfully");
      router.push({ path: "/" });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message in AUTH_ERRORS_MESSAGES) {
          commonStore.useNotification(AUTH_ERRORS_MESSAGES[error.message]);
        }
      }
    } finally {
      commonStore.finishLoading();
    }
  }
};
</script>

<template>
  <div class="page">
    <h1 class="title">
      <router-link to="sign-up">
        Hello, sign in please! <br />
        (or click here, if you are not registered yet)
      </router-link>
    </h1>
    <form @submit.prevent="handleLogin">
      <main-input
        class="input"
        v-model="userData.email"
        placeholder="your email"
        borderPosition="top"
      />
      <password-input
        class="input"
        v-model="userData.password"
        placeholder="your password"
        borderPosition="bottom"
      />
      <main-button class="submit-button" borderPosition="bottom">
        sign in
      </main-button>
    </form>
    <social-links />
  </div>
</template>

<style scoped lang="scss">
.title {
  font-size: 18px;
  font-weight: 400;
  line-height: 1.1;
  text-align: center;
  margin-bottom: 25px;
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
