<script>
    import critters from "../assets/critters.json";
    export let dropdownSelection = "newhorizons";
    export let filters = "fish";
</script>

<p>{JSON.stringify(filters)}</p>
<p>{JSON.stringify(critters[dropdownSelection][filters.crittertype])}</p>