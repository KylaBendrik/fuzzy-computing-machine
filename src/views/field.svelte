<script>
	export let field;
	export let value="";
</script>
<style type="text/scss">
@import "src/style/form.scss";
</style>
<div class="tooltip">
	<span class="tooltiptext">{field.description}</span>
		<label for={field.value}>{field.field_label}</label>
	{#if field.input_type == "radio"}
		<ul>
			{#each field.options as option}
			<li>
				<label for={option.value}>{option.label}</label>
				<input type="radio" id={option.value} name={field.field_id} value={option.value} required={field.required} bind:group={value}>
			</li>
			{/each}
		</ul>
	{/if}
	{#if field.input_type == "text"}
		<input type="text" maxlength={field.size} required={field.required} bind:value={value}>
	{/if}
	{#if field.input_type == "number"}
		<input type="text" maxlength={field.size} required={field.required} bind:value={value}>
	{/if}
	{#if field.input_type == "date"}
		<input type="date" required={field.required} bind:value={value}>
	{/if}
</div>