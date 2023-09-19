<script>
    import {
        TabContent,
        TabPane,
    } from "sveltestrap";

    export let filters = {
        "crittertype": "fish",
    };
    export let selectedGame = "newhorizons";

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
