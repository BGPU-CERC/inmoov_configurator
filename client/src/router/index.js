import { createRouter, createWebHashHistory } from "vue-router";
import IK from "../views/IK.vue";
import Calibration from "../views/Calibration.vue";

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
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
