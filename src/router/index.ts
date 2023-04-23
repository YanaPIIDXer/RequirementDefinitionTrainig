import { type RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
/*
import RootView from "../views/RootView.vue";
import SandBoxView from "../views/develop/SandBoxVuew.vue";
*/

/**
 * ルーティングのパス
 */
export const routePaths = {
  root: "/",
  sandbox: "/develop/sandbox",
};

/**
 * ルーティング
 */
const routes: RouteRecordRaw[] = [
  { name: "root", path: routePaths.root, component: () => import("../views/RootView.vue"), },
  { name: "sandbox", path: routePaths.sandbox, component: () => import("../views/develop/SandBoxVuew.vue"), },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
