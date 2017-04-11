<template>
    <div>
        <nav-bar></nav-bar>
        <router-view></router-view>
    </div>
</template>
<script>

var NavBar = require('./nav_bar.vue');

module.exports = {
    components: {
        NavBar
    },
    data: function() {
        return {
            msg: 'Hello world!'
        }
    }
}

</script>
<style>
.nav {
    color: red;
}
</style>
