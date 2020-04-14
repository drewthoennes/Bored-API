<template>
	<div class="topbar" v-bind:class="{ absolute: absolute, noborder: !border, expanded: !accordianOpen }">
		<div class="topbar-row">
			<div class="title">
				<router-link :to="{name: 'Home'}">Bored API</router-link>
			</div>
			<div class="information" v-if="!hide">
				<div>
					<router-link v-if="boldAbout" :to="{name: 'About'}"><b>About</b></router-link>
					<router-link v-else :to="{name: 'About'}">About</router-link>
				</div>
				<div>
					<router-link v-if="boldDocumentation" :to="{name: 'Documentation'}"><b>Documentation</b></router-link>
					<router-link v-else :to="{name: 'Documentation'}">Documentation</router-link>
				</div>
				<div>
					<router-link v-if="boldContributing" :to="{name: 'Contributing'}"><b>Contributing</b></router-link>
					<router-link v-else :to="{name: 'Contributing'}">Contributing</router-link>
				</div>
			</div>
			<div class="accordian" v-if="!hide">
				<i v-if="!accordianOpen" class="fas fa-bars" @click="accordianOpen = true"></i>
				<i v-else class="fas fa-times" @click="accordianOpen = false"></i>
			</div>
		</div>
		<div v-if="accordianOpen" class="accordian-links">
			<div class="accordian-link">
				<router-link v-if="boldAbout" :to="{name: 'About'}"><b>About</b></router-link>
				<router-link v-else :to="{name: 'About'}">About</router-link>
			</div>
			<div class="accordian-link">
				<router-link v-if="boldDocumentation" :to="{name: 'Documentation'}"><b>Documentation</b></router-link>
				<router-link v-else :to="{name: 'Documentation'}">Documentation</router-link>
			</div>
			<div class="accordian-link">
				<router-link v-if="boldContributing" :to="{name: 'Contributing'}"><b>Contributing</b></router-link>
				<router-link v-else :to="{name: 'Contributing'}">Contributing</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Topbar',
		props: {
			border: Boolean,
			hide: Boolean,
			absolute: Boolean,
			boldAbout: Boolean,
			boldDocumentation: Boolean,
			boldContributing: Boolean,
		},
		data () {
			return {
				accordianOpen: false
			}
		},
		methods: {
		},
		mounted() {
		}
	}
</script>

<style scoped>
	h1, h2 {
		font-weight: normal;
	}
	a {
		font-style: none;
		font-size: 16px;
		color: #000000;
		margin: 0;
	}
	a:hover:not(.current) {
		text-decoration: none;
	}
	.topbar {
		background: #6ba3ff;
		position: relative;
		width: 100%;
		height: 100%;
		box-shadow: 0px 2px 2px #3f4349;
		z-index: 1;
	}
	.topbar-row {
		/* position: absolute; */
		width: 100%;
		padding: 2% 5% 2% 5%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 100%;
	}
	.noborder {
		box-shadow: 2px 1px rgba(0, 0, 0, 0.1);
	}
	.absolute {
		position: absolute;
	}
	.title {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.title a {
		color: #ffffff;
	}
	.topbar-row div:not(.information) {
		padding-top: 10px;
		padding-bottom: 10px;
	}
	.information {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.information div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 30px;
	}
	.information div a {
		color: #ffffff;
		padding-top: 10px;
		padding-bottom: 10px;
	}
	.information div a:hover {
		color: #ffffff;
		cursor: pointer;
	}
	.accordian-links {
		display: none;
		height: 50%;
		width: 100%;
		position: absolute;
		bottom: 20px;
		left: 0;
	}
	.accordian {
		display: none;
		flex-direction: column;
		justify-content: center;
	}
	.accordian > i {
		color: #ffffff;
		font-size: 20px;
	}
	.accordian > i:hover {
		cursor: pointer;
	}
	.accordian-link a {
		color: white;
	}
	.current {
		text-decoration: underline;
	}
	@media only screen and (max-width: 500px) {
		.information {
			display: none;
		}
		.accordian-links {
			display: inline-block;
		}
		.accordian {
			display: flex;
		}
		.topbar {
			height: 200%
		}
		.topbar-row {
			height: 50%;
		}
	}
	.expanded {
		height: 100%;
	}
	.expanded .topbar-row {
		height: 100%;
	}
</style>
