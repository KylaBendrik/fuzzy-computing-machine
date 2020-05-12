<script>
  import {
    aRecordExport,
    cRecordExport,
    readyAllExports
  } from "../export_utils.js";

  let displays = {
    form: true,
    employees: false,
    preview: false
  };

  function pickForm(submission) {
    submission.preventDefault();
    
    displays.form       = true;
    displays.employees  = false;
    displays.preview    = false;
  }

  function pickEmployees(submission) {
    submission.preventDefault();

    //enable preview button
    const preview_button = document.getElementById('preview_tab')

    if (preview_button.disabled == true){
      console.log('preview is disabled!')
      preview_button.disabled = false
      console.log('preview is enabled!')
    }

    displays.form       = false;
    displays.employees  = true;
    displays.preview    = false;
  }

  function pickPreview(submission) {
    submission.preventDefault();

    displays.form       = false;
    displays.employees  = false;
    displays.preview    = true;
  }

  let today = new Date();
  let month = `${today.getMonth() + 1}`;
  if (month.length == 1) {
    month = "0" + month;
  }
  let day = `${today.getDate() + 1}`;
  if (day.length == 1) {
    day = "0" + day;
  }
  let date = today.getFullYear() + "-" + month + "-" + day;

  var employeesData = [];
  var formInfo = {
    pay_date: today,
    payroll_run_ref: "",
    pay_frequency: "",
    notes: "",
    payroll_run_ref: ""
  };
  var selected_employees = []
  let fields = [
    {header: "Enrollment ID", value: "enrollment_id"},
    {header: "First Name", value: "first_name"},
    {header: "Middle Name", value: "middle_name"},
    {header: "Last Name", value: "last_name"},
    {header: "Zip/Postal Code", value: "zip/postal_code"},
  ]
  var contactInfo;
  var orgInfo;

  const loadingEmployees = MainAPI.loadData("employeesInfo").then(
    employeesInfo => (employeesData = employeesInfo["employees"]),
    console.log(JSON.stringify(employeesData))
  );

  const promises = Promise.all([
    MainAPI.loadData("contactInfo"),
    MainAPI.loadData("orgInfo"),
    MainAPI.loadData("packageInfo")
  ]);

  function saveExport() {
    promises.then(([contactInfo, orgInfo, packageInfo]) => {
      console.log("saveExport()");
      console.log(JSON.stringify(packageInfo));
      const [file_name, data_string] = readyAllExports(
        selected_employees,
        aRecordExport(contactInfo, orgInfo, packageInfo, formInfo)
      );
      MainAPI.exportData([file_name, data_string]);
    });
  }
</script>

<style type="text/scss">
  @import "src/style/form.scss";
  @import "src/style/table.scss";
  @import "src/style/submenu.scss";
</style>
<div class="submenu">
  <div class="tabs_container">
    <button id="form_tab" on:click={pickForm} class="tab">Payroll</button>
    <button id="employees_tab" class="tab"
    type="submit" form="payroll_form">Employees</button>
    <button id="preview_tab" class="tab"
    type="submit" form="employees" disabled>Preview</button>
  </div>
</div>
{#if displays.form}
  <div class="form_container">
    <form id="payroll_form" on:submit={pickEmployees}>
      <div class="field">
      <span class="tooltiptext">
            This is the check issue date printed on payroll checks. Submit a
            separate file for each pay date.
          </span>
        <label class="fieldlabel" for="pay_date">
          Pay Date
          
        </label>
        <input
          type="date"
          id="pay_date"
          name="pay_date"
          bind:value={formInfo.pay_date}
          required="required"
           class="maininput"/>
      </div>
      <div class="field">
      <span class="tooltiptext">
            Daily, Quarterly, and Yearly are not accepted. Contact Adventist
            Retirement if you have a business need for one of these.
          </span>
        <label class="fieldlabel" for="frequency">
          Frequency
          
        </label>
        <select
          name="frequency"
          id="frequency"
          bind:value={formInfo.frequency}
          required="required"
          class="maininput">
          <option value="">--Please choose an option--</option>
          <option value="M">Monthly</option>
          <option value="S">Semi-Monthly</option>
          <option value="B">Biweekly</option>
          <option value="W">Weekly</option>
        </select>
      </div>
      <div class="field">
      <span class="tooltiptext">
            Three alpha-numeric characters. Assign each type of payroll produced by a single
            payroll center its own unique 3-character string. Different types of payroll runs might include
            but not be limited to bi-weekly hourly, monthly salary, etc. Assign these identifiers on the Organization Info page.
          </span>
        <label class="fieldlabel" for="payroll_run_ref">
          Payroll Run Reference
        </label>
        {#await promises}
          loading...
        {:then data}
          <select
            name="payroll_run_ref"
            id="payroll_run_ref"
            bind:value={formInfo.payroll_run_ref}
            required="required"
             class="maininput">
            <option value="">--Please choose an option--</option>
            {#each data[1]['pr_refs'] as ref}
              <option value={ref}>{ref}</option>
            {/each}
          </select>
        {/await}
      </div>
      <div class="field">
      
          <span class="tooltiptext">Comments regarding file</span>
        <label class="fieldlabel" for="notes">
          Notes
        </label>
        <input
          type="text"
          id="notes"
          name="notes"
          maxlength="75"
          bind:value={formInfo.notes}
           class="maininput"/>
      </div>
    </form>
  </div>
  
{/if}
{#if displays.employees}
  <div class="form_container">
  <form id="employees" on:submit={pickPreview}>
    {#await loadingEmployees}
      loading...
    {:then employeesData}
      <table>
        <tr>
          <th>Select</th>
          {#each fields as field}
            <th>{field.header}</th>
          {/each}
        </tr>
        {#each employeesData as employee}
          <tr>
            <td><input type="checkbox" bind:group={selected_employees} value={employee}></td>
            {#each fields as field}
              <td>{employee[field.value]}</td>
            {/each}
          </tr>
        {/each}
      </table>
    {/await}
  </form>
  
  </div>
{/if}
{#if displays.preview}
  <div class="preview">
    <h1>Export</h1>
    <button on:click={saveExport}>Export</button>
    <p>
      Now that you've put in all the necessary information, you can export a
      fixed-width format file, ready to submit.
    </p>
    {#await promises}
      loading...
    {:then data}
      <pre>{aRecordExport(data[0], data[1], data[2], formInfo)[1]}</pre>
    {/await}
    {#each selected_employees as employee}
      <pre>{cRecordExport(employee)}</pre>
    {/each}
  </div>
{/if}
