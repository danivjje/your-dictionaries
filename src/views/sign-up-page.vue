<script setup lang="ts">
import { signUpUser } from "@/helpers/firebase/firebase-requests";
import { useStores } from "@/composables/use-stores";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { AUTH_ERRORS_MESSAGES } from "@/assets/constants/auth-errors-messages";

import SocialLinks from "@/components/social-links.vue";

const router = useRouter();
const { commonStore } = useStores();
const userData = reactive({
  email: "",
  password: "",
  repeatPassword: "",
});

const handleRegistration = async (): Promise<void> => {
  if (
    userData.email &&
    userData.password &&
    userData.password === userData.repeatPassword
  ) {
    try {
      commonStore.startLoading();
      await signUpUser(userData.email.trim(), userData.password.trim());
      await commonStore.changeCurrentUser();
      commonStore.useNotification("registration: successfully");
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
    <router-link to="sign-in">
      <h1 class="title">
        Hello, sign up please! <br />
        (or click here, if you are already registered)
      </h1>
    </router-link>
    <form @submit.prevent="handleRegistration">
      <main-input
        class="input"
        placeholder="your email"
        type="email"
        borderPosition="top"
        v-model="userData.email"
      />
      <password-input
        class="input"
        :placeholder="'your password'"
        borderPosition="bottom"
        v-model="userData.password"
      />
      <password-input
        class="input"
        :placeholder="'repeat your password, please'"
        borderPosition="top"
        v-model="userData.repeatPassword"
      />
      <main-button class="submit-button" borderPosition="bottom">
        sign up
      </main-button>
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
