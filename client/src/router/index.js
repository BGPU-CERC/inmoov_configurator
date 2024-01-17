import { createRouter, createWebHashHistory } from "vue-router";
import IK from "../views/IK.vue";
import Calibration from "../views/Calibration.vue";
import Login from "../views/login.vue";

const routes = [
  {
    path: "/",
    component: Calibration,
    meta: {
      name: "Калибровка приводов",
    },
  },
  {
    path: "/ik",
    component: IK,
    meta: {
      name: "Инверсная кинематика",
    },
  },
  {
    path: "/login",
    component: Login,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
