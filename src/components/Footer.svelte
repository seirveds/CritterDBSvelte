<script>
	import Github from "svelte-bootstrap-icons/lib/Github.svelte";

	let year = new Date().getFullYear();

	console.log(year);
</script>

<div class="footer center">
	<p class="mb-0">CritterDB ©{ year }</p>
	<p><a href="https://github.com/seirveds/"><Github/>/seirveds</a></p>
</div>

<style>
	.footer{
		display: flex;
		flex-direction: column;
		font-size: .8rem;
		padding-bottom: 0rem;
	}
</style>