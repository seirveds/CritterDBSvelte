<script>
    import {
        TabContent,
        TabPane,
        FormGroup,
        Label,
        Input,
    } from "sveltestrap";

    export let filters = {
        "crittertype": "fish",
        "month": 1,  // TODO current month
        "time": 0,  // TODO current time
        "all": true,
    };
    export let selectedGame = "newhorizons";

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
    <button class={filters.all ? "active" : ""} on:click={() => {buttonClick(true)}}>
        <p>All</p>
    </button>
    <button class={!filters.all ? "active" : ""} on:click={() => {buttonClick(false)}}>
        <p>Current</p>
    </button>
</div>

{#if !filters.all}
    <FormGroup>
        <Label for="monthSelect">{monthNames[filters.month]}</Label>
        <Input
        type="range"
        id="monthSelect"
        min={1}
        max={12}
        step={1}
        bind:value={filters.month}
        />
    </FormGroup>

    <FormGroup>
        <Label for="timeSelect">{`${filters.time}:00`}</Label>
        <Input
        type="range"
        id="timeSelect"
        min={0}
        max={23}
        step={1}
        bind:value={filters.time}
        />
    </FormGroup>
{/if}
<style>
    button {
        width: 5em;
        height: 1.5em;
        border: none;
        background-color: rgba(0, 0, 0, 0);

    }

    button>p {
        margin: 0;
        padding: 0;
    }

    .active {
        background-color: red;
        border: 1px solid red;
        border-radius: 500px; /* Large for pill look */
    }

    button:hover {
        transform: scale(1.2);
    }
</style>
