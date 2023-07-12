<script setup>
import { reactive } from "vue";
import SocialLinks from "@/components/social-links.vue";

const userData = reactive({ email: "", password: "" });
</script>

<template>
  <div class="page">
    <h1 class="title">
      <router-link to="sign-up">
        Hello, sign in please! <br />
        (or click here, if you are not registered yet)
      </router-link>
    </h1>
    <form @submit.prevent>
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
