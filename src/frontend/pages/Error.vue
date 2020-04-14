<template>
	<div class="error container-fluid">
		<div class="topbar-div">
			<Topbar v-bind:border="border"/>
		</div>

		<div class="content">
			<h4>Hm looks like your lost... Maybe try heading <router-link :to="{ name: 'Home' }">home</router-link>?</h4>
		</div>

		<div class="bottombar-div">
			<Bottombar/>
		</div>
	</div>
</template>

<script>
	import Topbar from '@/components/Topbar'
	import Intro from '@/components/Intro'
	import Bottombar from '@/components/Bottombar'

	export default {
		name: 'Error',
		components: {
			Topbar,
			Intro,
			Bottombar
		},
		data () {
			return {
				border: false
			}
		}
	}
</script>

<style scoped>
	.error {
		height: 100%;
		padding: 0;
		margin: 0;
		background: #f8f8f8;
	}
	.topbar-div {
		height: 10%;
	}
	.intro-div {
		height: 25%;
	}
	.content {
		margin: 0;
		height: 65%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.content > h4 {
		margin: 0;
	}
	.bottombar-div {
		height: 25%;
	}
</style>
