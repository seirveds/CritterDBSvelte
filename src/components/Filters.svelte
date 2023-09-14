<script>
    import {
        TabContent,
        TabPane,
    } from "sveltestrap";

    export let filters = {
        "crittertype": "fish",
    };


</script>
<TabContent on:tab={(e) => (filters.crittertype = e.detail)}>
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
    <TabPane tabId="sea_creature">
        <span slot="tab">
            Sea
        </span>
    </TabPane>
</TabContent>
