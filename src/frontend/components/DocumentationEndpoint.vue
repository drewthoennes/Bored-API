<template>
	<div class="documentation-endpoint">
		<div class="endpoint" :id="id">
			<div class="endpoint-type">
				<p><b>{{ type }}</b></p>
			</div>
			<div class="endpoint-text">
				<p>{{ endpoint }}</p>
			</div>
		</div>
		<p>{{ description }}</p>
		<p>Sample Query:</p>
		<div class="well">
			<p>{{ query }}</p>
		</div>
		<p>Response:</p>
		<div class="well">
			<pre>
{{ response }}</pre>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'DocumentationEndpoint',
		props: {
			type: String,
			endpoint: String,
			description: String,
			query: String,
			response: String,
			id: String
		}
	}
</script>

<style scoped>
	.documentation-endpoint > *:not(.endpoint) {
		margin-left: 30px;
	}
	.endpoint-text {
		white-space: nowrap;
		overflow: scroll;
	}
</style>
