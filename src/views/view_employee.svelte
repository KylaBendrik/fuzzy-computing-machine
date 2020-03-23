<script>
  let fields = [
      {header: "First Name", value: "first_name"},
      {header: "Last Name", value: "last_name"}
    ]
  let employee=[
    {first_name: "John", last_name: "Doe"}
  ]
</script>
{#each fields as field}
  <label for={field.value}>{field.header}</label>
  <input type="text" id={field.value} name={field.value} bind:value={employee[field.value]}>
{/each}