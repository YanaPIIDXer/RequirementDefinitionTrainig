import { type RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

/**
 * ルーティングのパス
 */
export const routePaths = {
  root: "/",
  sandbox: "/develop/sandbox",
  gameSample: "/develop/game_sample"
};

/**
 * ルーティング
 */
const routes: RouteRecordRaw[] = [
  { name: "root", path: routePaths.root, component: () => import("../views/RootView.vue"), },
  { name: "sandbox", path: routePaths.sandbox, component: () => import("../views/develop/SandBoxVuew.vue"), },
  { name: "gameSample", path: routePaths.gameSample, component: () => import("../views/develop/GameSampleView.vue"), },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
