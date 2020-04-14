<template>
	<div class="about container-fluid">
		<div class="topbar-div">
			<Topbar boldAbout/>
		</div>

		<div class="intro-div">
			<Intro about/>
		</div>

		<div class="content">
			<div class="hill-box">
				<div class="hill-box-header">
					<p>What's the purpose behind this API?</p>
				</div>
				<div class="hill-box-body expanded">
					<p>The Bored API helps you find things to do when you're bored! There are fields like the number of participants, activity type, and more that help you narrow down your results.</p>
				</div>
			</div>

			<div class="hill-box">
				<div class="hill-box-header">
					<p>What did you build the API with?</p>
				</div>
				<div class="hill-box-body expanded">
					<p>This whole application is a MEVN web application hosted on Heroku. The tech stack is listed below:</p>
					<p>Frontend</p>
					<ul>
						<li>Vue.js</li>
						<li>Webpack</li>
					</ul>
					<p>Backend</p>
					<ul>
						<li>Node.js</li>
						<li>MongoDB and Mongoose</li>
					</ul>
				</div>
			</div>

			<div class="hill-box">
				<div class="hill-box-header">
					<p>How do I use the this?</p>
				</div>
				<div class="hill-box-body expanded">
					<p>Please check out the <router-link :to="{ name: 'Documentation'}">documentation</router-link> for examples. If you still can't figure it out, feel free to <a href="https://github.com/drewthoennes/Bored-API/issues">submit a help ticket</a>.</p>
				</div>
			</div>

			<div class="hill-box">
				<div class="hill-box-header">
					<p>This is awesome! How can I contribute?</p>
				</div>
				<div class="hill-box-body expanded">
					<p>Any new suggestions or features would be very helpful! If you have an idea for an activity, we have a suggestion form on the <router-link :to="{ name: 'Contributing' }">contributing</router-link> page. Otherwise, feel free to submit a <a href="https://github.com/drewthoennes/Bored-API/pulls"> pull request</a> or a <a href="https://github.com/drewthoennes/Bored-API/issues">feature request</a>.</p>
				</div>
			</div>
		</div>
		<!--
			https://pokeapi.co/docsv2/
			https://api.pandascore.co/doc
		-->
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
		name: 'About',
		components: {
			Topbar,
			Intro,
			Bottombar
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
	.about {
		height: 100%;
		padding: 0;
		margin: 0;
		background: #f8f8f8;
	}
	.topbar-div {
		height: 10%;
		min-height: 75px;
	}
	.intro-div {
		height: 25%;
		min-height: 187.5px;
	}
	.content {
		min-height: 33.5%;
		background: #f8f8f8;
		padding-left: 10%;
		padding-right: 10%;
		padding-bottom: 25px;
	}
	.hill-box {
		margin-top: 25px;
	}
	.closed {
		min-height: 0px;
		max-height: 0px;
		padding-bottom: 0px;
	}
	.bottombar-div {
		height: 25%;
		min-height: 187.5px;
	}
</style>
