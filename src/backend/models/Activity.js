const mongoose = require('mongoose');

var ActivitySchema = new mongoose.Schema({
	activity: {
		type: String,
		required: true
	},
	accessibility: { // 0.0 - 1.0
		type: Number
	},
	type: { // Sport, education, entertainment, social, ...
		type: String
	},
	participants: { // 1 - n
		type: Number
	},
	price: { // 0.0 - 1.0
		type: Number
	},
	link: { // URL to resource
		type: String
	},
	key: {
		type: String,
		required: true
	},
	enabled: {
		type: Boolean,
		required: true
	}
}, {
	collection: 'activities'
});

module.exports = mongoose.model('Activity', ActivitySchema);
