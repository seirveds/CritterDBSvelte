<script>
    import {
        DropdownItem,
        DropdownMenu,
        DropdownToggle,
        Nav,
        NavItem,
        NavLink,
        Navbar,
        Dropdown
    } from 'sveltestrap';

    export let selectedGame;
    let dropdownText = "New horizons";

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
    };
</script>

<Navbar expand="md">
    <Nav navbar>
        <NavItem>
            <NavLink href="/"><h3 class="name">CritterDB</h3></NavLink>
        </NavItem>
        <Dropdown nav setActiveFromChild>
        <DropdownToggle nav class="nav-link" style="padding: 0; transform: translateY(50%); color: var(--text-light)" caret> {dropdownText} </DropdownToggle>
        <DropdownMenu>
            {#each dropdownOptions as option}
                <DropdownItem on:click={() => selectOption(option)}>
                {option["text"]}
                </DropdownItem>
            {/each}
        </DropdownMenu>
        </Dropdown>
    </Nav>
</Navbar>

<style>
    .name {
        margin: 0 1em 0 0;
        color: var(--text-light);
    }
</style>