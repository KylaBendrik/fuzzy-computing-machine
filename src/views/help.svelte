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
  <div class="form_container">
{#if displays.getting_started}
  <div class="help_page">
    <h1>Welcome to Caz!</h1>
    <h2>Here is an outline of the steps to take to turn payroll information into the correct format for Adventist Retirement.</h2>

    <h3>Getting Started</h3>
    <p>First things first, make sure your info has been entered. Go to "My Info" and fill out the form.</p>
    <p>Next, go to the "Organization Info" page and fill the form. These two steps will fill in sections of the final document automatically.</p>
    <i>If you are ever unsure what a field is for, mouse over it to see a description pop upon the right of the form.</i>
    <h3>Employees</h3>
    <p>The "Employees" page contains a table of all the employees you've added. Click on a line to view that employee's information, or click the "Add Employee" button to add a new line.
    Each employee's information page contains three tabs to organize their info: </p>
      <ul>
        <li>Personal - SSN, legal name, address, birthday, etc. (likely won't change often)</li>
        <li>Employment - Work Phone, hire date, status, enrollment id, etc. (likely won't change often)</li>
        <li>Payroll - Fed Wages, YTD, Tax amounts, loans, salary info (parts will need to change for each payroll submitted)</li>
      </ul>
      <i>Due to the way the retierment system works, you will need a separate employee line for each Enrollment ID.</i>
    <h3>Exporting</h3>
    <p>Once you have all the info filled out, go to the "Export" page, which will walk you through the process.
    For the next payroll, just change the appropriate lines in the employee's forms (if necessary), and export! The rest of the information will be saved for you.</p>
    </div>
{/if}
</div>

