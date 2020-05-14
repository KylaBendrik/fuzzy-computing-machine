<script>
  let displays = {
    getting_started: true
  }

  function pickGettingStarted(){
    displays.getting_started = true;
  }
</script>
<style type="text/scss">
  @import "src/style/help.scss";
  @import "src/style/submenu.scss";
</style>
<div class="submenu">
  <div class="tabs_container">
    <button id="form_tab" on:click={pickGettingStarted} class="tab">Getting Started</button>
  </div>
</div>
  <div class="form_container">
{#if displays.getting_started}
  <div class="help_page">
    <h1>Welcome to Caz!</h1>
    <h2>Here is an outline of the steps to take to turn payroll information into the correct format for Adventist Retirement.</h2>

    <h3>Getting Started</h3>
    <p>First things first, make sure your info has been entered. Go to "My Info" and fill out the form.</p>
  </div>
{/if}
</div>

