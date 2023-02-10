import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./Scss/main.scss";
import "./assets/tailwind.css";

createApp(App).use(store).use(router).mount("#app");
