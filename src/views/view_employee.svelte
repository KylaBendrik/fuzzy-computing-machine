<script>
import { page } from '../stores.js';
import { get } from 'svelte/store';

let fields = [
    {header: "First Name", value: "first_name"},
    {header: "Middle Name", value: "middle_name"},
    {header: "Last Name", value: "last_name"}
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


</script>
<style type="text/scss">
  @import "src/style/form.scss";
</style>

  {#each fields as field}
    <div class="field">
      <label for={field.value}>{field.header}</label>
      <input type="text" id={field.value} name={field.value} bind:value={employee[field.value]}>
    </div>
  {/each}
