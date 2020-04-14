<template>
	<div class="response-description">
		<p><b>{{ field }}</b></p>
		<div class="description-stack">
			<p class="description-description" v-bind:class="{ noborder: !value }">{{ description }}</p>
			<p class="description-value" v-bind:class="{ nopadding: !value }"><i>{{ value }}</i></p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ResponseDescription',
		props: {
			field: String,
			type: String,
			description: String,
			value: String
		}
	}
</script>

<style scoped>
	.response-description {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-bottom: 1px solid rgba(0, 0, 0, .1);
	}
	.response-description > * {
		width: 50%;
	}
	.response-description p {
		padding: 0px 0px 2px 0px;
	}
	.description-description {
		/* border-bottom: 1px solid rgba(0, 0, 0, 0.1); */
	}
	.description-value {
		/* padding-top: 2px; */
	}
	.noborder {
		border: 0px;
	}
	.nopadding {
		padding: 0px;
	}
</style>
