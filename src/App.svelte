<script>
	import Header from "./components/Header.svelte";

	let dropdownSelection;
</script>


<Header bind:dropdownSelection/>

<h1> {dropdownSelection} </h1>
