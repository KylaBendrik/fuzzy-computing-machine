<script>
import {createEventDispatcher} from 'svelte';
const dispatch = createEventDispatcher();

	let pages = [
		{id: '0', name: 'Dashboard', href:'/Dashboard'}, 
		{id: '1', name: 'Organization Info', href:'/OrgInfo'}, 
		{id: '2', name: 'Employees', href:'/Employees'}
	]
	let colors = [
		'#3e8391', '#83d3e2', '#234951'
	]
	let currentPage = '0';
	
	function navigate(event) {
		event.preventDefault();
		currentPage = event.target.dataset.pageId;
  }
  
  $: if (currentPage == '0'){
		pickDashboard()
	} else if (currentPage == '2'){
		pickEmployees()
	} else if (currentPage == '1'){
    pickOrgInfo()
  }

  function pickDashboard(){
		dispatch('message', {
      destination: "Dashboard",
      title: "Dashboard"
		});
  }
  function pickOrgInfo(){
		dispatch('message', {
      destination: "OrgInfo",
      title: "Organization Info"
		});
	}
	function pickEmployees(){
		dispatch('message', {
			destination: "Employees",
      title: "Employees"
		});
	}


</script>

<style type="text/scss">
  @import "src/colors";
	ul {
		list-style-type: none;
		margin: 0;
    padding: 0;
    position: sticky;
    top: 0px;
	}
	a {
		text-decoration: none;
		display: block;
		color: white;
		font-family: 'Noto Sans', sans-serif;
		width: 170px;
		padding: 15px 40px 15px 0px;
		text-align: right;
		text-transform: uppercase;
		position: absolute;
		border-radius: 0px 15px 15px 0px;
		left: -175px;
		transition-duration: 0.6s;
		box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
	}
	a:hover, a.page-active:hover {
		left: 0px;
	}
	a.page-active {
		left: -150px;
	}
	li:nth-child(1) a{
		background: (mix(white, $mainColor, 0%));
		top: 40px;
	}
	li:nth-child(2) a{
		background: (mix(white, $mainColor, 20%));
		top: 85px;
	}
	li:nth-child(3) a{
		background: (mix(white, $mainColor, 40%));
		top: 130px;
	}
</style>

<ul>
	{#each pages as {id, name, href}, i}
		<li><a {href}
					 data-page-id="{id}"
					 on:click={navigate}
					 class="page-{currentPage === id ? 'active' : 'inactive'}"
					 >
			{name}
			</a></li>
	{/each}
</ul>