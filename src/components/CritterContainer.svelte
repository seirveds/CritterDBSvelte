<script>
    import {
        Modal,
        ModalBody,
    } from "sveltestrap";

    import critters from "../assets/critters.json";
    export let selectedGame = "newhorizons";
    export let filters = {
        "crittertype": "fish",
    };

    function prepareImage(base64String) {
        return `data:image/png;base64,${base64String}`
    }

    let modalOpen = false;
    let modalName;

    function toggleModal(critter) {
        modalName = critter.name;
        modalOpen = !modalOpen;
    };
</script>

<p>{JSON.stringify(filters)}</p>

<div class="container">
    {#each critters[selectedGame][filters.crittertype] as critter}
        <div class="tile">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <img
                src={prepareImage(critter.b64_img)}
                alt={critter.name} class="critterImg"
                on:click={toggleModal(critter)}
            />
        </div>
    {/each}
</div>

<Modal isOpen={modalOpen} toggle={toggleModal}>
    <ModalBody>
        {modalName}
    </ModalBody>
</Modal>

<style>
    .container {
        display: grid;
        grid-template-columns: repeat(16, 1fr);
        grid-template-rows: repeat(5, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        border-left: 1px solid black;
        border-top: 1px solid black;
        padding: 0px;
    }

    .tile {
        width: 80px;
        height: 80px;
        border-right: 1px solid black;
        border-bottom: 1px solid black;
        display: flex;
        align-items: center;
        justify-content: center
    }

    .critterImg {
        width: 64px;
        height: 64px;
        image-rendering: pixelated;
        transition: transform .1s; /* Animation */
    }

    .critterImg:hover {
        transform: scale(1.2);
    }
</style>