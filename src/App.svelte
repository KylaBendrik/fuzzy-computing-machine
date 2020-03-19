<script>
  import Navigation from "./views/navigation.svelte";

  import Dashboard from "./views/dashboard.svelte";
  import MyInfo from "./views/my_info.svelte";
  import Organization from "./views/org_info.svelte";

  let selected = {
    component: Dashboard,
    title: "Dashboard"
  }

  const pages = { Dashboard, MyInfo, Organization };

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
    <Navigation on:message={handleMessage}/>
  </nav>
  <article>
    <svelte:component this={selected.component}/>
  </article>
</main>
      