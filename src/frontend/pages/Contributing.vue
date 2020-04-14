<template>
	<div class="contributing container-fluid">
		<div class="topbar-div">
			<Topbar boldContributing/>
		</div>

		<div class="intro-div">
			<Intro contributing/>
		</div>

		<div class="content">
			<div class="hill-box">
				<div class="hill-box-header">
					<p>How to Contribute</p>
				</div>
				<div class="hill-box-body">
					<p>The Bored API makes use of a database of activities and other data to fulfill API queries. Although the database is already decently sized, we want to grow it even further. We've already covered many common activities but we need <b>your help</b> to expand.</p>
					<p>Listed here are some guidelines to help with your submission:</p>
					<ul>
						<li>Activities should start with a verb in the form of a command (ex. "Research ...", "Invite ...", "Create ...")</li>
						<li>Try to keep the activities general and without references to companies or name brand products</li>
					</ul>
					<br>
					<p>Thank you again so much for your contribution! Contributors like <b>you</b> make this project possible.</p>
				</div>
			</div>

			<br>

			<div class="hill-box">
				<div class="hill-box-header">
					<p>Contributing Form</p>
				</div>
				<div class="hill-box-body form-body">
					<div class="input-fields">
						<div>
							<p>Activity:</p>
							<input type="text" v-model="activity"/>
						</div>
						<div>
							<p>Type:</p>
							<select v-model="type">
								<option value=""></option>
								<option value="education">Education</option>
								<option value="recreational">Recreational</option>
								<option value="social">Social</option>
								<option value="diy">DIY</option>
								<option value="charity">Charity</option>
								<option value="cooking">Cooking</option>
								<option value="relaxation">Relaxation</option>
								<option value="music">Music</option>
								<option value="busywork">Busywork</option>
							</select>
						</div>
						<div>
							<p>Participants:</p>
							<input type="number" min="1" v-model="participants"/>
						</div>

						<div class="submit-buttons">
							<button class="submit-button-reset" @click="resetForm()">
								<p>Reset</p>
							</button>
							<button class="submit-button-submit" @click="submitForm()">
								<p v-if="!submitting">Submit</p>
								<div v-else class="spinner">
									<div class="bounce1"></div>
									<div class="bounce2"></div>
									<div class="bounce3"></div>
								</div>
							</button>
						</div>
					</div>

					<div class="submission">
						<div class="well">
							<pre>{
	"activity": "{{ activity }}",
	"type": "{{ type }}",
	"participants": {{ participants }}
}</pre>
						</div>

						<div class="submit-buttons submit-buttons-minimized">
							<button class="submit-button-reset" @click="resetForm()">
								<p>Reset</p>
							</button>
							<button class="submit-button-submit" @click="submitForm()">
								<p v-if="!submitting">Submit</p>
								<div v-else class="spinner">
									<div class="bounce1"></div>
									<div class="bounce2"></div>
									<div class="bounce3"></div>
								</div>
							</button>
						</div>
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

	export default {
		name: 'Contributing',
		components: {
			Topbar,
			Intro,
			Bottombar
		},
		data () {
			return {
				activity: '',
				type: '',
				participants: '',
				submitting: false,
				defaultTypes: [
					'education',
					'recreational',
					'social',
					'diy',
					'charity',
					'cooking',
					'relaxation',
					'music',
					'busywork'
				]
			}
		},
		methods: {
			wait: function(ms) {
				return new Promise((r, j) => setTimeout(r, ms));
			},
			resetForm: function() {
				this.activity = '';
				this.type = '';
				this.participants = '';
			},
			submitForm: function() {
				// If already submitting, don't submit twice
				if (this.submitting) {
					return;
				}

				// Check form for completeness to prevent unnecessary submission
				if (this.activity === '') {
					this.showFieldErrorAlert('Activity field cannot be empty');
					return;
				}
				if (!this.defaultTypes.includes(this.type)) {
					this.showFieldErrorAlert('Type must be a valid type');
					return;
				}
				if (isNaN(this.participants)) {
					this.showFieldErrorAlert('Participants must be a number');
					return;
				}
				if (this.participants < 1) {
					this.showFieldErrorAlert('There must be at least one participant');
					return;
				}

				// Submit to backend
				this.submitting = true;
				let startTime = Date.now();
				this.$http.post('/api/suggestion', {
					activity: this.activity,
					type: this.type,
					participants: parseInt(this.participants)
				}).then(response => {
					let self = this;
					let endTime = Date.now();
					// Forces alerts to wait 500 ms
					let waitTime = 500 - (endTime - startTime);
					if (waitTime < 0) {
						waitTime = 0;
					}

					this.wait(waitTime).then(function() {
						if (response.body.error) {
							self.showErrorAlert();
						}
						else {
							self.showSuccessAlert();
							self.resetForm();
						}

						self.submitting = false;
					});
				});
			},
			showSuccessAlert: function() {
				this.$notify({
					group: 'suggestionSubmission',
					type: 'success',
					title: 'Your submission was submitted!',
					text: 'Our team will review your suggestion soon'
				});
			},
			showErrorAlert: function() {
				this.$notify({
					group: 'suggestionSubmission',
					type: 'error',
					title: 'There was an error with your submission',
					text: 'Try submitting again or try again later'
				});
			},
			showFieldErrorAlert: function(text) {
				this.$notify({
					group: 'suggestionSubmission',
					type: 'error',
					title: 'There is a problem in your submission',
					text: text
				});
			}
		}
	}
