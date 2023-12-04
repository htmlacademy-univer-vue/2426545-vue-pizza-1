import { createApp } from "vue";
import { createPinia } from "pinia";
import { getToken, removeToken } from "@/services/token-manager";
import { useAuthStore } from "@/stores";

import App from "./App.vue";
import router from "./router";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");

const token = getToken();
if (token) {
  try {
    const authStore = useAuthStore();
    authStore.getMe().then(r => console.log(r));
    router.push("/").then(r => console.log(r));
  } catch (e) {
    removeToken();
    console.log(e);
  }
}
