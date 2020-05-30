const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
	activity: {
		type: String,
		trim: true,
		required: true
	},
	type: {
		type: String,
		enum: ['charity', 'cooking', 'music', 'diy', 'education', 'social', 'busywork', 'recreational', 'relaxation'],
		required: true
	},
	participants: { // 1 - n
		type: Number,
		required: true
	},
	price: { // 0.0 - 1.0
		type: Number,
		required: true
	},
	availability: { // 0.0 - 1.0
		type: Number,
		required: true
	},
	accessibility: {
		type: String,
		enum: ['Few to no challenges', 'Minor challenges', 'Major challenges']
	},
	duration: {
		type: String,
		enum: ['minutes', 'hours', 'days', 'weeks'],
		default: 'minutes',
		required: true
	},
	kidFriendly: {
		type: Boolean,
		default: false,
		required: true
	},
	link: { // URL to resource
		type: String
	},
	key: {
		type: String,
		required: true
	}
}, {
	collection: 'activities'
});

module.exports = mongoose.model('Activity', activitySchema);
