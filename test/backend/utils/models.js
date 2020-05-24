const faker = require('faker');
const {
    Activity
} = require('@b/models');

exports.createV1Activity = params => {
    const activity = Object.assign({
        activity: faker.random.words(),
        availability: faker.random.number({min: 0.1, max: 1, precision: 0.1}),
        type: faker.random.objectElement(['education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork']),
        participants: faker.random.number({min: 1, max: 5}),
        price: faker.random.number({min: 0.1, max: 1, precision: 0.1}),
        link: faker.internet.url(),
        key: faker.random.number({min: 1000000, max: 9999999}),
        enabled: true
    }, params);

    return new Activity(activity).save();
};

exports.createV2Activity = params => {
    const activity = Object.assign({
        activity: faker.random.words(),
        availability: faker.random.number({min: 0.1, max: 1, precision: 0.1}),
        accessibility: faker.random.objectElement(['No challenges', 'Minor challenges', 'Major challenges']),
        type: faker.random.objectElement(['education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork']),
        participants: faker.random.number({min: 1, max: 5}),
        price: faker.random.number({min: 0.1, max: 1, precision: 0.1}),
        link: faker.internet.url(),
        key: faker.random.number({min: 1000000, max: 9999999}),
        enabled: true
    }, params);

    return new Activity(activity).save();
};
