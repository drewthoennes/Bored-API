<template>
	<div class="intro">
		<div v-if="home">
			<h1>The Bored API</h1>
			<h3>Let's find you something to do</h3>
		</div>
		<div v-else-if="about">
			<h1>The Bored API</h1>
			<h3>Facts and Information</h3>
		</div>
		<div v-else-if="documentation">
			<h1>Bored API Documentation</h1>
		</div>
		<div v-else-if="contributing">
			<h1>Contributing</h1>
		</div>
		<div v-else-if="error">
			<h1>Error</h1>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Intro',
		props: {
			home: Boolean,
			about: Boolean,
			documentation: Boolean,
			contributing: Boolean,
			error: Boolean
		},
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
	.intro {
		height: 100%;
		background: #4a4e56;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.intro * {
		color: white;
	}
	@media only screen and (max-width: 500px) {
		.intro > div h1 {
			font-size: 28px;
		}
		.intro > div h3 {
			font-size: 22px;
		}
	}
</style>
