<script>
  import { page } from '../stores.js';
  import { get } from 'svelte/store';

  let fields = [
    {header: "First Name", value: "first_name"},
    {header: "Middle Name", value: "middle_name"},
    {header: "Last Name", value: "last_name"},
    {header: "City", value: "city"},
    {header: "State", value: "state"},
    {header: "Country", value: "country"},
    {header: "Home Phone", value: "phone_home"}
  ]

  function updatePageNum(new_id, params){
    page.set({id: new_id, params: params})
  }

   var employeesData = [];

  const loadingEmployees = MainAPI
                            .loadData('employeesInfo')
                            .then(employeesInfo => employeesData = employeesInfo['employees'])

</script>
<style type="text/scss">
  @import "src/style/table.scss";
  button {
  width: 200px;
  height: 30px;
  border: none;
  background: $button_color;
  font-size: 20px;
  color: black;
  margin: 5px;
  
  box-shadow: 2px -2px 5px 0 rgba(0,0,0,0.2), 4px -4px 8px 0 rgba(0,0,0,0.19);
  
  font-family: Candara, Verdana, sans-serif; 
}
</style>
<button on:click={() => updatePageNum('10', {})}>Add Employee</button>
{#await loadingEmployees}
  loading...
{:then employeesData}
  <table>
    <tr>
      {#each fields as field}
        <th>{field.header}</th>
      {/each}
    </tr>
    
    {#each employeesData as employee}
      <tr on:click={() => updatePageNum('11', employee)}>
        {#each fields as field}
          <td>{employee[field.value]}</td>
        {/each}
      </tr>
    {/each}
  </table>
{:catch error}
  There's a problem!
{/await}
