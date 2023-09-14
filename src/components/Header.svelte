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

    export let dropdownSelection = "ACNH";

    let dropdownOptions = [
        "ACNH",
        "ACNL", 
        "ACWW",
    ];

    function selectOption(option) {
        dropdownSelection = option;
    };
</script>

<Navbar color="dark" dark expand="md">
    <Nav navbar>
        <NavItem>
            <NavLink href="/">CritterDB</NavLink>
        </NavItem>
        <Dropdown nav setActiveFromChild>
        <DropdownToggle nav class="nav-link" caret> {dropdownSelection} </DropdownToggle>
        <DropdownMenu>
            {#each dropdownOptions as option (option)}
                <DropdownItem on:click={() => selectOption(option)}>
                {option}
                </DropdownItem>
            {/each}
        </DropdownMenu>
        </Dropdown>
    </Nav>
</Navbar>
