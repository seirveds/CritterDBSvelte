<script>
    import SunFill from "svelte-bootstrap-icons/lib/SunFill.svelte";
    import MoonStarsFill from "svelte-bootstrap-icons/lib/MoonStarsFill.svelte";

    export let selectedGame;
    export let darkMode;

    let dropdownText = "New horizons";
    let dropdownExpanded = false;

    let dropdownOptions = [
        {"value": "newhorizons", "text": "New Horizons"},
        {"value": "newleaf", "text": "New Leaf"},
        {"value": "cityfolk", "text": "City Folk"},
        {"value": "wildworld", "text": "Wild World"},
        {"value": "animalcrossing", "text": "Population Growing"},
    ];

    function selectOption(option) {
        selectedGame = option["value"];
        dropdownText = option["text"];
        dropdownExpanded = false;
    };

    function toggleDarkMode() {
        darkMode = !darkMode
    };

    function darkModeTextColor() {
        return `color: var(--text${darkMode ? '' : '-light'})`
    };

    function toggleDropdown() {
        dropdownExpanded = !dropdownExpanded;
    };

    /* Click listener to make opened dropdown close on click outside dropdown */
    function clickOutsideDropdown(event) {
        const dropdown = document.querySelector('.dropdown');
        if (dropdownExpanded && !dropdown.contains(event.target)) {
            toggleDropdown()
        };
    };
    window.addEventListener('click', clickOutsideDropdown);
</script>

<div class="header">
    {#key darkMode}
        <div class="logo">
            <h3 class="name" style={darkModeTextColor()}>CritterDB</h3>
        </div>
        <div class="dropdown">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <p class="mb-0" style={darkModeTextColor()} on:click={() => toggleDropdown()}>{dropdownText}{dropdownExpanded ? '▴' : '▾'}</p>
            <div class="dropdown-content" style="display: {dropdownExpanded ? 'block' : 'none'}">
                <ul>
                    {#each dropdownOptions as option}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <li on:click={() => selectOption(option)}>{option["text"]}</li>
                    {/each}
                </ul>
            </div>
        </div>
    {/key}
    <div style="margin-left: auto"/>
    <button on:click={() => {toggleDarkMode()}}>
        {#if darkMode}
            <SunFill width="1.5rem" height="1.5rem"/>
        {:else}
            <MoonStarsFill width="1.1rem" height="1.1rem"/>
        {/if}
    </button>
</div>

<style>
    .header {
        display: flex;
        align-items: center;
        height: 4rem;
        width: 100vw;
        padding: 10px 20px;
        margin: 0 2rem 0 0;
        background-color: var(--header);
    }

    .header > button {
        width: 2.5rem;
        min-width: 2.5rem;
        height: 2.5rem;
        border: 0px;
        border-radius: 100%;
        background-color: var(--text-light);
        color: var(--text);
    }

    .header > button:hover {
        transform: scale(1.1);
    }

    .name {
        margin: 0 1em 0 0;
        /* Color done inline */
    }

    .dropdown-content {
        position: absolute;
        inset: 0px auto auto 0px;
        margin: 0px;
        transform: translate3d(0px, 26px, 0px);

        background-color: var(--bg);
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        border: 0px;
        border-radius: 5px;
        white-space: nowrap;

        padding: .5rem 1rem;

        z-index: 999;
    }

    .dropdown-content > ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .dropdown-content > ul > li {
        margin-bottom: .4rem;
    }

    .dropdown > p:hover,
    .dropdown-content > ul > li:hover {
        cursor: pointer;
        text-decoration: underline;
    }
</style>