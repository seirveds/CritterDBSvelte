<script>
	import CritterContainer from "./components/CritterContainer.svelte";
	import Filters from "./components/Filters.svelte";
	import Header from "./components/Header.svelte";

	import { currentMonth, currentTime} from "./utils"

	export let selectedGame = "newleaf";
	export let filters = {
        "crittertype": "fish",
        "month": currentMonth(),
        "time": currentTime(),
        "all": false,
		"ignoreTime": false,
		"includeIsland": false,
    };
</script>


<Header bind:selectedGame/>

<CritterContainer bind:selectedGame bind:filters/>

<Filters bind:selectedGame bind:filters/>
