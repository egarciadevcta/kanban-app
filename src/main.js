import { createPinia } from "pinia";
import { createApp } from "vue";
import VueDragscroll from "vue-dragscroll";
import "./style.css";
import App from "./App.vue";

createApp(App).use(createPinia()).use(VueDragscroll).mount("#app");
