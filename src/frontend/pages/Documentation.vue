<template>
	<div class="documentation container-fluid">

		<div class="topbar-div">
			<Topbar boldDocumentation/>
		</div>

		<div class="intro-div">
			<Intro documentation/>
		</div>

		<div class="content">
			<div class="navigation">
				<div class="navigation-menu">
					<div class="navigation-version">
						<button @click="$router.push('/documentation')">V1</button>
					</div>
					<div class="navigation-links">
						<a href="/documentation#events"><b>Activities</b></a>
						<ul>
							<li><a href="/documentation#endpoints-random">Random</a></li>
							<li><a href="/documentation#endpoints-key">Key</a></li>
							<li><a href="/documentation#endpoints-type">Type</a></li>
							<li><a href="/documentation#endpoints-participants">Participants</a></li>
							<li><a href="/documentation#endpoints-price">Price</a></li>
							<li><a href="/documentation#endpoints-price-range">Price Range</a></li>
							<li><a href="/documentation#endpoints-accessibility">Accessibility</a></li>
							<li><a href="/documentation#endpoints-accessibility-range">Accessibility Range</a></li>
						</ul>
					</div>
				</div>

				<div class="back-to-top">
					<button @click="scrollTop()">Back to top</button>
				</div>
			</div>
			<div class="documents">
				<div class="hill-box" id="events">
					<div class="hill-box-header">
						<p>Activities</p>
					</div>
					<div class="hill-box-body">
						<DocumentationEndpoint type="GET" endpoint="/api/activity/" description="Get a random event" query="http://www.boredapi.com/api/activity/" :id="'endpoints-random'" response='{
	"activity": "Learn Express.js",
	"accessibility": 0.25,
	"type": "education",
	"participants": 1,
	"price": 0.1,
	"link": "https://expressjs.com/",
	"key": "3943506"
} '/>

						<br>

						<DocumentationEndpoint type="GET" endpoint="/api/activity?key=:key" description="Find an activity by its key" query="http://www.boredapi.com/api/activity?key=5881028" :id="'endpoints-key'" response='{
	"activity": "Learn a new programming language",
	"accessibility": 0.25,
	"type": "education",
	"participants": 1,
	"price": 0.1,
	"key": "5881028"
}' />

						<br>

						<DocumentationEndpoint type="GET" endpoint="/api/activity?type=:type" description="Find a random activity with a given type" query="http://www.boredapi.com/api/activity?type=recreational" :id="'endpoints-type'" response='{
	"activity": "Learn how to play a new sport",
	"accessibility": 0.2,
	"type": "recreational",
	"participants": 1,
	"price": 0.1,
	"key": "5808228"
}' />

						<br>

						<DocumentationEndpoint type="GET" endpoint="/api/activity?participants=:participants" description="Find a random activity with a given number of participants" query="http://www.boredapi.com/api/activity?participants=1" :id="'endpoints-participants'" response='{
	"activity": "Learn how to fold a paper crane",
	"accessibility": 0.05,
	"type": "education",
	"participants": 1,
	"price": 0.1,
	"key": "3136036"
}' />

						<br/>

						<DocumentationEndpoint type="GET" endpoint="/api/activity?price=:price" description="Find an activity with a specified price" query="http://www.boredapi.com/api/activity?price=0.0" :id="'endpoints-price'" response='{
	"activity": "Hold a yard sale",
	"accessibility": 0.1,
	"type": "social",
	"participants": 1,
	"price": 0.0,
}' />

						<br/>

						<DocumentationEndpoint type="GET" endpoint="/api/activity?minprice=:minprice&maxprice=:maxprice" description="Find an event with a specified price in an inclusively constrained range" query="http://www.boredapi.com/api/activity?minprice=0&maxprice=0.1" :id="'endpoints-price-range'" response='{
	"activity": "Teach your dog a new trick",
	"accessibility": 0.15,
	"type": "relaxation",
	"participants": 1,
	"price":0.05
}' />

						<br/>

						<DocumentationEndpoint type="GET" endpoint="/api/activity?accessibility=:accessibility" description="Find a price in an inclusively constrained range" query="http://www.boredapi.com/api/activity?accessibility=1" :id="'endpoints-accessibility'" response='{
	"activity": "Take a bubble bath",
	"accessibility": 0.1,
	"type": "relaxation",
	"participants": 1,
	"price": 0.15,
}' />

						<br/>

						<DocumentationEndpoint type="GET" endpoint="/api/activity?minaccessibility=:minaccessibility&maxaccessibility=:maxaccessibility" description="Find an event with a specified accessibility in an inclusively constrained range" query="http://www.boredapi.com/api/activity?minaccessibility=0&maxaccessibility=0.1" :id="'endpoints-accessibility-range'" response='{
	"activity":"Learn a new recipe",
	"accessibility":0.05,
	"type":"cooking",
	"participants":1,
	"price":0
}' />

						<br/>

						<ResponseDescription field="activity" type="String" description="Description of the queried activity"/>
						<ResponseDescription field="accessibility" type="Number" description="A factor describing how possible an event is to do with zero being the most accessible" value="[0.0, 1.0]"/>
						<ResponseDescription field="type" type="String" description="Type of the activity" value='["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]'/>
						<ResponseDescription field="participants" type="Number" description="The number of people that this activity could involve" value="[0, n]"/>
						<ResponseDescription field="price" type="String" description="A factor describing the cost of the event with zero being free" value="[0, 1]"/>
						<ResponseDescription field="key" type="String" description="A unique numeric id" value="[1000000, 9999999]"/>

					</div>
				</div>
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
	import Bottombar from '@/components/Bottombar'
	import DocumentationEndpoint from '@/components/DocumentationEndpoint'
	import ResponseDescription from '@/components/ResponseDescription'

	export default {
		name: 'Documentation',
		components: {
			Topbar,
			Intro,
			Bottombar,
			DocumentationEndpoint,
			ResponseDescription
		},
		data () {
			return {
			}
		},
		methods: {
			scrollTop: function() {
				window.smoothscroll()
			}
		},
		mounted() {
			// This function is from https://github.com/caiofsouza/vue-backtotop/blob/master/src/BackToTop.vue
			window.smoothscroll = () => {
				let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
				if (currentScroll > 0) {
					window.requestAnimationFrame(window.smoothscroll)
					window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
				}
			}
		}
	}
