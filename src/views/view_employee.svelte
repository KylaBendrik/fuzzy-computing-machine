<script>
import { page } from '../stores.js';
import { get } from 'svelte/store';

let fields = [
    {header: "First Name", value: "first_name"},
    {header: "Middle Name", value: "middle_name"},
    {header: "Last Name", value: "last_name"},
    {header: "Address Line 1", value: "address_1"},
    {header: "Address Line 2", value: "address_2"},
    {header: "City", value: "city"},
    {header: "State", value: "state"},
    {header: "Zip/Postal Code", value: "zip"},
    {header: "Country", value: "country"}
  ]

let employee = {}

var field;

let value = get(page)

if (value.params == undefined || value.params == {}){
  console.log('employee blank')
  for (field of fields){
    employee[field.value] = ""
  }
} else {
  employee = value.params
  console.log(JSON.stringify(employee))
}

function save() {
    console.log("save()")
    MainAPI
    .saveData('employees', employee)
    //.then(updateStatus)
  }
</script>
<style type="text/scss">
  @import "src/style/form.scss";
</style>
<div class="field">
    <button on:click={save}>Save</button>
  </div>
  {#each fields as field}
    <div class="field">
      <label for={field.value}>{field.header}</label>
      <input type="text" id={field.value} name={field.value} bind:value={employee[field.value]}>
    </div>
  {/each}
