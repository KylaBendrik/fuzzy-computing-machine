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
  button {
    max-width: 160px;
    border: none;
    background: $button_color;
    font-size: 25px;
    color: black;
    font-family: Candara, Verdana, sans-serif; 
  }
</style>
<h2 style="display:inline">Contact Information</h2><button on:click={save}>Save</button>
<h4>Please make sure this information about you is correct: </h4>
{#if statusVisible}
<span id='status' transition:fade>{dataStatus}</span>
{/if}
  <div class="field">
    <span class="tooltiptext">Person to contact regarding this file</span>
    <label for="name" class="fieldlabel">Contact Name</label>
    <input type="text" name="name" id="name" class="maininput" maxlength="40"
      bind:value={contactFormData.contact_name} 
      on:focus={() => updateStatus('editing...')}>
  </div>
  <div class="field">
    <span class="tooltiptext">Phone number of contact person including extension</span>
    <label for="email" class="fieldlabel">Contact Email</label>
    <input type="text" name="email" id="email" class="maininput" maxlength="25"
      bind:value={contactFormData.contact_email} 
      on:focus={() => updateStatus('editing...')}>
  </div>
  <div class="field">
    <span class="tooltiptext">Email address of contact person</span>
    <label for="phone" class="fieldlabel">Contact Phone</label>
    <input type="text" name="phone" id="phone" class="maininput" maxlength="45"
      bind:value={contactFormData.contact_phone} 
      on:focus={() => updateStatus('editing...')}>
  </div>
  <div class="field">
    <span class="tooltiptext">Fax number of contact person</span>
    <label for="fax" class="fieldlabel">Contact Fax</label>
    <input type="text" name="fax" id="fax" class="maininput" maxlength="25"
      bind:value={contactFormData.contact_fax} 
      on:focus={() => updateStatus('editing...')}>
  </div>