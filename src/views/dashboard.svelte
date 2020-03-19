
<style type="text/scss">
  $base_color: #007681;
  .container {
    display: grid;
    grid-template-areas: "option1 option2"
                      "option3 option4";
  
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 3px;

    width: 100%;
    height: 100%;
  }
  .option1 {
    grid-area: option1;
    background: $base_color
  }
  .option2 {
    grid-area: option2;
    background: mix(black, $base_color, 25%);
  }
  .option3 {
    grid-area: option3;
    background: mix(white, $base_color, 25%);
  }
  .option4 {
    grid-area: option4;
    background: mix(black, $base_color, 50%);
  }
</style>

<div class="container">
  <div class="option1"></div>
  <div class="option2"></div>
  <div class="option3"></div>
  <div class="option4"></div>
</div>