<script>
  export let title;
  export let info;

  import Header from './atoms/Header.svelte'
</script>
<style type="text/scss">
  @use 'src/colors';
</style>
<Header text={title}/>
<h1>This is the {title} page.</h1>
<p>{info}</p>

