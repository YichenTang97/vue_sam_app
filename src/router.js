import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/login",
    name: "login",
    component: () => import("./components/Login")
  },
  {
    path: "/intro",
    name: "intro",
    component: () => import("./components/Intro")
  },
  {
    path: "/sam",
    name: "sam",
    component: () => import("./components/SAM")
  },
  {
    path: "/finish",
    name: "finish",
    component: () => import("./components/Finish")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;