</script>

<style scoped>
	h1, h2 {
		font-weight: normal;
	}
	.documentation {
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
		background: #f8f8f8;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.navigation {
		width: 25%;
		margin: 30px 5px 20px 5px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.navigation-menu {
		width: 100%;
		text-align: left;
		padding: 10px;
		position: sticky;
		top: 30px;
	}
	.navigation-menu * {
		margin: 0;
	}
	.navigation-version {
		margin-bottom: 10px;
		box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
		text-align: center;
		display: flex;
		flex-direction: row;
	}
	.navigation-version button {
		background: #6ba3ff;
		height: 100%;
		width: 100%;
		border: 0;
		color: white;
		padding: 10px;
	}
	.navigation-version button:hover {
		cursor: pointer;
	}
	.navigation-version button:focus {
		/* background: #5b8ad8; */
		outline: none;
	}
	.navigation-links {
		background: white;
		box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px -1px 1px rgba(0, 0, 0, 0.05);
		display: flex;
		flex-direction: column;
		padding: 10px;
	}
	.navigation-links a {
		color: black;
	}
	.navigation-links ul li {
		color: #6ba3ff
	}
	.navigation-links ul li a {
		color: black;
	}
	.back-to-top {
		padding-left: 10px;
		padding-right: 10px;
	}
	.back-to-top button {
		background: #4a4e56;
		color: white;
		width: 100%;
		padding: 10px;
		box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
		border: none;
	}
	.back-to-top button:hover {
		cursor: pointer;
	}
	.documents {
		width: 75%;
		text-align: left;
		margin: 30px 5px 0px 5px;
	}
	.documents * {
		margin-left: 10px;
		margin-right: 10px;
	}
	.document-header {
		font-size: 24px;
		margin-bottom: 0;
	}
	.well {
		width: 100%;
	}
	.hill p b {
		margin: 0;
	}
	.hill {
		margin-bottom: 20px;
	}
	.hill-box {
		margin-bottom: 20px;
	}
	.hill-box div * {
		margin: 0;
	}
	.bottombar-div {
		height: 25%;
		min-height: 187.5px;
	}

	.back-to-top {
	}

	@media only screen and (max-width: 670px) {
		.content {
			flex-direction: column;
		}
		.navigation {
			width: 100%;
			margin: 0;
		}
		.navigation-menu {
			width: 100%;
			position: inherit;
		}
		.documents {
			width: 100%;
			margin-left: 0;
			margin-right: 0;
			margin-top: 0;
		}
		.well p {
			white-space: nowrap;
			overflow: scroll;
		}
		.back-to-top {
			display: none;
		}
	}
</style>
