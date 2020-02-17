<script>
  export let title;
  export let info;

  import Navigation from "./atoms/Navigation.svelte";

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
    <div id="headerText">{title}</div>
  </div>
  <Navigation />
  <div id="main_page">
    <h1>This is the {title} page.</h1>
    <p>
      {@html info}
    </p>
  </div>
</div>
