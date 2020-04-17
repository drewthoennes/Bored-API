require('module-alias/register');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const faker = require('faker');
const fs = require('fs');
const readline = require('readline');
const Ajv = require('ajv');

const server = require('../utils/server');
const mongo = require('../utils/mongo');

let app;

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const prune = (activity) => {
    let pruned = activity.toObject();
    delete pruned._id;
    delete pruned.__v;
    delete pruned.enabled;

    return pruned;
};

describe('Check that activities.json is valid and well formed', () => {
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
                  e.message = "Error occured on line " + lineno + " of activities.json.\n" + e.message;
                  error = e;
              }
        });
        rl.on('close', () => done(error));
    });

    it('Each line should match the schema', done => {
        const line_counter = ((i = 0) => () => ++i)();
        var ajv = new Ajv({allErrors: true});
        const schema = require('../../../activity-schema-v1.json');
        const validate = ajv.compile(schema);
        const rl = readline.createInterface({
            input: fs.createReadStream('activities.json'),
            crlfDelay: Infinity
        });
        let error = undefined;
        rl.on('line', (line, lineno = line_counter()) => {
            if (! validate(JSON.parse(line))) {
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

describe('Activities route should work as expected', () => {
    before(() => {
        app = server.getNewApp();
    });

    beforeEach(done => {
        mongo.beforeEach().then(() => done());
    });

    afterEach(done => {
        mongo.afterEach().then(() => done());
    });

    after(() => server.killSession());

    it('/api/activity GET should work as expected', done => {
        let activity;

        mongo.createActivity().then(created => {
            activity = prune(created);

            return chai.request(app).get('/api/activity');
        }).then(res => {
            expect(res.body).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?key={} GET should work as expected', done => {
        let activity;

        Promise.all([mongo.createActivity(), mongo.createActivity(), mongo.createActivity()]).then(created => {
            activity = prune(created[0]);

            return chai.request(app).get(`/api/activity?key=${activity.key}`);
        }).then(res => {
            expect(res.body).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?type={} GET should work as expected', done => {
        let activity;

        Promise.all([mongo.createActivity({type: 'educational'}), mongo.createActivity({type: 'recreational'}), mongo.createActivity({type: 'social'})]).then(created => {
            activity = prune(created[0]);

            return chai.request(app).get(`/api/activity?type=${activity.type}`);
        }).then(res => {
            expect(res.body).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?participants={} GET should work as expected', done => {
        let activity;

        Promise.all([mongo.createActivity({participants: 1}), mongo.createActivity({participants: 2}), mongo.createActivity({participants: 3})]).then(created => {
            activity = prune(created[0]);

            return chai.request(app).get(`/api/activity?participants=${activity.participants}`);
        }).then(res => {
            expect(res.body).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?price={} GET should work as expected', done => {
        let activity;

        Promise.all([mongo.createActivity({price: 0.1}), mongo.createActivity({price: 0.5}), mongo.createActivity({price: 0.7})]).then(created => {
            activity = prune(created[0]);

            return chai.request(app).get(`/api/activity?price=${activity.price}`);
        }).then(res => {
            expect(res.body).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?minprice={} GET should work as expected', done => {
        let activity;

        Promise.all([mongo.createActivity({price: 0.1}), mongo.createActivity({price: 0.2}), mongo.createActivity({price: 0.7})]).then(created => {
            activity = prune(created[2]);

            return chai.request(app).get('/api/activity?minprice=0.7');
        }).then(res => {
            expect(res.body).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?maxprice={} GET should work as expected', done => {
        let activity;

        Promise.all([mongo.createActivity({price: 0.1}), mongo.createActivity({price: 0.2}), mongo.createActivity({price: 0.7})]).then(created => {
            activity = prune(created[0]);

            return chai.request(app).get('/api/activity?maxprice=0.1');
        }).then(res => {
            expect(res.body).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?minprice={}&maxprice={} GET should return error if range is invalid', done => {
        Promise.all([mongo.createActivity(), mongo.createActivity(), mongo.createActivity()]).then(created => {
            return chai.request(app).get('/api/activity?minprice=0.9&maxprice=0.1');
        }).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?minprice={}&maxprice={} GET should work as expected', done => {
        let activity;

        Promise.all([mongo.createActivity({price: 0.1}), mongo.createActivity({price: 0.3}), mongo.createActivity({price: 0.7})]).then(created => {
            activity = prune(created[1]);

            return chai.request(app).get('/api/activity?minprice=0.2&maxprice=0.5');
        }).then(res => {
            expect(res.body).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?price={}&minprice={}&maxprice={} GET should allow the range to override the specified value', done => {
        let activity;

        Promise.all([mongo.createActivity({price: 0.1}), mongo.createActivity({price: 0.3}), mongo.createActivity({price: 0.7})]).then(created => {
            activity = prune(created[1]);

            return chai.request(app).get('/api/activity?price=0.1&minprice=0.2&maxprice=0.5');
        }).then(res => {
            expect(res.body).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?accessibility={} GET should work as expected', done => {
        let activity;

        Promise.all([mongo.createActivity({accessibility: 0.1}), mongo.createActivity({accessibility: 0.5}), mongo.createActivity({accessibility: 0.7})]).then(created => {
            activity = prune(created[0]);

            return chai.request(app).get(`/api/activity?accessibility=${activity.accessibility}`);
        }).then(res => {
            expect(res.body).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?minaccessibility={} GET should work as expected', done => {
        let activity;

        Promise.all([mongo.createActivity({accessibility: 0.1}), mongo.createActivity({accessibility: 0.2}), mongo.createActivity({accessibility: 0.7})]).then(created => {
            activity = prune(created[2]);

            return chai.request(app).get('/api/activity?minaccessibility=0.6');
        }).then(res => {
            expect(res.body).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?maxaccessibility={} GET should work as expected', done => {
        let activity;

        Promise.all([mongo.createActivity({accessibility: 0.1}), mongo.createActivity({accessibility: 0.2}), mongo.createActivity({accessibility: 0.7})]).then(created => {
            activity = prune(created[0]);

            return chai.request(app).get('/api/activity?maxaccessibility=0.1');
        }).then(res => {
            expect(res.body).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?minaccessibility={}&maxaccessibility={} GET should return error if range is invalid', done => {
        Promise.all([mongo.createActivity(), mongo.createActivity(), mongo.createActivity()]).then(created => {
            return chai.request(app).get('/api/activity?minaccessibility=0.9&maxaccessibility=0.1');
        }).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?minaccessibility={}&maxaccessibility={} GET should work as expected', done => {
        let activity;

        Promise.all([mongo.createActivity({accessibility: 0.1}), mongo.createActivity({accessibility: 0.3}), mongo.createActivity({accessibility: 0.7})]).then(created => {
            activity = prune(created[1]);

            return chai.request(app).get('/api/activity?minaccessibility=0.2&maxaccessibility=0.5');
        }).then(res => {
            expect(res.body).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?accessibility={}&minaccessibility={}&maxaccessibility={} GET should allow the range to override the specified value', done => {
        let activity;

        Promise.all([mongo.createActivity({accessibility: 0.1}), mongo.createActivity({accessibility: 0.3}), mongo.createActivity({accessibility: 0.7})]).then(created => {
            activity = prune(created[1]);

            return chai.request(app).get('/api/activity?accessibility=0.1&minaccessibility=0.2&maxaccessibility=0.5');
        }).then(res => {
            expect(res.body).to.eql(activity);

            done();
        }).catch(err => done(err));
    });
});
