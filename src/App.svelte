<script>
	import CritterContainer from "./components/CritterContainer.svelte";
	import Filters from "./components/Filters.svelte";
	import Header from "./components/Header.svelte";

	export let selectedGame = "newhorizons";
	export let filters = {
        "crittertype": "fish",
        "month": 1,  // TODO current month
        "time": 0,  // TODO current time
        "all": true,
    };
</script>


<Header bind:selectedGame/>

<CritterContainer bind:selectedGame bind:filters/>

<Filters bind:selectedGame bind:filters/>
