<script>
  import Navigation from "./views/navigation.svelte";

  import Dashboard from "./views/dashboard.svelte";
  import MyInfo from "./views/my_info.svelte";
  import Organization from "./views/org_info.svelte";
  import Employees from "./views/employees.svelte";
  import Import from "./views/import.svelte";
  import Export from "./views/export.svelte";
  import Help from "./views/help.svelte";

  import AddEmployee from "./views/view_employee.svelte";

  import ViewEmployee from "./views/view_employee.svelte";

  let selected = {
    component: Dashboard,
    title: "Dashboard",
    params: {}
  };

  const pages = {
    Dashboard,
    MyInfo,
    Organization,
    Employees,
    AddEmployee,
    ViewEmployee,
    Export,
    Import,
    Help
  };

  function handleMessage(event) {
    selected.component = pages[event.detail.destination];
    selected.title = event.detail.title;
    selected.params = event.detail.params;
  }

    function pushCloseWindow() {
    MainAPI.closeWindow()
  }

  function pushMinimizeWindow() {
    MainAPI.minimizeWindow()
  }
</script>

<style type="text/scss">
  @import "src/style/template.scss";
  @import "src/style/titlebar.scss";
</style>

<main>
  <header id="titlebar">
    <div id="drag-region">
      <div id="window-title">
        <img src="../images/icon.png" height="24" alt="caz"/>
        <span> - {selected.title}</span>
      </div>
    </div>
    <div id="window-controls">

      <div class="button" id="min-button" on:click={pushMinimizeWindow}>

        <img
          class="icon"
          srcset="../images/icons/min-w-10.png 1x, icons/min-w-12.png 1.25x,
          icons/min-w-15.png 1.5x, icons/min-w-15.png 1.75x, icons/min-w-20.png
          2x, icons/min-w-20.png 2.25x, icons/min-w-24.png 2.5x,
          icons/min-w-30.png 3x, icons/min-w-30.png 3.5x"
          draggable="false" alt="minimize"/>
      </div>

      <div class="button" id="close-button" on:click={pushCloseWindow}>
        <img
          class="icon"
          srcset="../images/icons/close-w-10.png 1x, icons/close-w-12.png 1.25x,
          icons/close-w-15.png 1.5x, icons/close-w-15.png 1.75x,
          icons/close-w-20.png 2x, icons/close-w-20.png 2.25x,
          icons/close-w-24.png 2.5x, icons/close-w-30.png 3x,
          icons/close-w-30.png 3.5x"
          draggable="false" alt="close"/>
      </div>

    </div>
  </header>
  <header id="mainheader">{selected.title}</header>
  <nav>
    <Navigation on:navmessage={handleMessage} />
  </nav>
  <article>
    <svelte:component this={selected.component} />
  </article>
</main>