</script>

<style scoped>
	h1, h2 {
		font-weight: normal;
	}
	.contributing {
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
		padding-top: 25px;
		padding-left: 10%;
		padding-right: 10%;
		padding-bottom: 25px;
	}
	.form-body {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.form-body > * {
		width: 50%;
	}
	.input-fields {
		margin-right: 10px;
	}
	.input-fields > div:not(.submit-buttons) {
		display: flex;
		flex-direction: row;
		padding-top: 10px;
	}
	.input-fields > :first-child {
		padding-top: 0;
	}
	.input-fields > div p {
		padding-top: 5px;
		white-space: nowrap;
	}
	.input-fields > div input, select {
		width: 100%;
		padding: 5px;
		margin-left: 10px;
		background-color: #f5f5f5;
		border: 1px solid #e3e3e3;
		border-radius: 5px;
	}
	.form-body .submission {
		margin-left: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.form-body .submission .well {
		height: 100%;
	}
	.submit-buttons {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.submit-buttons > button {
		width: 50%;
		background: #6ba3ff;
		color: white;
		padding: 10px 5px 10px 5px;
		margin-top: 10px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 5px;
	}
	.submit-buttons > button:hover {
		cursor: pointer;
	}
	.submit-buttons > button p {
		padding: 0;
	}
	/* On submission #4f7ac1 */
	.submit-button-reset {
		margin-right: 10px;
	}
	.submit-button-submit {
		margin-left: 5px;
	}
	.submit-buttons-minimized {
		display: none;
	}
	.bottombar-div {
		height: 25%;
		min-height: 187.5px;
	}

	/* https://codepen.io/danielmorosan/pen/XmYBVx
	CSS Start */
	.spinner {
		margin: 0;
		width: 100%;
		text-align: center;
	}
	.spinner > div {
		width: 14px;
		height: 14px;
		background-color: white;
		border-radius: 100%;
		display: inline-block;
		-webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
		animation: sk-bouncedelay 1.4s infinite ease-in-out both;
	}
	.spinner .bounce1 {
		-webkit-animation-delay: -0.32s;
		animation-delay: -0.32s;
	}
	.spinner .bounce2 {
		-webkit-animation-delay: -0.16s;
		animation-delay: -0.16s;
	}
	@-webkit-keyframes sk-bouncedelay {
		0%, 80%, 100% { -webkit-transform: scale(0) }
		40% { -webkit-transform: scale(1.0) }
	}
	@keyframes sk-bouncedelay {
		0%, 80%, 100% {
			-webkit-transform: scale(0);
			transform: scale(0);
		} 40% {
			-webkit-transform: scale(1.0);
			transform: scale(1.0);
		}
	}
	/* CSS End */

	@media only screen and (max-width: 670px) {
		.form-body {
			flex-direction: column;
		}
		.form-body .input-fields {
			margin-right: 0;
			margin-bottom: 10px;
			width: 100%;
		}
		.form-body .submission {
			margin-left: 0;
			margin-top: 10px;
			width: 100%;
		}
		.submit-buttons {
			/* visibility: hidden; */
			display: none;
		}
		.submit-buttons-minimized {
			display: flex;
		}
	}
</style>
