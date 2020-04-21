<script>
  import { page } from '../stores.js';
  import { get } from 'svelte/store';
  import all_fields from '../../data/c_record_fields.json'
  import Field from './field.svelte'

  // Generate forms
	let personal_fields = []
	let employment_fields = []
	let payroll_fields = []
	
	all_fields.forEach(function(field){
		if(field.form == "personal"){
			personal_fields.push(field);
		} else if (field.form == "employment"){
			employment_fields.push(field)
		} else {
			payroll_fields.push(field)
		}
  })
  
  // Populate forms
  let employee = {}

  let page_value = get(page)

  if (page_value.params == undefined || page_value.params == {}){
    console.log('employee blank')
    for (field of all_fields){
      employee[field.field_id] = ""
    }
  } else {
    employee = page_value.params
    console.log(JSON.stringify(employee))
  }

  function save() {
    console.log("save()")
    MainAPI
    .saveData('employees', employee)
    .then(updatePageNum('3', {}))
  } 

  function updatePageNum(new_id, params){
    page.set({id: new_id, params: params})
  }

  // Tabs
	let pages_visible = {
		personal: true,
		employment: false,
		payroll: false
	}
	function pick_personal(){
		pages_visible.personal = true;
		pages_visible.employment = false;
		pages_visible.payroll = false;
	}
		function pick_employment(){
		pages_visible.personal = false;
		pages_visible.employment = true;
		pages_visible.payroll = false;
	}
		function pick_payroll(){
		pages_visible.personal = false;
		pages_visible.employment = false;
		pages_visible.payroll = true;
	}
</script>
<style type="text/scss">
  @import "src/style/submenu.scss";
  @import "src/style/form.scss";

  .form_page {
  }
</style>
<div class="submenu">
<button on:click={save}>Save</button>
<div class="tabs_container">
	<button id="personal_button" on:click={pick_personal}>
		Personal
	</button>
	<button id="employment_button" on:click={pick_employment}>
		Employment
	</button>
	<button id="payroll_button" on:click={pick_payroll}>
		Payroll
	</button>
</div>
</div>


<div class="form_container">
	{#if pages_visible.personal}
		<div class="form_page" id="personal_info">
			<h2>Personal Info</h2>
			{#each personal_fields as field}
				<Field field={field} bind:value={employee[field.field_id]}/>
			{/each}
		</div>
	{/if}
	{#if pages_visible.employment}
  <div class="form_page" id="employment_info">
		<h2>Employment Info</h2>
		{#each employment_fields as field}
			<Field field={field} bind:value={employee[field.field_id]}/>
		{/each}
  </div>
	{/if}
	{#if pages_visible.payroll}
  <div class="form_page" id="payroll_info">
		<h2>Payroll Info</h2>
		{#each payroll_fields as field}
			<Field field={field} bind:value={employee[field.field_id]}/>
		{/each}
  </div>
	{/if}
</div>