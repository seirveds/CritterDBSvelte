<script>
    import {
        Modal,
        ModalBody,
    } from "sveltestrap";
    import critters from "../assets/critters2.json";

    export let selectedGame;
    export let filters;

    const bellIcon = "icons/bellbag.png";

    const rowCounts = {
        "newhorizons": 5,
        "newleaf": 3,
        "cityfolk": 1,
        "wildworld": 1,
        "animalcrossing": 5,
    }

    // Used in automatically scaling grid container
    $: rows = rowCounts[selectedGame];
    $: columns = Math.ceil(filteredCritters.length / rowCounts[selectedGame]);

    let filteredCritters = critters;

    $: filterChange(selectedGame, filters);
    function filterChange() {
        let result = critters[selectedGame][filters.crittertype];
        if (filters.all) {
            // Active flag always true
            result = result.map(obj => ({...obj, active: true}));
        } else {
            // Active flag based on filters
            result = result.map(obj => (
                {...obj, active: obj.months_available.includes(filters.month) & get(obj.time_available, filters.month, []).includes(filters.time)}
            ));
        }
        // Sort by in game order
        result = result.sort(function(a, b) {return a.num - b.num;});
        filteredCritters = result;
    }
    
    let modalOpen = false;
    let modalName;
    let modalImage;
    let modalLocation;
    let modalPrice;
    let modalCatchQuote;
    let modalTime;
    let modalMonths;
    let modalSize;

    function toggleModal(critter) {
        if (!modalOpen) {
            console.log(critter);

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
    }

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
    }

    function formatMonthsAvailable(months_available) {
        // Easy case
        if (months_available.length === 12) {
            return 'All year';
        }

        // Create an array to hold month names, index 0 is empty because my
        // arrays start at 1 for january
        const monthNames = [
            '', 'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        // Sort the adjusted array in ascending order
        months_available.sort((a, b) => a - b);

        let monthRanges = [];
        let startMonth = monthNames[months_available[0]];
        let endMonth = startMonth;

        for (let i = 1; i < months_available.length; i++) {
            const currentMonth = monthNames[months_available[i]];
            if (months_available[i] === months_available[i - 1] + 1) {
                endMonth = currentMonth;
            } else {
                monthRanges.push([startMonth, endMonth]);
                startMonth = currentMonth;
                endMonth = startMonth;
            }
        }

        monthRanges.push([startMonth, endMonth]);

        // Handle range that wraps around from december to january
        // TODO not working (TEST BLUE MARLIN, BLOWFISH)
        // if (monthRanges[0][0] === "January" && monthRanges[1][1] === "December") {
        //     monthRanges = [[monthRanges[1][0], monthRanges[0][1]]]
        // }

        let monthRangeStrings = []
        for (let i = 0; i < monthRanges.length; i++) {
            monthRangeStrings.push(`${monthRanges[i][0]} - ${monthRanges[i][1]}`)
        }        

        return monthRangeStrings.join('; ');
    }

    function get(obj, key, default_) {
        if (key in obj) {
            return obj[key]
        }
        return default_
    }
</script>

<p>{JSON.stringify(filters)}</p>

<div class="gridcontainer" style="grid-template-columns: repeat({columns}, 1fr); grid-template-rows: repeat({rows}, 1fr);">
    {#each filteredCritters as critter}
        <div class="tile">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <img
                src={prepareImage(critter.b64_img)}
                alt={critter.name} class="critterImage"
                on:click={toggleModal(critter)}
                style={critter.active ? "" : "opacity: 0.1;"}
            />
        </div>
    {/each}
</div>

<Modal isOpen={modalOpen} toggle={toggleModal}>
    <ModalBody>
        <div class="col">
            <img src={modalImage} class="modalImage" alt={modalName}/>
            <h2>{modalName}</h2>
            <p><em>{modalCatchQuote}</em></p>
            <div>
                <div>
                    <img src={bellIcon} alt="bells" class="icon"/>
                    {modalPrice} Bells
                </div>
                <div>
                    Location:
                    {modalLocation}
                </div>
                {#if filters.crittertype !== "bug"}
                    <div>
                        Size:
                        {modalSize}
                    </div>
                {/if}
            </div>
            <p>{modalMonths}</p>
            <p>{modalTime}</p>
        </div>
    </ModalBody>
</Modal>

<style>
    .col {
        display: flex;
        flex-direction: column;
        align-items: center;
        white-space: nowrap;
    }

    .gridcontainer {
        display: grid;
        grid-auto-flow: column;
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
        justify-content: center;
    }

    .critterImage {
        width: 64px;
        height: 64px;
        image-rendering: pixelated;
        transition: transform .1s; /* Animation */
    }

    .critterImage:hover {
        transform: scale(1.2);
        cursor: pointer;
    }

    .modalImage {
        width: 96px;
        height: 96px;
        image-rendering: pixelated;
    }

    .icon {
        width: 24px;
        height: 24px;
    }
</style>
