<script>
  

  import Dashboard from "./content/Dashboard.svelte";
  import Employees from "./content/Employees.svelte";
  import OrgInfo from "./content/OrgInfo.svelte";

  import Navigation from "./atoms/Navigation.svelte";

  let selected = {
    component: Dashboard,
    title: "Dashboard"}

  const pages = { Dashboard, Employees, OrgInfo };

  function handleMessage(event) {
    console.log('handleMessage')
    selected.component = pages[event.detail.destination];
    selected.title = event.detail.title;
    console.log(selected.title)
	}

  window.onscroll = function() {
    scrollFunction();
  };

  let start = [0, 0, 0];

  function scrollFunction() {
    if (
      document.body.scrollTop > 40 ||
      document.documentElement.scrollTop > 40
    ) {
      document.getElementById("header").style.height = "50px";
      document.getElementById("headerText").style.fontSize = "40px";
    } else {
      document.getElementById("header").style.height = "150px";
      document.getElementById("headerText").style.fontSize = "60px";
    }
  }
</script>

<style type="text/scss">
  @import "src/colors";
  #header {
    position: fixed;
    top: 0;
    height: 150px;
    width: 100%;
    text-align: right;
    background: $headBack;
    background: linear-gradient(90deg, $background 0%, $headBack 75%);
    transition: 0.2s;
  }
  #headerText {
    font-size: 60px;
    font-weight: bold;
    left: 5%;
    text-transform: uppercase;
    color: $headText;
    transition: 0.2s;
  }
  #main_page {
    margin-top: 150px;
    background: $background;
    margin-left: 60px;
    margin-right: 60px;
  }
  #backdrop {
    width: 100%;
    max-height: 1000%;
    background: $background;
    position: absolute;
    z-index: -1;
  }
</style>

<div id="backdrop">
  <div id="header">
    <div id="headerText">{selected.title}</div>
  </div>
  <Navigation  on:message={handleMessage}/>
  <div id="main_page">
    <svelte:component this={selected.component}/>
  </div>
</div>
