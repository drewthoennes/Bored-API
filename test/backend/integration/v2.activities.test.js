require('module-alias/register');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const models = require('@t/backend/utils/models');
const server = require('@t/backend/utils/server');
const mongo = require('@t/backend/utils/mongo');
const {
    maskActivity,
    maskActivityPrice
} = require('@b/routes/v2/masks');

let app;

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const prune = activity => {
    let pruned = activity.toObject();

    delete pruned._id;
    delete pruned.__v;

    return pruned;
};

describe('Activities v2 routes should work as expected', () => {
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

    it('/api/v2/activities GET should work as expected', done => {
        let activity;

        models.createV2Activity().then(created => {
            activity = prune(created);

            return chai.request(app).get('/api/v2/activities');
        }).then(res => {
            expect(res.body).to.have.property('activity');
            expect(res.body.activity).to.eql(maskActivity(activity));

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/activities/:key GET should work as expected', done => {
        let activity;

        Promise.all([models.createV2Activity(), models.createV2Activity(), models.createV2Activity()]).then(created => {
            activity = prune(created[0]);

            return chai.request(app).get(`/api/v2/activities/${activity.key}`);
        }).then(res => {
            expect(res.body).to.have.property('activity');
            expect(res.body.activity).to.eql(maskActivity(activity));

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/activities?type={} GET should work as expected', done => {
        let activity;

        Promise.all([models.createV2Activity({type: 'education'}), models.createV2Activity({type: 'recreational'}), models.createV2Activity({type: 'social'})]).then(created => {
            activity = prune(created[0]);

            return chai.request(app).get(`/api/v2/activities?type=${activity.type}`);
        }).then(res => {
            expect(res.body).to.have.property('activity');
            expect(res.body.activity).to.eql(maskActivity(activity));

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/activities?participants={} GET should work as expected', done => {
        let activity;

        Promise.all([models.createV2Activity({participants: 1}), models.createV2Activity({participants: 2}), models.createV2Activity({participants: 3})]).then(created => {
            activity = prune(created[0]);

            return chai.request(app).get(`/api/v2/activities?participants=${activity.participants}`);
        }).then(res => {
            expect(res.body).to.have.property('activity');
            expect(res.body.activity).to.eql(maskActivity(activity));

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/activities?price={} GET should work as expected', done => {
        let activity;

        Promise.all([models.createV2Activity({price: 0.1}), models.createV2Activity({price: 0.5}), models.createV2Activity({price: 0.7})]).then(created => {
            activity = prune(created[0]);

            return chai.request(app).get(`/api/v2/activities?price=${maskActivity({price: activity.price}).price}`);
        }).then(res => {
            expect(res.body).to.have.property('activity');
            expect(res.body.activity).to.eql(maskActivity(activity));

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/activities?minprice={} GET should work as expected', done => {
        let activity;

        Promise.all([models.createV2Activity({price: 0.1}), models.createV2Activity({price: 0.2}), models.createV2Activity({price: 0.7})]).then(created => {
            activity = prune(created[2]);

            return chai.request(app).get(`/api/v2/activities?minprice=${maskActivityPrice(activity, 'price')}`);
        }).then(res => {
            expect(res.body).to.have.property('activity');
            expect(res.body.activity).to.eql(maskActivity(activity));

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/activities?maxprice={} GET should work as expected', done => {
        let activity;

        Promise.all([models.createV2Activity({price: 0.1}), models.createV2Activity({price: 0.2}), models.createV2Activity({price: 0.7})]).then(created => {
            activity = prune(created[0]);

            return chai.request(app).get(`/api/v2/activities?maxprice=${maskActivityPrice(activity, 'price')}`);
        }).then(res => {
            expect(res.body).to.have.property('activity');
            expect(res.body.activity).to.eql(maskActivity(activity));

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/activities?minprice={}&maxprice={} GET should return error if range is invalid', done => {
        Promise.all([models.createV2Activity(), models.createV2Activity(), models.createV2Activity()]).then(created => {
            return chai.request(app).get('/api/v2/activities?minprice=$$$&maxprice=$');
        }).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/activities?minprice={}&maxprice={} GET should work as expected', done => {
        let activity;

        Promise.all([models.createV2Activity({price: 0.1}), models.createV2Activity({price: 0.7}), models.createV2Activity({price: 0.9})]).then(created => {
            activity = prune(created[0]);

            return chai.request(app).get('/api/v2/activities?minprice=$&maxprice=$$');
        }).then(res => {
            expect(res.body).to.have.property('activity');
            expect(res.body.activity).to.eql(maskActivity(activity));

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/activities?price={}&minprice={}&maxprice={} GET should allow the range to override the specified value', done => {
        let activity;

        Promise.all([models.createV2Activity({price: 0.1}), models.createV2Activity({price: 0.7}), models.createV2Activity({price: 0.9})]).then(created => {
            activity = prune(created[0]);

            return chai.request(app).get('/api/v2/activities?price=0.9&minprice=$&maxprice=$$');
        }).then(res => {
            expect(res.body).to.have.property('activity');
            expect(res.body.activity).to.eql(maskActivity(activity));

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/activities?availability={} GET should work as expected', done => {
        let activity;

        Promise.all([models.createV2Activity({availability: 0.1}), models.createV2Activity({availability: 0.5}), models.createV2Activity({availability: 0.7})]).then(created => {
            activity = prune(created[0]);

            return chai.request(app).get(`/api/v2/activities?availability=${activity.availability}`);
        }).then(res => {
            expect(res.body).to.have.property('activity');
            expect(res.body.activity).to.eql(maskActivity(activity));

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/activities?minavailability={} GET should work as expected', done => {
        let activity;

        Promise.all([models.createV2Activity({availability: 0.1}), models.createV2Activity({availability: 0.2}), models.createV2Activity({availability: 0.7})]).then(created => {
            activity = prune(created[2]);

            return chai.request(app).get('/api/v2/activities?minavailability=0.6');
        }).then(res => {
            expect(res.body).to.have.property('activity');
            expect(res.body.activity).to.eql(maskActivity(activity));

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/activities?maxavailability={} GET should work as expected', done => {
        let activity;

        Promise.all([models.createV2Activity({availability: 0.1}), models.createV2Activity({availability: 0.2}), models.createV2Activity({availability: 0.7})]).then(created => {
            activity = prune(created[0]);

            return chai.request(app).get('/api/v2/activities?maxavailability=0.1');
        }).then(res => {
            expect(res.body).to.have.property('activity');
            expect(res.body.activity).to.eql(maskActivity(activity));

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/activities?minavailability={}&maxavailability={} GET should return error if range is invalid', done => {
        Promise.all([models.createV2Activity(), models.createV2Activity(), models.createV2Activity()]).then(created => {
            return chai.request(app).get('/api/v2/activities?minavailability=0.9&maxavailability=0.1');
        }).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/activities?minavailability={}&maxavailability={} GET should work as expected', done => {
        let activity;

        Promise.all([models.createV2Activity({availability: 0.1}), models.createV2Activity({availability: 0.3}), models.createV2Activity({availability: 0.7})]).then(created => {
            activity = prune(created[1]);

            return chai.request(app).get('/api/v2/activities?minavailability=0.2&maxavailability=0.5');
        }).then(res => {
            expect(res.body).to.have.property('activity');
            expect(res.body.activity).to.eql(maskActivity(activity));

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/activities?availability={}&minavailability={}&maxavailability={} GET should allow the range to override the specified value', done => {
        let activity;

        Promise.all([models.createV2Activity({availability: 0.1}), models.createV2Activity({availability: 0.3}), models.createV2Activity({availability: 0.7})]).then(created => {
            activity = prune(created[1]);

            return chai.request(app).get('/api/v2/activities?availability=0.1&minavailability=0.2&maxavailability=0.5');
        }).then(res => {
            expect(res.body).to.have.property('activity');
            expect(res.body.activity).to.eql(maskActivity(activity));

            done();
        }).catch(err => done(err));
    });
});
