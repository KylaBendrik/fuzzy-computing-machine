<script>
  import { page } from '../stores.js';
  import { get } from 'svelte/store';

  let fields = [
    {header: "First Name", value: "first_name"},
    {header: "Middle Name", value: "middle_name"},
    {header: "Last Name", value: "last_name"}
  ]
  let employees=[
    {first_name: "John", middle_name:"Adam", last_name: "Doe"},
    {first_name: "Jane", middle_name:"Eve", last_name: "Doe"}
  ]

  function updatePageNum(new_id, params){
    page.set({id: new_id, params: params})
  }

  
</script>
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
        <td>{employee[field.value]}</td>
      {/each}
    </tr>
  {/each}
</table>