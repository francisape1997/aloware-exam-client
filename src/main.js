import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import mitt from 'mitt';

const app = createApp(App);

const emitter = mitt();

app.provide('emitter', emitter);

app.use(router);

app.mount('#app');
