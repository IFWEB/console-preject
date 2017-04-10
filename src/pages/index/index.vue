<template>

	<div>
		<NavBar></NavBar>
		<SideBar></SideBar>
		<router-view></router-view>
	</div>

</template>

<script>

var NavBar = require('../../components/navBar.vue');
var SideBar = require('../../components/sideBar.vue');

module.exports = {
	components: {
		NavBar,
		SideBar
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