import {isLogged} from "@/middlewares";

export default [
  {
    path: "/",
    name: "HomeView",
    component: () => import("../views/HomeView.vue"),
    meta: { layout: "AppLayoutMain" },
    children: [],
  },
  {
    path: "/sign-in",
    name: "LoginView",
    component: () => import("../views/LoginView.vue"),
    meta: { layout: "AppLayoutDefault"},
    children: [],
  },
  {
    path: "/cart",
    name: "CartView",
    component: () => import("../views/CartView.vue"),
    meta: { layout: "AppLayoutMain" },
    children: [],
  },
  {
    path: "/user",
    name: "UserView",
    component: () => import("../views/UserView.vue"),
    meta: { layout: "AppLayoutUser", middlewares: [isLogged] },
    children: [
      {
        path: "profile",
        name: "ProfileView",
        component: () => import("../views/ProfileView.vue"),
      },
      {
        path: "orders",
        name: "OrdersView",
        component: () => import("../views/OrdersView.vue"),
      },
    ],
  },
];
