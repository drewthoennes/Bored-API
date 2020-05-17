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

const activitySuggestion = suggestionModel.discriminator('ActivitySuggestion', new mongoose.Schema({
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

const factSuggestion = suggestionModel.discriminator('FactSuggestion', new mongoose.Schema({
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

const riddleSuggestion = suggestionModel.discriminator('RiddleSuggestion', new mongoose.Schema({
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

const websiteSuggestion = suggestionModel.discriminator('WebsiteSuggestion', new mongoose.Schema({
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
	ActivitySuggestion: activitySuggestion,
	FactSuggestion: factSuggestion,
	RiddleSuggestion: riddleSuggestion,
	WebsiteSuggestion: websiteSuggestion
}
