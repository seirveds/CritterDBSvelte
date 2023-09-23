<script>
	import CritterContainer from "./components/CritterContainer.svelte";
	import Filters from "./components/Filters.svelte";
	import Header from "./components/Header.svelte";

	export let selectedGame = "newhorizons";
	export let filters = {
        "crittertype": "fish",
        "month": currentMonth(),
        "time": currentTime(),
        "all": false,
		"ignoreTime": false,
    };

	function currentMonth() {
		const d = new Date();
		return d.getMonth() + 1;
	}

	function currentTime() {
		const d = new Date();
		return d.getHours();
	}
</script>


<Header bind:selectedGame/>

<CritterContainer bind:selectedGame bind:filters/>

<Filters bind:selectedGame bind:filters/>
