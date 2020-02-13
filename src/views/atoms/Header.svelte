<script>
  export let text;
  
  window.onscroll = function() {scrollFunction()};

  function scrollFunction(){
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
      document.getElementById("header").style.padding = "5px 120px"
    } else {
      document.getElementById("header").style.padding = "40px 120px"
    }
  }
</script>
<style>
  .header {
    font-size: 40px;
    font-family: 'Noto Sans';
    font-weight: bold;
    text-align: right;
    text-transform: uppercase;
    color: white;
    max-width: 100%;
    position: sticky;
    top: 0;
    background-color: cadetblue;
    padding: 40px 100px;
    transition: 0.5s;
  }
</style>

<div class="header" id="header">{text}</div>