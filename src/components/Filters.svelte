<script>
    import {
        TabContent,
        TabPane,
        FormGroup,
        Label,
        Input
    } from "sveltestrap";

    export let filters = {
        "crittertype": "fish",
        "month": 1,  // TODO current month
        "time": 0,  // TODO current time
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
