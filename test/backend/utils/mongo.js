require('module-alias/register');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');
const faker = require('faker');

const Activity = require('@b/models/Activity');

let server;

exports.beforeEach = () => {
    server = new MongoMemoryServer();
    return server.getConnectionString().then(uri => {
        return mongoose.connect(uri, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
    });
};

exports.afterEach = () => {
    return mongoose.disconnect().then(() => {
        return server.stop();
    });
};

exports.createActivity = (fields = {}) => {
    return new Activity({
        activity: fields.name || faker.random.words(),
        availability: fields.availability || faker.random.number({min: 0, max: 1, precision: 0.1}) || 1,
        type: fields.type || faker.random.objectElement(['education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork']),
        participants: fields.participants || faker.random.number({min: 0, max: 1, precision: 0.1}) || 1,
        price: fields.price || faker.random.number({min: 0, max: 1, precision: 0.1}) || 1,
        link: fields.link || faker.internet.url(),
        key: fields.key || faker.random.number({min: 1000000, max: 9999999}),
        enabled: fields.enabled || true
    }).save();
};
