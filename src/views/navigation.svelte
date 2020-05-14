<script>
  import { createEventDispatcher } from 'svelte'
  import { page } from '../stores.js';
  const dispatch = createEventDispatcher();

  let main_pages = [
    {id: '0', name: 'Export', href:'/export'},
    {id: '1', name: 'Dashboard', href:'/dashboard'},
    {id: '2', name: 'Organization', href:'/org_info'},
    {id: '3', name: 'Employees', href:'/employees'},
    {id: '4', name: 'My Info', href:'/my_info'},
    {id: '20', name: 'Help', href:'/help'}
  ]

  const unsubscribe = page.subscribe(value => {
    //console.log(`id: ${value.id}, params: ${JSON.stringify(value.params)}`)
    if (value.id == '0'){
    pickExport();
  } else if (value.id == '1') {
    pickDashboard();
  } else if (value.id == '2') {
    pickOrganization();
  } else if (value.id == '3') {
    pickEmployees();
  } else if (value.id == '4') {
    pickMyInfo();
  } else if (value.id == '10') {
    pickAddEmployee();
  } else if (value.id == '11') {
    pickViewEmployee();
  } else if (value.id == '20') {
    pickHelp();
  }
  })

  function navigate(event) {
    event.preventDefault();
    page.set({id: event.target.dataset.pageId, params: event.target.dataset.params});
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
  function pickViewEmployee(){
    dispatch('navmessage', {
      destination: "ViewEmployee",
      title: "View Employee"
    })
  }
  function pickHelp(){
    console.log("navigate to help page")
    dispatch('navmessage', {
      destination: "Help",
      title: "Help"
    })
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
      class="page-{page === id ? 'active' : 'inactive'}">
      {name}
      </a>
    </li>
  {/each}
</ol>