import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueFire, VueFireAuth } from "vuefire";

import "@/assets/scss/index.scss";
import router from "@/router";
import { firebaseApp } from "@/helpers/firebase/firebase-init";

import App from "@/index.vue";
import MainInput from "@/components/ui/main-input.vue";
import MainButton from "@/components/ui/main-button.vue";
import MainCheckbox from "@/components/ui/main-checkbox.vue";
import MutableTitle from "@/components/ui/mutable-title.vue";
import PasswordInput from "@/components/ui/password-input.vue";
import ToggleIconButton from "@/components/ui/toggle-icon-button.vue";

const app = createApp(App);
const pinia = createPinia();

app.component("MainInput", MainInput);
app.component("MainButton", MainButton);
app.component("MainCheckbox", MainCheckbox);
app.component("MutableTitle", MutableTitle);
app.component("PasswordInput", PasswordInput);
app.component("ToggleIconButton", ToggleIconButton);

app.use(pinia);
app.use(router);
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});

app.mount("#app");
