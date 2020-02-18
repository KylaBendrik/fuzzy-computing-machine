<script>
	let emailRe = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z][A-Za-z]+" 
	let phoneRe = "[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]+"
	let contactInfo = {
		name: 'Contact Name',
		phone: '999-999-9999',
		email: 'example@example.com',
		fax: '111-111-1111'
	}
	
	function save() {
		console.log(contactInfo)
	}
</script>

<style type="text/scss">
  @import "src/colors";

	input:invalid {
		border: 2px dashed $mainColor;
	}
	input:valid {
		border: none;
	}
	tr {
		height: 60px;
    padding: 0px;
    font-size: 16px;
	}
	td.label {
		width: 200px;
		text-align: right;
    font-weight: bold;
    padding: 10px;
    background: $headBack;
    color: $headText;
	}
	td.field {
    width: 300px;
    background: mix(white, $mainColor, 80%);
    transition-duration: 0.2s;
		padding: 5px;
  }
  td.field:hover {
    background: mix(white, $mainColor, 70%);
  }
	input {
		position: relative;
		height: 50px;
    background: rgba($color: #000000, $alpha: 0);
    padding: 5px;
    font-size: 16px;
  }
  .intro {
    width: 100%;
    line-height: 60px;
    height: 50px;
    padding: 10px;
    padding-left: 50px;
  }
  button {
    text-transform: uppercase;
    position: absolute;
    text-decoration: none;
    text-align: center;
    color: white;
    background-color: $mainColor;
    font-size: 16px;
    padding: 12px;
    width: 120px;
    transition-property: background-color;
    transition-duration: 0.2s;
    border-radius: 15px;
    border: none;
    margin: 10px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    z-index: 0;
  }

  button:hover {
    background-color: mix(white, $mainColor, 20%);
  }
  button:active {
    background-color: mix(black, $mainColor, 20%);
  }
</style>
<div class="intro"><i>Please make sure the information below is correct</i><button on:click={save}>Save</button>
</div>

<div class="info_form">
<fieldset>
	<legend>
		Contact Info
	</legend>
	<table>
	<tr>
		<td class="label">Name:</td>
		<td class="field">
			<input type="text" id="contactName" name="contactName" bind:value={contactInfo.name}>
		</td>
	</tr>
	<tr>
		<td class="label">Phone:</td>
		<td class="field"><input type="tel" id="tel" name="tel" 
			 pattern={phoneRe} 
			 bind:value={contactInfo.phone}></td>
	</tr>
	<tr>
		<td class="label">Email:</td>
		<td class="field"><input type="email" 
			 pattern= {emailRe}
			 bind:value={contactInfo.email}></td>
	</tr>
	<tr>
		<td class="label">Fax:</td>
		<td class="field"><input type="tel" id="tel" name="fax" 
			 pattern={phoneRe} 
			 bind:value={contactInfo.fax}></td>
	</tr>
</table>
</fieldset>
</div>


