import csv from "../assets/Inmoov.csv";
import { ref } from "vue";

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

export function useParts() {
  return {
    parts,
  };
}
