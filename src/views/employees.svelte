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
    {header: "Country", value: "country"},
    {header: "Home Phone", value: "phone_home"},
    {header: "Work Phone", value: "phone_work"},
    {header: "Work Phone Extension", value: "phone_work_ext"}
    
  ]

  let employees=[]

  MainAPI
    .loadData('employeesInfo')
    .then(employeesInfo => employees = employeesInfo[employees])

  function updatePageNum(new_id, params){
    page.set({id: new_id, params: params})
  }

  
</script>
<style type="text/scss">
  @import "src/style/form.scss";
  @import "src/style/table.scss";
</style>
<button on:click={() => updatePageNum('10', {})}>Add Employee</button>
  <table>
    <tr>
      {#each fields as field}
        <th>{field.header}</th>
      {/each}
    </tr>
    
    {#each employees as employee}
      <tr on:click={() => updatePageNum('11', employee)}>
        {#each fields as field}
          <td><input bind:value={employee[field.value]}></td>
        {/each}
      </tr>
    {/each}
  </table>

