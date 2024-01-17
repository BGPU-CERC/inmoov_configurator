import { debounce } from "lodash";
import { ref, watch } from "vue";

const storage_key = "inmoov_configurator";
const storage = ref({
  authorization: null,
});

const load = () => {
  const item = localStorage.getItem(storage_key) || "{}";
  Object.assign(storage.value, JSON.parse(item));
};

const save = () => {
  localStorage.setItem(storage_key, JSON.stringify(storage.value));
};

load();
watch(storage, debounce(save, 500), { deep: true });

export function useStorage() {
  return {
    storage,
  };
}
