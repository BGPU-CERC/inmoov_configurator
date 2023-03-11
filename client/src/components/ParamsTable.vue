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
  return values.join("").trim().length
})

const headers = Object.keys(csv[0]).filter(Boolean)

function typeOf(v) {
  if (String(v).toLowerCase() === "x") {
    return "checkbox"
  }

  if (String(v).startsWith("range")) {
    return "range"
  }

  if (v && !isNaN(Number(v))) {
    return "number"
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

          <input v-else-if="typeOf(row[header]) === 'number'" v-model.number="row[header]" type="number">

          <input v-else-if="typeOf(row[header]) === 'checkbox'" v-model="row[header + '_value']" type="checkbox">

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
</style>