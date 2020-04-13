<script>
import { page } from '../stores.js';
import { get } from 'svelte/store';
import { c_record_fields } from '../c_record_fields.js';

let all_fields = c_record_fields;

let personal_fields = [ all_fields[1], all_fields[8],
                        all_fields[2], all_fields[9],
                        all_fields[3], all_fields[10],
                        all_fields[4], all_fields[11],
                        all_fields[5], all_fields[12],
                        all_fields[6], all_fields[13],
                        all_fields[7], all_fields[14],
                        all_fields[17], all_fields[20],
                        all_fields[18], all_fields[21],
                        all_fields[19], all_fields[22],
                        all_fields[23], all_fields[25],
                        all_fields[24], all_fields[26], all_fields[27]
                        ]

personal_fields.sort((a, b) => (a.start > b.start) ? 1: -1)

let employee = {}

var field;

let value = get(page)

if (value.params == undefined || value.params == {}){
  console.log('employee blank')
  for (field of all_fields){
    employee[field.field_name] = field.default
  }
  
} else {
  employee = value.params
  console.log(JSON.stringify(employee))
}

function save() {
    console.log("save()")
    MainAPI
    .saveData('employees', employee)
    .then(updatePageNum('3', {}))
    //.then(updateStatus)
}

function updatePageNum(new_id, params){
  page.set({id: new_id, params: params})
}

	let personalVisible = true;
	let payrollVisible = false;
	
	function togglePages(){
		if(personalVisible == true){
			personalVisible = false
			payrollVisible = true
		} else {
			personalVisible = true
			payrollVisible = false
		}
	}
</script>
<style type="text/scss">
  @import "src/style/form.scss";
</style>
<div class="field">
  <button on:click={togglePages}>
	{#if personalVisible}
	  Financial
	{/if}
	{#if payrollVisible}
	  Personal
	{/if}
</button>
<button on:click={save}>Save</button>
</div>
  <fieldset> 
    <legend>Personal Information</legend>
    {#if personalVisible}
    {#each personal_fields as field}
      <div class="field">
        <label for={field.field_name}>{field.header}</label>
        <input type="text" id={field.field_name} name={field.field_name} bind:value={employee[field.field_name]}>
      </div>
    {/each}
    {/if}
  </fieldset>
  
  
    {#if payrollVisible}
      <fieldset> 
        <legend>Financial Information</legend>
        Financial Information Here
        
      </fieldset>
    {/if}
