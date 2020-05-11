const fs = require('fs');
const readline = require('readline');
const Ajv = require('ajv');

let testfailed = false;

describe('Check that activities.json is valid and well formed', () => {
    beforeEach( () => {
        if (testfailed) {
            throw new Error("Aborting prematurely because earlier test failed.");
        }
    });


    it('Each line should be valid JSON', done => {
        const line_counter = ((i = 0) => () => ++i)();
        const rl = readline.createInterface({
            input: fs.createReadStream('activities.json'),
            crlfDelay: Infinity
        });
        let error = undefined;
        rl.on('line', (line, lineno = line_counter()) => {
              try {
                  JSON.parse(line);
              } catch (e) {
                  testfailed = true;
                  e.message = "Error occured on line " + lineno + " of activities.json.\n" + e.message;
                  error = e;
              }
        });
        rl.on('close', () => done(error));
    });

    it('Each line should match the schema', done => {
        const line_counter = ((i = 0) => () => ++i)();
        var ajv = new Ajv({allErrors: true});
        const schema = require('./activity-schema-v1.json');
        const validate = ajv.compile(schema);
        const rl = readline.createInterface({
            input: fs.createReadStream('activities.json'),
            crlfDelay: Infinity
        });
        let error = undefined;
        rl.on('line', (line, lineno = line_counter()) => {
            if (! validate(JSON.parse(line))) {
                testfailed = true;
                error = new Error("Error occured on line " + lineno + " of activities.json.\nThe following validation errors occurred:\n" + JSON.stringify(validate.errors, null, 4));
            }
        });
        rl.on('close', () => done(error));
    });

    it('Each key should be unique', done => {
        const line_counter = ((i = 0) => () => ++i)();
        const rl = readline.createInterface({
            input: fs.createReadStream('activities.json'),
            crlfDelay: Infinity
        });
        let error = undefined;
        let keys = new Array();
        rl.on('line', (line, lineno = line_counter()) => {
            const rec = JSON.parse(line);
            if (keys.includes(rec['key'])) {
                error = new Error("Duplicate `key` found on line " + lineno + " of activities.json.");
            } else {
                keys.push(rec['key']);
            }
        });
        rl.on('close', () => done(error));
    });
});
