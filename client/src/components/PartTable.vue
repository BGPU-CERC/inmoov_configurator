<script setup>
import { groupBy } from "lodash";
import { onMounted, onBeforeUnmount } from "vue";
import { client } from "../client";
import PartToolbar from "./PartToolbar.vue";

const { config } = defineProps(["config"]);
const emit = defineEmits([]);

const headers = Object.keys(config[0]).filter(Boolean);

const groups = $computed(() => {
  return groupBy(config, "group");
});

let params = $ref({
  speed: 100,
  power: false,
});

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
});

function onKeydown(event) {
  if (event.code === "Space") {
    onPower(!params.power);
  }
}

function onCopy(rows, { from, to }) {
  onState(rows, to, (row) => row[from]);
}

function onPower(state) {
  client.post(`/serial/power`, { state });
  params.power = state;
}

function onInput(row, header, v) {
  switch (header) {
    case "current_value":
      setAngle();
      break;
    case "lt_value":
    case "rt_value":
      setAttach();
      break;
  }

  function setAttach() {
    let [side] = header.split("_");
    let cmd = v ? "attach" : "detach";

    client.post(`/serial/ports/${side}_port/${cmd}`, {
      pin: Number(row.pin),
      angle: Number(row.current_value),
      speed: params.speed,
    });
  }

  function setAngle() {
    ["lt_value", "rt_value"]
      .filter((el) => row[el])
      .forEach((el) => {
        let [side] = el.split("_");
        client.post(`/serial/ports/${side}_port/set_angle`, {
          angle: Number(v),
          pin: Number(row.pin),
          speed: params.speed,
        });
      });
  }
}

function onState(rows, header, v) {
  rows.forEach((row) => {
    const val = typeof v === "function" ? v(row) : v;
    row[header] = val;
    onInput(row, header, val);
  });
}

function hasState(rows, header, v) {
  return rows.find((row) => {
    return row[header] === v;
  });
}

function typeOf(v) {
  if (String(v).toLowerCase() === "x") {
    return "checkbox";
  }

  if (String(v).startsWith("range")) {
    return "range";
  }

  if (v && !isNaN(Number(v))) {
    return "number";
  }

  return typeof v;
}
</script>

<template>
  <table class="part-table">
    <thead>
      <tr>
        <th :colspan="headers.length">
          <div class="row" style="padding: 0.25rem; align-items: end">
            <button
              v-if="!params.power"
              @click="onPower(1)"
              class="power ok"
              title="(Space)"
            >
              START
            </button>
            <button
              v-if="params.power"
              @click="onPower(0)"
              class="power error"
              title="(Space)"
            >
              STOP
            </button>
            <label style="margin-left: auto">
              <span>speed</span>
              <input
                v-model.number="params.speed"
                type="number"
                style="width: 5rem"
              />
            </label>
          </div>
        </th>
      </tr>
      <tr>
        <th v-for="header in headers">{{ header }}</th>
      </tr>
    </thead>
    <tbody v-for="(rows, name) in groups">
      <tr style="background-color: #f7f7f7">
        <td
          :rowspan="rows.length + 1"
          style="padding: 1rem; vertical-align: top; text-align: center"
        >
          {{ name }}
        </td>
        <td>
          <span>attach/detach: </span>
        </td>
        <td>
          <input
            :checked="hasState(rows, 'lt_value', true)"
            @change="onState(rows, 'lt_value', $event.target.checked)"
            type="checkbox"
          />
        </td>
        <td>
          <input
            :checked="hasState(rows, 'rt_value', true)"
            @change="onState(rows, 'rt_value', $event.target.checked)"
            type="checkbox"
          />
        </td>
        <td :colspan="headers.length - 1">
          <part-toolbar @copy="onCopy(rows, $event)"></part-toolbar>
        </td>
      </tr>

      <tr v-for="row in rows">
        <td v-for="header in headers.slice(1)">
          <input
            v-if="typeOf(row[header]) === 'range'"
            v-model.number="row[header + '_value']"
            type="range"
            :min="row.min"
            :max="row.max"
            @input="onInput(row, header + '_value', $event.target.value)"
          />

          <input
            v-else-if="typeOf(row[header]) === 'number'"
            v-model.number="row[header]"
            type="number"
            @input="onInput(row, header, $event.target.value)"
          />

          <input
            v-else-if="typeOf(row[header]) === 'checkbox'"
            v-model="row[header + '_value']"
            type="checkbox"
            @input="onInput(row, header + '_value', $event.target.checked)"
          />

          <span v-else>{{ row[header] }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
input[type="number"] {
  width: 4rem;
}

input[type="checkbox"] {
  transform: scale(1.25);
}

button {
  height: 2rem;
}

button.power {
  font-size: 2rem;
  height: 3rem;
  width: 8rem;
}
</style>
