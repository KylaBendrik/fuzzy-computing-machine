<script>
  let dataStatus = 'inactive'
	let statusVisible = false

  function add_new_ref() {
		console.log(newRef)
		orgFormData.pr_refs = [...orgFormData.pr_refs, newRef.toUpperCase()];
  }
  let newRef = ""
  function save() {
    console.log("save()")
    MainAPI
    .saveData('orgInfo', orgFormData)
    .then(updateStatus)
  }

  function updateStatus(input) {
    dataStatus = input
    if (input == 'data saved!') {
      statusVisible = true;
    } else {
      statusVisible = false;
    }
  }

  let orgFormData = {
    pr_ctr_name: 'payroll center name',
    pr_ctr_id: 'payroll center org ID',
    pr_refs: ['PYR']
  }

  MainAPI
    .loadData('contactInfo')
    .then(contactInfo => contactFormData = contactInfo)
</script>

<style type="text/scss">
  @import "src/style/form.scss";
</style>



<div class="field">
Please make sure this information about your organization is correct: 
{#if statusVisible}
<span id='status' transition:fade>{dataStatus}</span>
{/if}
  <button on:click={save}>Save</button>
</div>
<div class="field">
  <label for="pr_name">Payroll Center Name</label>
  <input type="text" name="pr_name" id="pr_name" 
    bind:value={orgFormData.pr_ctr_name} 
    on:focus={() => updateStatus('editing...')}>
</div>
<div class="field">
  <label for="pr_id">Payroll Center ID</label>
  <input type="text" name="pr_id" id="pr_id" 
    bind:value={orgFormData.pr_ctr_id} 
    on:focus={() => updateStatus('editing...')}>
</div>
<div class="field">
<label for='pr_refs'>
  Payroll Reference IDs
</label>
  <h6>Click on the items in the list to edit or add new</h6>
<ul>
  {#each orgFormData.pr_refs as ref, i}
    <li><input type="text"
                bind:value={orgFormData.pr_refs[i]}
                on:focus={() => updateStatus('editing...')}></li>
  {/each}
</ul>
	<input type="text" name="pr_refs" id="pr_refs" style="margin-bottom: 4px;"
				 bind:value={newRef}
         on:focus={() => updateStatus('editing...')}>
	<button on:click={add_new_ref}>Add New</button>
</div>
  