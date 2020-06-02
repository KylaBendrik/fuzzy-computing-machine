<script>
  function openLink_releases(){
    console.log(`dashboard openLink: 'releases'`)
    MainAPI.openLink("openLink", "releases")
  }
  function openLink_issues(){
    console.log(`dashboard openLink: 'issues'`)
    MainAPI.openLink("openLink", "issues")
  }
</script>
<style type="text/scss">
  @import "src/style/colors.scss";
  .container {
    display: grid;
    grid-template-areas: "option1 option2"
                      "option3 option4";
  
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 4fr 1fr;
    grid-gap: 3px;

    width: 100%;
    height: 100%;

    color: white;
  }
  .subsection4 {
    grid-area: option1;
    background: mix(white, $base_color, 50%);
    padding: 15px;
  }
  .subsection4 {
    grid-area: option4;
    background: mix(white, $base_color, 50%);
    padding: 15px;
  }
  h2 {
    color: black;
  }
  ul {
    list-style-type: none;
    padding: 0px;
  }
  button {
  width: 400px;
  border: none;
  background: $button_color;
  font-size: 20px;
  color: black;
  margin: 5px;
  
  box-shadow: 2px -2px 5px 0 rgba(0,0,0,0.2), 4px -4px 8px 0 rgba(0,0,0,0.19);
  
  font-family: Candara, Verdana, sans-serif; 
}
</style>

<div class="container">
  <div class="subsection1"><h2>Welcome to CAZ!</h2>
  Not sure what to do first? Check out the Help page!</div>
  

  <div class="subsection4">
    <ul class="button_list">
      <li><button on:click={openLink_releases}>Check for updates</button></li>
      <li><button on:click={openLink_issues}>Submit Bug Report or  Feature Request</button></li>
    </ul>
    
  </div>
  
</div>