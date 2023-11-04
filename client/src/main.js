import { createApp } from "vue";
import App from "./App.vue";
import AppLink from "./components/AppLink.vue";
import ASelect from "./components/ASelect.vue";
import { router } from "./router";

import "./assets/style.css";

const app = createApp(App);
app.use(router);
app.component("AppLink", AppLink);
app.component("ASelect", ASelect);
app.mount("#app");
