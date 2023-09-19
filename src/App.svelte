<script>
	import CritterContainer from "./components/CritterContainer.svelte";
	import Filters from "./components/Filters.svelte";
	import Header from "./components/Header.svelte";

	let selectedGame;
	let filters;
</script>


<Header bind:selectedGame/>

<CritterContainer bind:selectedGame bind:filters/>

<Filters bind:selectedGame bind:filters/>
