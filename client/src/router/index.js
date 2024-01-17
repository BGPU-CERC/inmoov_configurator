import { createRouter, createWebHashHistory } from "vue-router";
import IK from "../views/IK.vue";
import Calibration from "../views/Calibration.vue";
import Login from "../views/Login.vue";
import Main from "../views/Main.vue";

const routes = [
  {
    path: "/",
    redirect: "/servo",
    name: "main",
    component: Main,
    children: [
      {
        path: "servo",
        component: Calibration,
        meta: {
          name: "Калибровка приводов",
        },
      },
      {
        path: "ik",
        component: IK,
        meta: {
          name: "Инверсная кинематика",
        },
      },
    ],
  },

  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      name: "Авторизация",
    },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
