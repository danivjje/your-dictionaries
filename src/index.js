import { createApp } from 'vue';

import router from '@/router';

import App from '@/index.vue';
import MainInput from '@/components/ui/main-input.vue';
import MainButton from '@/components/ui/main-button.vue';
import PasswordInput from '@/components/ui/password-input.vue';

const app = createApp(App);

app.component('PasswordInput', PasswordInput);
app.component('MainInput', MainInput);
app.component('MainButton', MainButton);

app.use(router);

app.mount('#app');