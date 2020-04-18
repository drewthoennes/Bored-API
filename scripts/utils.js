require('module-alias/register');
const fs = require('fs');
const util = require('util');

require('dotenv').config({path: __dirname + '/../.env'});

const matches = (/mongodb:\/\/([^:]*):([^@]*)@([^\/]*)\/(.*)/g).exec(process.env.MONGODB_URI);
if (!matches || matches.length < 5) throw new Error('Cannot parse MONGODB_URI due to invalid format');

module.exports = {
    exec: util.promisify(require('child_process').exec),
    MONGODB_USERNAME: matches[1],
    MONGODB_PASSWORD: matches[2],
    MONGODB_HOST: matches[3],
    MONGODB_DB: matches[4]
};
