<script>
  import Field from './field.svelte'

  let dataStatus = 'inactive'
  let statusVisible = false
  
  const org_fields = [
    {
      field_label: "Payroll Center Name",
      field_id: "pr_name",
      size: 45,
      description: "Payroll Center Organization Name",
      input_type: "text",
      required: true
    },
    {
      field_label: "Payroll Center ID",
      field_id: "pr_id",
      size: 6,
      description: "Payroll Center Organization ID Code as assigned by NAD. This designates the entity preparing and submitting this file, and may be different from the employer with the relationship with the employee.",
      input_type: "text",
      required: true
    },
  ]

  function add_new_ref() {
		console.log(newRef)
		orgFormData.pr_refs = [...orgFormData.pr_refs, newRef.toUpperCase()];
  }
  let newRef = ""
  function save() {
    console.log("save()")
    MainAPI
    .saveData('orgInfo', orgFormData)
  }

  let orgFormData = {
    pr_ctr_name: 'payroll center name',
    pr_ctr_id: 'payroll center org ID',
    pr_refs: ['PYR']
  }

  MainAPI
    .loadData('orgInfo')
    .then(orgInfo => orgFormData = orgInfo)
</script>

<style type="text/scss">
  @import "src/style/form.scss";
  li {
    margin: 4px;
  }
</style>

<div class="form_page">
  <h2 style="display:inline">Organization Information</h2><button on:click={save} >Save</button>
  <h4>Please make sure this information about your organization is correct:</h4>
  {#each org_fields as field}
    <Field field={field} bind:value={orgFormData[field.field_id]} />
  {/each}
  <div class="field">
    <span class="tooltiptext">Click on the items in the list to edit or add new</span>
    <label class="fieldlabel" for='pr_refs'>Payroll Reference IDs</label>
      <ul>
        {#each orgFormData.pr_refs as ref, i}
          <li><input type="text"
                      bind:value={orgFormData.pr_refs[i]}
                      maxlength="3" class="maininput"></li>
        {/each}
        <li>
          <input type="text" name="pr_refs" id="pr_refs" style="margin-bottom: 4px;"
            bind:value={newRef}
            maxlength="3" class="maininput">
          <button on:click={add_new_ref}>Add New</button>
        </li>
      </ul>
      
</div>
</div>