<template>
	<div id="app">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
		<link href="https://fonts.googleapis.com/css?family=Oxygen" rel="stylesheet">
		<!-- Use key to reload all components on route change -->
		<router-view :key="$route.fullPath" />
		<notifications group="suggestionSubmission" />
	</div>
</template>

<script>
	export default {
		name: 'App'
}
</script>

<style>
	#app {
		font-family: 'Oxygen', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
	html, body {
		margin: 0;
	}
	html, body, #app {
		height: 100%;
	}
	.well {
		margin: 10px;
		padding: 10px;
		background-color: #f5f5f5;
		border: 1px solid #e3e3e3;
		box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.05);
		text-align: left;
	}
	.well * {
		margin: 0;
	}
	.well p {
		white-space: nowrap;
		overflow: scroll;
	}
	.hill {
		margin: 10px;
		padding: 20px;
		background-color: white;
		box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px -1px 1px rgba(0, 0, 0, 0.05);
		text-align: left;
	}
	.hill * {
		margin: 0;
	}
	.hill-box {
		margin: 10px;
		background-color: white;
		box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px -1px 1px rgba(0, 0, 0, 0.05);
		text-align: left;
	}
	.hill-box * {
		margin: 0;
	}
	.hill-box-header {
		margin: 0px !important;
		width: 100%;
		padding: 15px;
		background: #f8f8f8;
	}
	.hill-box-header p {
		font-size: 22px;
	}
	.hill-box-body {
		margin: 0 !important;
		padding: 20px 20px 20px 20px;
	}
	.hill-box-body p {
		padding-top: 5px;
		padding-bottom: 5px;
	}
	.endpoint {
		display: flex;
		flex-direction: row;
	}
	.endpoint-type {
		background: #6ba3ff;
		border-radius: 4px 0px 0px 4px;
		padding-left: 10px;
		padding-right: 10px;
		height: 100%;
		text-align: center;
		line-height: 30px;
		max-width: 60px;
	}
	.endpoint-type p {
		padding: 5px;
		color: white;
	}
	.endpoint-text {
		background: #f8f8f8;
		border: 1px solid rgba(0, 0, 0, .05);
		border-left: 0px;
		border-radius: 0px 5px 5px 0px;
		height: 100%;
		line-height: 28px;
	}
	.endpoint-text p {
		padding: 5px 10px 5px 10px;
	}
	.accordion {
		margin: 25px 10px 0px 10px;
		background-color: white;
		box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px -1px 1px rgba(0, 0, 0, 0.05);
		text-align: left;
		overflow: hidden;
	}
	.accordion * {
		margin: 0;
	}
	.accordion-header {
		margin: 0px !important;
		width: 100%;
		padding: 15px;
		cursor: pointer;
	}
	.accordion-header p {
		font-size: 22px;
	}
	.accordion-body {
		margin: 0 !important;
		padding: 0px 20px 10px 20px;
	}
	.accordion-body p {
		padding-top: 5px;
		padding-bottom: 5px;
	}
</style>
