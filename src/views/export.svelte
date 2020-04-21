<script>
  import {
    aRecordExport,
    cRecordExport,
    readyAllExports
  } from "../export_utils.js";

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
        employeesData,
        aRecordExport(contactInfo, orgInfo, packageInfo, formInfo)
      );
      MainAPI.exportData([file_name, data_string]).then(alert("Saved export!"));
    });
  }
</script>

<style type="text/scss">
  @import "src/style/form.scss";
</style>

<div class="payroll_info">
  <div class="field">
    <label class="tooltip" for="pay_date">
      Pay Date
      <span class="tooltiptext">
        This is the check issue date printed on payroll checks. Submit a
        separate file for each pay date.
      </span>
    </label>
    <input type="date" id="pay_date" name="pay_date" bind:value={formInfo.pay_date} />
  </div>
  <div class="field">
    <label class="tooltip" for="frequency">
      Frequency
      <span class="tooltiptext">
        Daily, Quarterly, and Yearly are not accepted. Contact Adventist
        Retirement if you have a business need for one of these.
      </span>
    </label>
    <select name="frequency" id="frequency" bind:value={formInfo.frequency}>
      <option value="">--Please choose an option--</option>
      <option value="M">Monthly</option>
      <option value="S">Semi-Monthly</option>
      <option value="B">Biweekly</option>
      <option value="W">Weekly</option>
    </select>
  </div>
  <div class="field">
    <label class="tooltip" for="payroll_run_ref">
      Payroll Run Reference
      <span class="tooltiptext" />
    </label>
    {#await promises}
      loading...
    {:then data}
      <select name="payroll_run_ref" id="payroll_run_ref" bind:value={formInfo.payroll_run_ref}>
        <option value="">--Please choose an option--</option>
        {#each data[1]['pr_refs'] as ref}
          <option value={ref}>{ref}</option>
        {/each}
      </select>
    {/await}
  </div>
  <div class="field">
    <label class="tooltip" for="notes">
      Notes
      <span class="tooltiptext">Comments regarding file</span>
    </label>
    <input type="text" id="notes" name="notes" maxlength="75" bind:value={formInfo.notes}/>
  </div>
</div>
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
  {#await loadingEmployees}
    loading... stone
  {:then employeesData}
    {#each employeesData as employee}
      <pre>{cRecordExport(employee)}</pre>
    {/each}
  {/await}
</div>
