<template>

    <b-navbar toggleable="md" type="dark" variant="info" id="header-nav">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item href="http://www.shenyu16.com">Awsome!</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown text="Lang" right class="lang">
                    <b-dropdown-item href="#">EN</b-dropdown-item>
                    <b-dropdown-item href="#">ES</b-dropdown-item>
                    <b-dropdown-item href="#">RU</b-dropdown-item>
                    <b-dropdown-item href="#">FA</b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown right class="user">
                    <!-- Using button-content slot -->
                    <template slot="button-content">
                        <em>User</em>
                    </template>
                    <b-dropdown-item href="/login">Sign in</b-dropdown-item>
                    <b-dropdown-item href="/signup">Sign Up</b-dropdown-item>
                    <b-dropdown-item >Signout</b-dropdown-item>
                    <b-dropdown-item href="/profile">Profile</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>
<style scoped>
#header-nav{
    display: flex;
    justify-content: space-between;
    align-items:center;
    position: fixed;
    top:0;
    left:0;
    height:4rem;
    z-index: 1;
    width:100%;
    box-sizing: border-box;
    margin:0;
    background-color:rgb(146, 216, 164) !important;
}
.nav-link{
    font-size:1.5rem;
}
.dropdown-item{
    font-size:1.5rem;
}
.lang{
    font-size:1.5rem;
}
.user{
    font-size:1.5rem;
}
</style>

