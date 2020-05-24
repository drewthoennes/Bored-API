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
