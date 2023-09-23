<script>
    import {
        TabContent,
        TabPane,
        FormGroup,
        Label,
        Input,
    } from "sveltestrap";

    export let filters;
    export let selectedGame;

    const monthNames = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December",
    };

    $: selectedGameChange(selectedGame);
    function selectedGameChange() {
        // TODO find out way to switch to fish tab on game change
        // This should prevent error when switching to a non
        // sea creature game when on that tab
        // Potential fix: https://github.com/bestguy/sveltestrap/issues/485
        console.log("changed");
    };

    function tabSwitch(tab) {
        filters.crittertype = tab;
    };

    function buttonClick(bool) {
        filters.all = bool;
    }

    function ignoreTimeToggle() {
        filters.ignoreTime = !filters.ignoreTime;
        console.log(filters);
    }


</script>

<TabContent on:tab={(e) => (tabSwitch(e.detail))}>
    <TabPane tabId="fish" active>
        <span slot="tab">
            Fish
        </span>
    </TabPane>
    <TabPane tabId="bug">
        <span slot="tab">
            Bugs
        </span>
    </TabPane>
    {#if ["newhorizons", "newleaf"].includes(selectedGame)}
        <TabPane tabId="sea_creature">
            <span slot="tab">
                Sea
            </span>
        </TabPane>
    {/if}
</TabContent>

<div>
    <button class={filters.all ? "filter-all-button active" : "filter-all-button"} on:click={() => {buttonClick(true)}}>
        <p>All</p>
    </button>
    <button class={!filters.all ? "filter-all-button active" : "filter-all-button"} on:click={() => {buttonClick(false)}}>
        <p>Current</p>
    </button>
</div>

{#if !filters.all}
    <FormGroup>
        <Label for="monthSelect">{monthNames[filters.month]}</Label>
        <Input
        type="range"
        id="monthSelect"
        class="range"
        min={1}
        max={12}
        step={1}
        bind:value={filters.month}
        />
    </FormGroup>

    <FormGroup>
        <Label for="timeSelect">{filters.ignoreTime ? "-" : `${filters.time}:00`}</Label>
        <Input
        type="range"
        id="timeSelect"
        class="range"
        min={0}
        max={23}
        step={1}
        bind:value={filters.time}
        disabled={filters.ignoreTime}
        />
    </FormGroup>
{/if}

<button class={filters.ignoreTime ? "active" : ""} on:click={ignoreTimeToggle}>
    <p>Ignore time</p>
</button>
<style>
    button {
        border: none;
        background-color: rgba(0, 0, 0, 0);
    }

    button>p {
        margin: 0;
        padding: 0;
    }

    .filter-all-button {
        width: 5em;
        height: 1.5em;
    }

    .active {
        background-color: red;
        border-radius: 500px; /* Large for pill look */
    }

    .filter-all-button:hover {
        background-color: red;
        border-radius: 500px; /* Large for pill look */
    }

    button:hover {
        transform: scale(1.2);
    }

    /* sveltestrap workaround https://github.com/bestguy/sveltestrap/issues/338#issuecomment-881457461 */
    :global(input.range) {
        border: none;
    }
</style>
