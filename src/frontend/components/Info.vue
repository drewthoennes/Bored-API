<template>
	<div class="info">
		<div class="info-about">
			<i class="fas fa-info-circle"></i>
			<h6>Find out more <router-link :to="{ name: 'About', params: {} }">about</router-link> this project</h6>
		</div>

		<div class="info-documentation">
			<i class="fas fa-book"></i>
			<h6>Check out the <router-link :to="{ name: 'Documentation', params: {} }">documentation</router-link></h6>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Info',
		data () {
			return {
			}
		},
		methods: {
		}
	}
</script>

<style scoped>
	h1, h2 {
		font-weight: normal;
	}
	.info {
		height: 100%;
		background: #f8f8f8;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	.info div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 50%;
	}
	.info div i {
		font-size: 36px;
		padding: 10px;
	}
	.info div a {
		color: #6ba3ff;
	}
</style>
