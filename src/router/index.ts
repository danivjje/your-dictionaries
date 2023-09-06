import { createRouter, createWebHistory } from "vue-router";
import { getCurrentUser } from "vuefire";

import { RouteViews } from "@/types/enums";
import type { RouteRecordRaw } from "vue-router";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    name: RouteViews.SIGN_IN,
    path: "/sign-in",
    component: () => import("@/views/sign-in-page.vue"),
  },
  {
    name: RouteViews.SIGN_UP,
    path: "/sign-up",
    component: () => import("@/views/sign-up-page.vue"),
  },
  {
    name: RouteViews.HOME,
    path: "/",
    component: () => import("@/views/home-page.vue"),
  },
  {
    name: RouteViews.DICTIONARY,
    path: "/dictionary/:id",
    component: () => import("@/views/dictionary-page.vue"),
  },
  {
    name: RouteViews.FAVORITE_WORDS,
    path: "/favorite-dictionary",
    component: () => import("@/views/favorite-words-page.vue"),
  },
  {
    name: "test",
    path: "/test",
    component: () => import("@/views/test-page.vue"),
  },
  {
    name: RouteViews.NOT_FOUND,
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, _): Promise<{ name: string } | void> => {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    if (to.name === RouteViews.SIGN_IN || to.name === RouteViews.SIGN_UP) {
      return { name: RouteViews.HOME };
    }
  } else {
    if (to.name !== RouteViews.SIGN_IN && to.name !== RouteViews.SIGN_UP) {
      return { name: RouteViews.SIGN_UP };
    }
  }
});

export default router;
