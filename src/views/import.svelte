<script>
  // import parse from "../importCSV"
  // import fs from "fs"

  // const june = fs.readFileSync("./spec/fixtures/june.csv");
  // const june_parsed = parse(june);
  // const picard = june_parsed.employees[0];

  
  // console.log(" -- Picard --");
  // console.log(picard)

  function importCSV() {
    console.log("importCSV()");
    data = MainAPI.importCSV()
    console.log(data)
  }
</script>
<style type="text/scss">
  @import "src/style/form.scss";
</style>

<button on:click={importCSV}>Import a CSV File</button>