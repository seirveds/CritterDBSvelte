<script>
	import CritterContainer from "./components/CritterContainer.svelte";
	import Filters from "./components/Filters.svelte";
	import Header from "./components/Header.svelte";

	let dropdownSelection;
	let filters;
</script>


<Header bind:dropdownSelection/>


<Filters bind:filters/>

<CritterContainer bind:dropdownSelection bind:filters/>

