const faker = require('faker');
const {
    Activity,
    Fact,
    Riddle,
    Website,
	ActivitySuggestion,
	FactSuggestion,
	RiddleSuggestion,
	WebsiteSuggestion
} = require('@b/models');

exports.createV1Activity = params => {
    const activity = Object.assign({
        activity: faker.random.words(),
        availability: faker.random.number({min: 0.1, max: 1, precision: 0.1}),
        type: faker.random.objectElement(['education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork']),
        participants: faker.random.number({min: 1, max: 5}),
        price: faker.random.number({min: 0.1, max: 1, precision: 0.1}),
        duration: faker.random.objectElement(['minutes', 'hours', 'days', 'weeks']),
        kidFriendly: faker.random.boolean(),
        link: faker.internet.url(),
        key: faker.random.number({min: 1000000, max: 9999999})
    }, params);

    return new Activity(activity).save();
};

exports.createV2Activity = params => {
    const activity = Object.assign({
        activity: faker.random.words(),
        availability: faker.random.number({min: 0.1, max: 1, precision: 0.1}),
        accessibility: faker.random.objectElement(['Few to no challenges', 'Minor challenges', 'Major challenges']),
        type: faker.random.objectElement(['education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork']),
        participants: faker.random.number({min: 1, max: 5}),
        price: faker.random.number({min: 0.1, max: 1, precision: 0.1}),
        duration: faker.random.objectElement(['minutes', 'hours', 'days', 'weeks']),
        kidFriendly: faker.random.boolean(),
        link: faker.internet.url(),
        key: faker.random.number({min: 1000000, max: 9999999})
    }, params);

    return new Activity(activity).save();
};

exports.createV2Fact = params => {
    const fact = Object.assign({
        fact: faker.random.words(),
        source: faker.internet.url(),
        key: faker.random.number({min: 1000000, max: 9999999})
    }, params);

    return new Fact(fact).save();
};

exports.createV2Riddle = params => {
    const riddle = Object.assign({
        question: faker.random.words(),
        answer: faker.random.words(),
        difficulty: faker.random.objectElement(['easy', 'normal', 'hard']),
        source: faker.internet.url(),
        key: faker.random.number({min: 1000000, max: 9999999})
    }, params);

    return new Riddle(riddle).save();
};

exports.createV2Website = params => {
    const website = Object.assign({
        url: faker.internet.url(),
        description: faker.random.words(),
        key: faker.random.number({min: 1000000, max: 9999999})
    }, params);

    return new Website(website).save();
};

exports.createV2Suggestion = (type, params = {}, dry) => {
    let defaultValues;
    let suggestionModel;

    switch (type) {
        case 'activity':
            defaultValues = Object.assign({
                activity: faker.random.words(),
                type: faker.random.objectElement(['education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork']),
                participants: faker.random.number({min: 1, max: 10})
            });
            suggestionModel = ActivitySuggestion;
            break;

        case 'fact':
            defaultValues = Object.assign({
                fact: faker.random.words(),
                source: faker.internet.url()
            });
            suggestionModel = FactSuggestion;
            break;

        case 'riddle':
            defaultValues = Object.assign({
                question: faker.random.words(),
                answer: faker.random.words(),
                source: faker.internet.url()
            });
            suggestionModel = RiddleSuggestion;
            break;

        case 'website':
            defaultValues = Object.assign({
                url: faker.internet.url(),
                description: faker.random.words()
            });
            suggestionModel = WebsiteSuggestion;
            break;

        default:
            throw new Error(`createV2Suggestion: Invalid type '${type}'`);
    }

    const suggestion = Object.assign(defaultValues, params);

    if (dry) return {[type]: suggestion};
    return new suggestionModel({[type]: suggestion}).save();
}
