<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher();

  let pages = [
    {id: '0', name: 'Export', href:'/export'},
    {id: '1', name: 'Dashboard', href:'/dashboard'},
    {id: '2', name: 'Organization', href:'/org_info'},
    {id: '3', name: 'Employees', href:'/employees'},
    {id: '4', name: 'My Info', href:'/my_info'},
  ]

  let currentPage = '1';

  function navigate(event) {
    event.preventDefault();
    currentPage = event.target.dataset.pageId;
  }

  $: if (currentPage == '0'){
    pickExport();
  } else if (currentPage == '1') {
    pickDashboard();
  } else if (currentPage == '2') {
    pickOrganization();
  } else if (currentPage == '3') {
    pickEmployees();
  } else if (currentPage == '4') {
    pickMyInfo();
  }

  function pickExport(){
    dispatch('message', {
      destination: "Export",
      title: "Export"
    });
  }
  function pickDashboard(){
    dispatch('message', {
      destination: "Dashboard",
      title: "Dashboard"
    });
  }
  function pickOrganization(){
    dispatch('message', {
      destination: "Organization",
      title: "Organization Info"
    });
  }
  function pickEmployees(){
    dispatch('message', {
      destination: "Employees",
      title: "View All Employees"
    });
  }
  function pickMyInfo(){
    dispatch('message', {
      destination: "MyInfo",
      title: "My Information"
    });
  }
</script>

<style type="text/scss">
  @import "src/style/navigation.scss";
</style>

<ol>
  {#each pages as {id, name, href}, i}
    <li><a {href} 
      data-page-id="{id}"
      on:click={navigate}
      class="page-{currentPage === id ? 'active' : 'inactive'}">
      {name}
      </a>
    </li>
  {/each}
</ol>