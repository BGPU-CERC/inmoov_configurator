import csv from "../assets/Inmoov.csv";
import { computed, ref } from "vue";
import { groupBy } from "lodash";

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
