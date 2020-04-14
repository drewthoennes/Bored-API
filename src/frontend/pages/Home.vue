<template>
	<div class="home container-fluid">
		<div class="topbar-div">
			<Topbar/>
		</div>

		<div class="intro-div">
			<Intro home/>
		</div>

		<div class="info-div">
			<Info/>
		</div>

		<div class="content">
			<h1>Try it out</h1>
			<div class="search">
				<span>https://www.boredapi.com/api/</span>
				<input type="text" v-model="endpoint" ></input>
				<button @click="query(endpoint)">Submit</button>
			</div>
			<div class="hint">
				<p>Try a few others: <a @click="changeAndQuery('activity?type=recreational')">activity?type=recreational</a> <a @click="changeAndQuery('activity?participants=1')">activity?participants=1</a></p>
			</div>
			<div class="well">
				<pre>{{ response }}</pre>
			</div>
		</div>
		<div class="bottombar-div">
			<Bottombar/>
		</div>
	</div>
</template>

<script>
	import Topbar from '@/components/Topbar'
	import Intro from '@/components/Intro'
	import Info from '@/components/Info'
	import Bottombar from '@/components/Bottombar'

	export default {
		name: 'Home',
		components: {
			Topbar,
			Intro,
			Info,
			Bottombar
		},
		data () {
			return {
				endpoint: "activity/",
				response: ""
			}
		},
		methods: {
			query: function(endpoint) {
				this.$http.get('/api/' + endpoint).then(response => {
					this.response = response.body;
				});
			},
			changeAndQuery: function(endpoint) {
				this.endpoint = endpoint;
				this.query(this.endpoint);
			}
		},
		mounted() {
			this.query(this.endpoint);
		}
	}
</script>

<style scoped>
	h1, h2 {
		font-weight: normal;
	}
	.home {
		height: 100%;
		padding: 0;
		margin: 0;
	}
	.topbar-div {
		height: 10%;
		min-height: 75px;
	}
	.intro-div {
		height: 25%;
		min-height: 187.5px;
	}
	.info-div {
		height: 25%;
		min-height: 187.5px;
	}
	.content {
		margin-left: 10%;
		margin-right: 10%;
		margin-top: 30px;
		margin-bottom: 30px;
	}
	.search {
		width: calc(100% - 20px);
		margin-left: 10px;
		margin-right: 10px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.search span {
		width: 280px;
		text-align: center;
		background: #f8f8f8;
		line-height: 46px;
		border-radius: 4px 0px 0px 4px;
		border-right: 1px solid rgba(0, 0, 0, 0.1);
		overflow: hidden;
		transition: width .7s;
	}
	.search input {
		width: calc(100% - 260px);
		padding: 5px;
		border: 0;
	}
	.search input:focus {
		outline: none;
	}
	.search button {
		background: #6ba3ff;
		border: 0px;
		color: white;
		border-radius: 0px 4px 4px 0px;
		cursor: pointer;
	}
	.hint {
		margin: 0px 10px 0px 10px;
		display: flex;
	}
	.hint > * {
		margin: 0;
		font-size: 12px;
	}
	.hint p a {
		color: #6ba3ff;
	}
	.hint p a:hover {
		color: #6ba3ff;
		text-decoration: underline;
		cursor: pointer;
	}
	.bottombar-div {
		height: 25%;
		min-height: 187.5px;
	}
	@media only screen and (max-width: 670px) {
		.search span {
			width: 0px;
			border: 0px;
		}
		.search input {
			width: calc(100% - 60px);
			border-radius: 4px 0px 0px 4px;
		}
	}
</style>
