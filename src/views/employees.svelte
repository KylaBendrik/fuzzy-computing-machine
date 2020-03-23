<script>
  import { page_num } from '../stores.js';

  let fields = [
      {header: "First Name", value: "first_name"},
      {header: "Last Name", value: "last_name"}
    ]
  let employees=[
    {first_name: "John", last_name: "Doe"},
    {first_name: "Jane", last_name: "Doe"}
  ]

  function updatePageNum(id){
    page_num.set(id)
  }

  
</script>
<a href="/view_employee" on:click={updatePageNum(id)} data-page-id="10">Add Employee</a>
<table>
  <tr>
    {#each fields as field}
      <th>{field.header}</th>
    {/each}
  </tr>
  
  {#each employees as employee}
    <tr>
      {#each fields as field}
        <td>{employee[field.value]}</td>
      {/each}
    </tr>
  {/each}
</table>