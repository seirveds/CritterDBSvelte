<script>
    import { currentMonth, currentTime} from "../utils"
    import Icons from "./Icons.svelte";
    import toast, { Toaster } from 'svelte-french-toast';

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

    const islandExclusive = "icons/tortimer-island-exclusive.png";
    const islandAvailable = "icons/tortimer-island-available.png"

    function filterButtonClick(bool) {
        // Make sure clicking current resets time and month to now
        // Also remove ignoreTime selection if true
        if (!filters.all && !bool) {
            filters.time = currentTime();
            filters.month = currentMonth();
            filters.ignoreTime = false;
            filters.includeIsland = true;
            filters.hideCaught = false;
        }
        filters.all = bool;
    }

    function navButtonClick(crittertype) {
        filters.crittertype = crittertype;
    }

    function ignoreTimeToggle() {
        filters.ignoreTime = !filters.ignoreTime;
    }

    function includeIslandToggle() {
        filters.includeIsland = !filters.includeIsland;
    }

    function hideCaughtToggle() {
        filters.hideCaught = !filters.hideCaught;
    }

    function markAsCaughtToggle() {
        if (!filters.markAsCaught) {
            toast("Click on critters to (un)set them as caught", {icon: "💭"})
        }
        filters.markAsCaught = !filters.markAsCaught;
        
    }
</script>

<div>
    <div style="display: flex; float: right">
        <button class={ filters.markAsCaught ? "filterbutton active" : "filterbutton" } on:click={() => markAsCaughtToggle()}>
            <h6 class="mb-0">Mark as caught</h6>
        </button>
    </div>
    <div style="display: flex; padding-left: 5em">
        <button class={ filters.crittertype == "fish" ? "navbutton active" : "navbutton"} on:click={() => {navButtonClick("fish")}}>
            <Icons name="fish" class="filter-icon"/>
        </button>
        <button class={ filters.crittertype == "bug" ? "navbutton active" : "navbutton"} on:click={() => {navButtonClick("bug")}}>
            <Icons name="bug" class="filter-icon"/>
        </button>
        {#if ["newhorizons", "newleaf"].includes(selectedGame)}
            <button class={ filters.crittertype == "sea_creature" ? "navbutton active" : "navbutton"} on:click={() => {navButtonClick("sea_creature")}}>
                <Icons name="seacreature" class="filter-icon"/>
            </button>
        {/if}
    </div>
    <hr class="m-0">
</div>

<div class="pt-3">
    <div class="center">
        <button class={filters.all ? "filterbutton active" : "filterbutton"} on:click={() => {filterButtonClick(true)}}>
            <h5 class="button-text">All</h5>
        </button>
        <button class={!filters.all && currentTime() === filters.time && currentMonth() === filters.month && !filters.ignoreTime ? "filterbutton active" : "filterbutton"} on:click={() => {filterButtonClick(false)}}>
            <h5 class="button-text">Current</h5>
        </button>
    </div>

    {#if !filters.all}
        <div class="center">
            <div class="range-container">
                <h3 class="mb-0">{monthNames[filters.month]}</h3>
                <input type="range" id="month" name="month" class="range-slider" min="1" max="12" bind:value={filters.month}/>
            </div>
            <div class="range-container">
                <h3 class="mb-0">{filters.ignoreTime ? "-" : `${filters.time}:00`}</h3>
                <input type="range" id="time" name="time" class="range-slider" min="0" max="23" bind:value={filters.time} disabled={filters.ignoreTime}/>
            </div>
        </div>

        <div class="center">
            <button class={filters.ignoreTime ? "filterbutton active" : "filterbutton"} on:click={ignoreTimeToggle}>
                <h5>Ignore time</h5>
            </button>
        </div>

        <div class="center mt-3">
            <button class={filters.hideCaught ? "filterbutton active" : "filterbutton"} on:click={hideCaughtToggle}>
                <h5>Hide caught</h5>
            </button>
        </div>
    {/if}
    {#if selectedGame === "newleaf"}
        <div class="center mt-3">
            <button class={filters.includeIsland ? "filterbutton active" : "filterbutton"} on:click={includeIslandToggle}>
                <h5>Include Tortimer Island</h5>
            </button>
        </div>
        <div class="center pt-3">
            <img src={islandExclusive} alt="Tortimer Island exclusive" style="width: 1em; height: 1em; margin-right: .5em"><p class="mb-0">Tortimer Island exclusive</p>
        </div>
        <div class="center">
            <img src={islandAvailable} alt="Year-round on Tortimer Island" style="width: 1em; height: 1em; margin-right: .5em"><p class="mb-0">Year-round on Tortimer Island</p>
        </div>
    {/if}
    <Toaster/>
</div>

<style>
    .center {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .filterbutton {
        border: 2px solid black;
        border-radius: 500px;
        background-color: rgba(0, 0, 0, 0);
        width: fit-content !important;
        height: fit-content !important;
        margin: 0 1em 0 1em;
        padding: 4px 10px 4px 10px;
    }

    .filterbutton:hover {
        transform: scale(1.1);
        background-color: rgb(0, 0, 0);
        border-radius: 500px; /* Large for pill look */
        color: white;
    }

    .filterbutton>h5 {
        margin: 0;
        padding: 0 10px 0 10px;
    }

    .filterbutton.active {
        background-color: rgb(0, 0, 0);
        border-radius: 500px; /* Large for pill look */
    }

    .filterbutton.active>h5 {
        color: white;
    }

    .filterbutton.active>h6 {
        color: white;
    }

    .range-container {
        width: 15em;
        margin: 2.5em;
    }

    .range-slider {
        -webkit-appearance: none;
        appearance: none;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 15px;
        border-radius: 5px;
        background: #000000;
        outline: none;
        opacity: 0.4;
        -webkit-transition: .2s;
        transition: opacity .2s;
    }

    .range-slider[disabled] {
        opacity: 0.05;
    }

    .range-slider:hover {
        opacity: 1;
    }

    .range-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 18px;
        height: 25px;
        border-radius: 5px;
        background: #ffffff;
        border: 3px solid #000000;
        cursor: pointer;
    }

    .range-slider::-moz-range-thumb {
        width: 18px;
        height: 25px;
        border-radius: 10px;
        background: #ffffff;
        border: 3px solid #000000;
        cursor: pointer;
    }

    .navbutton {
        padding: .5em 2em .5em 2em;
        border: none;
        border-radius: 10px 10px 0 0;
        background-color: #d8c2a0;
        width: 6em;
        text-align: center;
    }

    .navbutton.active {
        filter: brightness(85%);
        border-bottom: none;
    }

    .navbutton:hover {
        filter: brightness(60%)
    }

</style>
