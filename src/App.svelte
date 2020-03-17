<script>
  import Dashboard from "./views/dashboard.svelte";

  let selected = {
    component: Dashboard,
    title: "Dashboard"
  }

  const pages = { Dashboard };

  function handleMessage(event) {
    console.log('handleMessage')
    selected.component = pages[event.detail.destination];
    selected.title = event.detail.title;
    console.log(selected.title)
  }
  
</script>

<style type="text/scss">
  @import "src/style/template.scss";
</style>

<main>
  <header>{selected.title}</header>
  <nav>
    <ol>
      <li><a href="dashboard">Dashboard</a></li>
      <li><a href="employees">Employees</a></li>
      <li><a href="export">Export</a></li>
      <li><a href="orginfo">Organization</a></li>
      <li><a href="myinfo">My Info</a></li>
    </ol>
  
  </nav>
  <article>
    <svelte:component this={selected.component}/>
  </article>
</main>
      