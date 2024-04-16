<script>
    import {
        Modal,
        ModalBody,
    } from "sveltestrap";

    import Icons from "./Icons.svelte";

    import ClockFill from "svelte-bootstrap-icons/lib/ClockFill.svelte";
    import CalendarFill from "svelte-bootstrap-icons/lib/CalendarFill.svelte";

    import {
        addToStore,
        removeFromStore,
        logStore,
        critterInStore,
    } from "../store";
    import critters from "../assets/critters2.json";

    export let selectedGame;
    export let filters;

    const bellIcon = "icons/bellbag.png";
    const islandExclusive = "icons/tortimer-island-exclusive.png";
    const islandAvailable = "icons/tortimer-island-available.png"

    const rowCounts = {
        "newhorizons": 5,
        "newleaf": 3,
        "cityfolk": 4,
        "wildworld": 4,
        "animalcrossing": 5,
    }

    const noSeacreatureGames = [
        "cityfolk",
        "wildworld",
        "animalcrossing",
    ]

    // Default new horizons values
    let rows = 5;
    let columns = 16;

    let filteredCritters = critters;
    
    let modalOpen = false;

    let modalTortimerIsland;
    let modalName;
    let modalImage;
    let modalLocation;
    let modalPrice;
    let modalCatchQuote;
    let modalTime;
    let modalMonths;
    let modalSize;

    // Used to refresh grid when critter is marked as caught
    let registerClick = true;

    $: filterChange(selectedGame, filters);
    function filterChange() {
        if ( noSeacreatureGames.includes(selectedGame) && filters.crittertype == "sea_creature") {
            filters.crittertype = "fish";
        }
        let result = critters[selectedGame][filters.crittertype];
        if (filters.all) {
            // Active flag always true
            result = result.map(obj => ({...obj, active: true}));
        } else {
            // Active flag based on filters
            result = result.map(obj => (
                {...obj, active: filters.ignoreTime ? checkDate(obj) : checkDate(obj) & checkTime(obj)}
            ));
        }
        // Sort by in game order
        result = result.sort(function(a, b) {return a.num - b.num;});
        filteredCritters = result;

        rows = rowCounts[selectedGame];
        columns = Math.ceil(filteredCritters.length / rowCounts[selectedGame]);

        console.log(filteredCritters);
    };

    function checkTime(obj) {
        // New leaf tortimer island workaround, get the first possible availability
        // when there is nothing for current month
        if (selectedGame === "newleaf" && filters.includeIsland) {
            let fallback = obj.time_available[Object.keys(obj.time_available)[0]]
            return obj_get(obj.time_available, filters.month, fallback).includes(filters.time);
        } else {
            return obj_get(obj.time_available, filters.month, []).includes(filters.time);
        }
    };

    function checkDate(obj) {
        // New leaf tortimer island workaround, ignore time of year for critters
        // that also spawn on tortimer island
        if (selectedGame === "newleaf") {
            return filters.includeIsland ? obj.months_available.includes(filters.month) || obj.tortimer_island : obj.months_available.includes(filters.month) && !obj.tortimer_island_exclusive
        } else {  // Clean logic
            return obj.months_available.includes(filters.month);
        }
    };

    function toggleModal(critter) {
        if (!modalOpen) {
            console.log(critter);

            modalTortimerIsland = critter.tortimer_island
            modalName = critter.name;
            modalImage = prepareImage(critter.b64_img);
            modalCatchQuote = critter.catching_quote;
            if (filters.crittertype === "sea_creature") {
                modalLocation = "Sea";
            } else {
                modalLocation = critter.location;
            }
            modalPrice = critter.selling_price.toLocaleString('en-US');
            modalTime = formatTimeAvailable(critter.time_available);
            modalMonths = formatMonthsAvailable(critter.months_available);
            modalSize = critter.shadow_size;
        }
        modalOpen = !modalOpen;
    };

    function prepareImage(base64String) {
        return `data:image/png;base64,${base64String}`
    };

    function formatTimeAvailable(time_available) {
        // Assumes critters have same times every month (they usually do)
        time_available = time_available[Object.keys(time_available)[0]]

        // Easy case
        if (time_available.length === 24) {
            return 'All day';
        }

        // Store ranges as arrays [startHour, endHour]
        let ranges = [];
        // Always start with first hour in array
        let startHour = time_available[0];
        for (let i = 0; i < time_available.length; i += 1) {
            // Check if the next hour in array is more than 1 hour apart from
            // current value, if this is the case we are at the end of a time range
            if (time_available[i] + 1 !== time_available[i + 1]) {
            // Define end hour of range
            const endHour = time_available[i];
            // Check if end hour 23 actually wraps around to the next day by checking
            // if the start hour of the first range is 0
            if (endHour === 23 && ranges.length > 0 && ranges[0][0] === 0) {
                // If this is the case, update the first range starting with 0 with the
                // starting hour of the range that ended at 23
                ranges[0] = [startHour, ranges[0][1]];
            } else {
                // If above is not the case simply add range
                ranges.push([startHour, endHour]);
            }
            // Set new start hour and continue parsing time availability
            startHour = time_available[i + 1];
            }
        }
        // Because of handling time ranges that wrap around the day the ranges
        // are not chronologically sorted, so we sort them here
        ranges = ranges.sort(function(a, b) {return a[0] - b[0];});

        let outString = '';
        for (let i = 0; i < ranges.length; i += 1) {
            outString += `${ranges[i][0]}:00 - ${ranges[i][1]}:00; `;
        }
        // Slice to remove trailing semicolon and space
        return outString.slice(0, -2);
    };

    function formatMonthsAvailable(months_available) {
        // Create an array to hold month names, index 0 is empty because my
        // arrays start at 1 for january
        const monthNames = [
            '', 'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        // Easy cases
        if (months_available.length === 12) {
            return 'All year';
        }

        if (months_available.length === 1) {
            return monthNames[months_available[0]]
        }

        // Sort the adjusted array in ascending order
        months_available.sort((a, b) => a - b);

        console.log(months_available)

        let monthRanges = [];
        let rangeStartMonth = months_available[0];

        for (let i = 1; i < months_available.length; i++) {
            if (months_available[i] + 1 !== months_available[i + 1]) {
                monthRanges.push([rangeStartMonth, months_available[i]]);
                rangeStartMonth = months_available[i + 1]
            } 
        }


        // Handle range that wraps around from december to january
        // Check if first month in first range is january and last month in
        // last range is december. If this is the case replace december with the
        // end month of the first range, and remove first range from array
        // e.g. [[1, 2], [11, 12]] -> [[11, 2]]
        if (monthRanges[0][0] === 1 && monthRanges[monthRanges.length - 1][1] === 12) {
            monthRanges[monthRanges.length - 1][1] = monthRanges[0][1]
            monthRanges.splice(0, 1)
        }

        // Transform month indices to month name strings
        let monthRangeStrings = []
        for (let i = 0; i < monthRanges.length; i++) {
            monthRangeStrings.push(`${monthNames[monthRanges[i][0]]} - ${monthNames[monthRanges[i][1]]}`)
        }        

        return monthRangeStrings.join('; ');
    };

    function obj_get(obj, key, default_) {
        return key in obj ? obj[key] : default_
    };

    function gridIconClick(critter) {
        if (filters.markAsCaught) {
            if (critterInStore(critter.name, selectedGame)) {
                removeFromStore(critter.name, selectedGame);
            } else {
                addToStore(critter.name, selectedGame);
            }
            logStore();
            // Flip boolean to trigger {key} around grid, making it refresh
            registerClick = !registerClick;
        } else {
            toggleModal(critter);
        }
    };

    function showCritterInGrid(active, critterName) {
        if (filters.markAsCaught) {
            return true;
        }
        if (filters.hideCaught) {
            return active && !critterInStore(critterName, selectedGame);
        }
        return active;
    }
</script>

<div class="grid-container">
    <div class="scrollable-grid">
        {#key registerClick}
            <div class="grid" style="grid-template-columns: repeat({columns}, 1fr); grid-template-rows: repeat({rows}, 1fr);">
                {#each filteredCritters as critter}
                    <div class={critterInStore(critter.name, selectedGame) && !filters.hideCaught ? "tile caught" : "tile"}>
                        <div style={showCritterInGrid(critter.active, critter.name) ? "" : "opacity: 0.1;"}>
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <img
                                src={prepareImage(critter.b64_img)}
                                alt={critter.name}
                                class="critter-image"
                                on:click={gridIconClick(critter)}
                            />
                            {#if selectedGame === "newleaf" && critter.tortimer_island}
                                <img src={islandAvailable} alt="Tortimer island " class="grid-tortimer-island-icon"/>
                            {/if}
                            {#if selectedGame === "newleaf" && critter.tortimer_island_exclusive}
                                <img src={islandExclusive} alt="Tortimer island exclusive" class="grid-tortimer-island-icon"/>
                            {/if}
                        </div>
                        {#if critterInStore(critter.name, selectedGame)}
                            <Icons name="caught" class="grid-caught-icon" viewbox=128/>
                        {/if}
                    </div>
                {/each}
            </div>
        {/key}
    </div>
</div>
<Modal isOpen={modalOpen} toggle={toggleModal}>
    <ModalBody style="padding: 0">
        <div class="modal-body">
            {#if selectedGame === "newleaf" && modalTortimerIsland}
                <img src={islandAvailable} alt="Tortimer Island all-year round" class="tortimer-island-icon"/>
            {/if}
            <img src={modalImage} class="modal-image" alt={modalName}/>
            <h2 class="mt-1">{modalName}</h2>
            <p><em>{modalCatchQuote}</em></p>
            <table>
                <tr>
                    <th>Price</th>
                    <th>Location</th>
                    {#if filters.crittertype !== "bug"}
                        <th>Size</th>
                    {/if}
                </tr>
                <tr>
                    <td><img src={bellIcon} alt="bells" class="icon"/>{modalPrice}</td>
                    <td>{modalLocation}</td>
                    {#if filters.crittertype !== "bug"}
                        <td>{modalSize}</td>
                    {/if}
                </tr>
            </table>            
            <p class="nomargin center"><CalendarFill style="margin-right: .5em"/>{modalMonths}</p>
            <p class="nomargin center"><ClockFill style="margin-right: .5em"/>{modalTime}</p>
        </div>
    </ModalBody>
</Modal>

<style>
    .grid-container {
        display: flex;
        justify-content: center;
        padding-top: 2em;
        padding-bottom: 2em;

    }

    .scrollable-grid {
        overflow-x: auto;
        white-space: nowrap;
        max-width: 80vw;
    }

    .grid {
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        border-left: 1px solid black;
        border-top: 1px solid black;
        padding: 0px;
        column-gap: 0px;
        width: fit-content;
        
    }

    .tile {
        position: relative;
        width: 80px;
        height: 80px;
        border-right: 1px solid black;
        border-bottom: 1px solid black;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform .1s; /* Animation for hover*/
    }

    @media (max-width: 1280px) {
        .tile {width: 75px; height: 75px;}
        .scrollable-grid {max-width: 100vw;}
    }
    @media (max-width: 1200px) {
        .tile {width: 70px; height: 70px;}
        .scrollable-grid {max-width: 100vw;}
    }    

    .tile:hover {
        cursor: pointer;
    }

    .tile:hover .critter-image {
        transform: scale(1.1);
    }

    .critter-image {
        width: 64px;
        height: 64px;
        image-rendering: pixelated;
    }

    .grid-tortimer-island-icon {
        position: absolute;
        top: 5px !important;
        right: 5px !important;
    }

    /* Some modal styling done in globals.css */
    .modal-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        overflow-wrap: break-word;
        padding: 16px !important;
        background-color: #fff5e6;
        border-radius: 10px;
    }

    .modal-body table {
        margin-bottom: 1rem;
        font-size: 1.1rem !important;
    }

    .modal-body td {
        padding: 0 20px 0 20px;
    }

    .modal-image {
        width: 106px;
        height: 106px;
        padding: 10px;
        image-rendering: pixelated;
        border: 5px dashed #e7d5b9;
        border-radius: 50%;
    }

    .icon {
        width: 24px;
        height: 24px;
    }

    .nomargin {
        margin: 0;
    }

    .tortimer-island-icon {
        position: absolute;
        top: 0;
        left: 0;
        width: 1.5em;
        height: 1.5em;
        image-rendering: pixelated;
    }
</style>
