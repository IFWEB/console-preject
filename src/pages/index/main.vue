<template>

	<div class="main-section">
		{{msg}}
	</div>

</template>

<script>

module.exports = {

	data: function() {
		return {
		  msg: 'index页面的主要内容....'
		}
	}
}
</script>

<style>

.main-section {
  color: green;
}
</style>