import csv from "../assets/Inmoov.csv";
import { computed, ref } from "vue";
import { groupBy } from "lodash";
import {
  HEAD_ADDRESS,
  LEFT_HAND_ADDRESS,
  RIGHT_HAND_ADDRESS,
  STOM_ADDRESS,
} from "inmoov_ik/constants";

let parts = ref(csv);

parts.value.forEach((el, i, arr) => {
  const prev = arr[i - 1];
  el.group = el.group || prev?.group;
  el.current_value = el.rest;
});

parts.value = parts.value.filter((el) => {
  const values = Object.values(el);
  values.shift();
  return values.join("").trim().length;
});

parts.value.forEach((el, i, arr) => {
  switch (el.group.toLowerCase()) {
    case "head":
    case "eyes":
      el.address_l = HEAD_ADDRESS;
      break;
    case "hand":
    case "arm":
      el.address_l = LEFT_HAND_ADDRESS;
      el.address_r = RIGHT_HAND_ADDRESS;
      break;
    case "stom":
      el.address_l = STOM_ADDRESS;
      break;
  }
});

let partsByName = computed(() => {
  const map = groupBy(parts.value, "part_name");
  Object.keys(map).forEach((key) => (map[key] = map[key][0]));
  return map;
});

export function useParts() {
  return {
    parts,
    partsByName,
  };
}
