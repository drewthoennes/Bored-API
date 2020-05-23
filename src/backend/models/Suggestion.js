const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
	profile: {
		agent: {
			type: String
		}
	}
}, {
	collection: 'suggestions'
});

const suggestionModel = mongoose.model('Suggestion', suggestionSchema);

const ActivitySuggestion = suggestionModel.discriminator('ActivitySuggestion', new mongoose.Schema({
	activity: {
		activity: {
			type: String,
			required: true
		},
		type: {
			type: String
		},
		participants: {
			type: Number
		}
	}
}));

const FactSuggestion = suggestionModel.discriminator('FactSuggestion', new mongoose.Schema({
	fact: {
		fact: {
			type: String,
			required: true
		},
		source: {
			type: String
		}
	},
}));

const RiddleSuggestion = suggestionModel.discriminator('RiddleSuggestion', new mongoose.Schema({
	riddle: {
		question: {
			type: String,
			required: true
		},
		answer: {
			type: String,
			required: true
		},
		source: {
			type: String
		}
	}
}));

const WebsiteSuggestion = suggestionModel.discriminator('WebsiteSuggestion', new mongoose.Schema({
	website: {
		url: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		}
	}
}));

module.exports = {
	ActivitySuggestion,
	FactSuggestion,
	RiddleSuggestion,
	WebsiteSuggestion
}
