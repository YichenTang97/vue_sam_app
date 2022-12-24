import { createWebHistory, createRouter } from "vue-router";
import store from "./store";

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

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !store.state.user.authenticated) {
      return '/';
  }
});

export default router;