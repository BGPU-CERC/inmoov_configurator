<script setup>
import { groupBy } from "lodash";
import csvImport from "../assets/Inmoov.csv";
import PartToolbar from "./PartToolbar.vue";

let csv = $ref(csvImport);

csv.forEach((el, i, arr) => {
  const prev = arr[i - 1];
  el.group = el.group || prev?.group;
  el.current_value = el.rest;
});

csv = csv.filter((el) => {
  const values = Object.values(el);
  values.shift();
  return values.join("").trim().length;
});

const headers = Object.keys(csv[0]).filter(Boolean);

const groups = $computed(() => {
  return groupBy(csv, "group");
});

let params = $ref({
  speed: 100,
});

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

function onAttach(rows, state) {
  onState(rows, `lt_value`, state);
  onState(rows, `rt_value`, state);
}

function onCopy(rows, { from, to }) {
  onState(rows, to, (row) => row[from]);
}

function onState(rows, header, v) {
  rows.forEach((row) => {
    row[header] = typeof v === "function" ? v(row) : v;
  });
}
</script>

<template>
  <table class="part-table">
    <thead>
      <tr>
        <th :colspan="headers.length">
          <div class="row" style="padding: 0.25rem; align-items: end">
            <button>detach</button>
            <button>attach</button>
            <button>rest</button>
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
        <td style="padding: 1rem 0.25rem">{{ name }}</td>
        <td :colspan="headers.length - 1">
          <part-toolbar
            @detach="onAttach(rows, false)"
            @attach="onAttach(rows, true)"
            @copy="onCopy(rows, $event)"
          ></part-toolbar>
        </td>
      </tr>

      <tr v-for="row in rows">
        <td v-for="header in headers">
          <input
            v-if="typeOf(row[header]) === 'range'"
            v-model.number="row[header + '_value']"
            type="range"
            :min="row.min"
            :max="row.max"
          />

          <input
            v-else-if="typeOf(row[header]) === 'number'"
            v-model.number="row[header]"
            type="number"
          />

          <input
            v-else-if="typeOf(row[header]) === 'checkbox'"
            v-model="row[header + '_value']"
            type="checkbox"
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
</style>
