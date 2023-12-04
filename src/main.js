import { createApp } from "vue";
import { createPinia } from "pinia";
import VueDragscroll from "vue-dragscroll";
import "./style.css";
import App from "./App.vue";

createApp(App).use(VueDragscroll).use(createPinia()).mount("#app");
