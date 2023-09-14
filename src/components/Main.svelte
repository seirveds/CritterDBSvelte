<script>
    let date;

    function updateDate() {
        date = new Date()
        date = date.toISOString().split('T');
    }
</script>

<main>
    <h1> {date} </h1>
    <button on:click={updateDate}> Update </button>
</main>

<style>
    main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
	}
</style>