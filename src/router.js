import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/login",
    name: "login",
    component: () => import("./components/LoginPage")
  },
  {
    path: "/intro",
    name: "intro",
    component: () => import("./components/IntroPage")
  },
  {
    path: "/sam",
    name: "sam",
    component: () => import("./components/MainPage")
  },
  {
    path: "/finish",
    name: "finish",
    component: () => import("./components/FinishPage")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;