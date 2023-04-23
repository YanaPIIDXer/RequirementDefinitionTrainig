import { createApp } from "vue";
import App from "./App.vue";
import router from './router';

const app = createApp(App);
app.use(router);

import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-light-indigo/theme.css";     
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
app.use(PrimeVue);

import 'md-editor-v3/lib/style.css';

app.mount('#app');
