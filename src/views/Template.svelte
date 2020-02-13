<script>
  export let title;
  export let info;

  import Header from './atoms/Header.svelte'
</script>

<Header text={title}/>
<p>{info}</p>

