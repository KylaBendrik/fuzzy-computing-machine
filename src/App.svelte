<script>
  import Navigation from "./views/navigation.svelte";

  import Dashboard from "./views/dashboard.svelte";
  import MyInfo from "./views/my_info.svelte";
  import Organization from "./views/org_info.svelte";
  import Employees from "./views/employees.svelte";

  import AddEmployee from "./views/view_employee.svelte";

  let selected = {
    component: Dashboard,
    title: "Dashboard"
  }

  const pages = { Dashboard, MyInfo, Organization, Employees, AddEmployee };

  function handleMessage(event) {
    selected.component = pages[event.detail.destination];
    selected.title = event.detail.title;
  }
  
</script>

<style type="text/scss">
  @import "src/style/template.scss";
</style>

<main>
  <header>{selected.title}</header>
  <nav>
    <Navigation on:navmessage={handleMessage}/>
  </nav>
  <article>
    <svelte:component this={selected.component}/>
  </article>
</main>
      