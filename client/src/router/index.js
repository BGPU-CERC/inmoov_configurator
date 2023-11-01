import { createRouter, createWebHashHistory } from "vue-router";
import IK from "../views/IK.vue";
import Calibration from "../views/Calibration.vue";

const routes = [
  {
    path: "/",
    component: IK,
    meta: {
      name: "Инверсная кинематика",
    },
  },
  {
    path: "/calibration",
    component: Calibration,
    meta: {
      name: "Калибровка приводов",
    },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
