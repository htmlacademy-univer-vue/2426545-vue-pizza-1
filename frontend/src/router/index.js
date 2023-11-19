import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes";
import { middlewarePipeline } from "@/middlewares";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
});

middlewarePipeline(router);
export default router;
