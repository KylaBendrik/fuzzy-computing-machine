<script>
  import { cRecordExport, ReadyAllExports } from '../export_utils.js';
  



  var employeesData = [];

  const loadingEmployees = MainAPI
                            .loadData('employeesInfo')
                            .then(employeesInfo => employeesData = employeesInfo['employees'])

function saveExport() {
    console.log("saveExport()")
    let data_string = ReadyAllExports(employeesData)
    MainAPI
    .exportData(data_string)
    .then(alert('Saved export!'))
    
}
  
</script>

<h1>Export</h1><button on:click={saveExport}>Export</button>
<p>Now that you've put in all the necessary information, you can export a fixed-width format file, ready to submit.</p>
{#await loadingEmployees}
  loading...
{:then employeesData}
  {#each employeesData as employee}
    <pre>{cRecordExport(employee)}</pre>
  {/each}
{/await}
