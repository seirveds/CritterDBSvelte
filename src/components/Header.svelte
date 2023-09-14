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

    export let dropdownSelection = "newhorizons";
    export let dropdownText = "New horizons";

    let dropdownOptions = [
        {"value": "newhorizons", "text": "New Horizons"},
        {"value": "newleaf", "text": "New Leaf"},
        {"value": "cityfolk", "text": "City Folk"},
        {"value": "wildworld", "text": "Wild World"},
        {"value": "animalcrossing", "text": "Population Growing"},
    ];

    function selectOption(option) {
        dropdownSelection = option["value"];
        dropdownText = option["text"];
    };
</script>

<Navbar color="dark" dark expand="md">
    <Nav navbar>
        <NavItem>
            <NavLink href="/">CritterDB</NavLink>
        </NavItem>
        <Dropdown nav setActiveFromChild>
        <DropdownToggle nav class="nav-link" caret> {dropdownText} </DropdownToggle>
        <DropdownMenu>
            {#each dropdownOptions as option (option)}
                <DropdownItem on:click={() => selectOption(option)}>
                {option["text"]}
                </DropdownItem>
            {/each}
        </DropdownMenu>
        </Dropdown>
    </Nav>
</Navbar>
