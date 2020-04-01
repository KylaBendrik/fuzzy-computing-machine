<script>
  let dataStatus = 'inactive'
	let statusVisible = false


  function save() {
    console.log("save()")
    MainAPI
    .saveData('contactInfo', contactFormData)
    .then(updateStatus)
  }

  function updateStatus(input) {
    dataStatus = input
    if (input == 'data saved!') {
      statusVisible = true;
    } else {
      statusVisible = false;
    }
  }

  let contactFormData = {
    contact_name: 'name',
    contact_phone: 'phone number',
    contact_fax: 'fax number',
    contact_email: 'email address'
  }

  MainAPI
    .loadData('contactInfo')
    .then(contactInfo => contactFormData = contactInfo)
</script>

<style type="text/scss">
  @import "src/style/form.scss";
</style>

Hello! Please make sure this information about you is correct: 
{#if statusVisible}
<span id='status' transition:fade>{dataStatus}</span>
{/if}
  <div class="field">
    <label for="name">Name</label>
    <input type="text" name="name" id="name" 
      bind:value={contactFormData.contact_name} 
      on:focus={() => updateStatus('editing...')}>
  </div>
  <div class="field">
    <label for="email">Email</label>
    <input type="text" name="email" id="email" 
      bind:value={contactFormData.contact_email} 
      on:focus={() => updateStatus('editing...')}>
  </div>
  <div class="field">
    <label for="phone">Phone</label>
    <input type="text" name="phone" id="phone" 
      bind:value={contactFormData.contact_phone} 
      on:focus={() => updateStatus('editing...')}>
  </div>
  <div class="field">
    <label for="fax">Fax</label>
    <input type="text" name="fax" id="fax" 
      bind:value={contactFormData.contact_fax} 
      on:focus={() => updateStatus('editing...')}>
  </div>
  <div class="field">
    <button on:click={save}>Save</button>
  </div>