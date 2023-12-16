<script>
    import { currentMonth, currentTime} from "../utils"

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

    function filterButtonClick(bool) {
        // Make sure clicking current resets time and month to now
        // Also remove ignoreTime selection if true
        if (!filters.all && !bool) {
            filters.time = currentTime();
            filters.month = currentMonth();
            filters.ignoreTime = false;
        }
        filters.all = bool;
    }

    function navButtonClick(crittertype) {
        filters.crittertype = crittertype;
    }

    function ignoreTimeToggle() {
        filters.ignoreTime = !filters.ignoreTime;
    }


</script>

<div>
    <div style="display: flex">
        <button class={ filters.crittertype == "fish" ? "navbutton active" : "navbutton"} on:click={() => {navButtonClick("fish")}}> Fish </button>
        <button class={ filters.crittertype == "bug" ? "navbutton active" : "navbutton"} on:click={() => {navButtonClick("bug")}}> Bugs </button>
        {#if ["newhorizons", "newleaf"].includes(selectedGame)}
            <button class={ filters.crittertype == "sea_creature" ? "navbutton active" : "navbutton"} on:click={() => {navButtonClick("sea_creature")}}> Sea </button>
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
    {/if}
</div>

<style>
    .center {
        display: flex;
        justify-content: center;
        text-align: center;
    }

    .filterbutton {
        border: none;
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
        background-color: #ffffff;
        width: 6em;
        text-align: center;
    }

    .navbutton.active {
        border: 1px solid DarkGray;
        border-bottom: none;
    }

    .navbutton:hover {
        background-color: lightgray;
    }

</style>
