<script setup>
import csvImport from "../assets/Inmoov.csv";

let csv = $ref(csvImport)

csv.forEach((el, i, arr) => {
  const prev = arr[i - 1];
  el.group = el.group || prev?.group
  el.current_value = el.rest
});

csv = csv.filter(el => {
  const values = Object.values(el)
  values.shift()
  return values.join("").trim() !== ""
})

const headers = Object.keys(csv[0])

function typeOf(v) {
  if (String(v).startsWith("range")) {
    return "range"
  }

  return typeof v
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="header in headers"> {{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in csv">
        <td v-for="header in headers">
          <input v-if="typeOf(row[header]) === 'range'" v-model.number="row[header + '_value']" type="range"
            :min="row.min" :max="row.max">
          <span v-else>{{ row[header] }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>