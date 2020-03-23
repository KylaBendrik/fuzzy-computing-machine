<script>
  import { createEventDispatcher } from 'svelte'
  import { page_num } from '../stores.js';
  const dispatch = createEventDispatcher();

  let main_pages = [
    {id: '0', name: 'Export', href:'/export'},
    {id: '1', name: 'Dashboard', href:'/dashboard'},
    {id: '2', name: 'Organization', href:'/org_info'},
    {id: '3', name: 'Employees', href:'/employees'},
    {id: '4', name: 'My Info', href:'/my_info'}
  ]

  const unsubscribe = page_num.subscribe(value => {
    console.log(`value: ${value}`)
    if (value == '0'){
    pickExport();
  } else if (value == '1') {
    pickDashboard();
  } else if (value == '2') {
    pickOrganization();
  } else if (value == '3') {
    pickEmployees();
  } else if (value == '4') {
    pickMyInfo();
  } else if (value == '10') {
    pickAddEmployee();
  } 
  })

  function navigate(event) {
    event.preventDefault();
    page_num.set(event.target.dataset.pageId);
  }

  function pickExport(){
    dispatch('navmessage', {
      destination: "Export",
      title: "Export"
    });
  }
  function pickDashboard(){
    dispatch('navmessage', {
      destination: "Dashboard",
      title: "Dashboard"
    });
  }
  function pickOrganization(){
    console.log('pickOrganization')
    dispatch('navmessage', {
      destination: "Organization",
      title: "Organization Info"
    });
  }
  function pickEmployees(){
    dispatch('navmessage', {
      destination: "Employees",
      title: "View All Employees"
    });
  }
  function pickMyInfo(){
    dispatch('navmessage', {
      destination: "MyInfo",
      title: "My Information"
    });
  }
  function pickAddEmployee(){
    dispatch('navmessage', {
      destination: "AddEmployee",
      title: "Add Employee"
    });
  }
</script>

<style type="text/scss">
  @import "src/style/navigation.scss";
</style>

<ol>
  {#each main_pages as {id, name, href}, i}
    <li><a {href} 
      data-page-id="{id}"
      on:click={navigate}
      class="page-{page_num === id ? 'active' : 'inactive'}">
      {name}
      </a>
    </li>
  {/each}
</ol>