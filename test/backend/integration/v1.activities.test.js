require('module-alias/register');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const models = require('@t/backend/utils/models');
const server = require('@t/backend/utils/server');
const mongo = require('@t/backend/utils/mongo');

let app;

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const prune = activity => {
    let pruned = activity.toObject();

    delete pruned._id;
    delete pruned.__v;
    delete pruned.duration;
    delete pruned.kidFriendly;

    return pruned;
};

const unmask = activity => {
    let unmasked = Object.assign({}, activity);

    unmasked.availability = unmasked.accessibility;
    delete unmasked.accessibility;

    return unmasked;
}

describe('Activities v1 routes should work as expected', () => {
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

        models.createV1Activity().then(created => {
            activity = prune(created);

            return chai.request(app).get('/api/activity');
        }).then(res => {
            expect(unmask(res.body)).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?key={} GET should work as expected', done => {
        let activity;

        Promise.all([models.createV1Activity(), models.createV1Activity(), models.createV1Activity()]).then(created => {
            activity = prune(created[0]);

            return chai.request(app).get(`/api/activity?key=${activity.key}`);
        }).then(res => {
            expect(unmask(res.body)).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?type={} GET should work as expected', done => {
        let activity;

        Promise.all([models.createV1Activity({type: 'education'}), models.createV1Activity({type: 'recreational'}), models.createV1Activity({type: 'social'})]).then(created => {
            activity = prune(created[0]);

            return chai.request(app).get(`/api/activity?type=${activity.type}`);
        }).then(res => {
            expect(unmask(res.body)).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?participants={} GET should work as expected', done => {
        let activity;

        Promise.all([models.createV1Activity({participants: 1}), models.createV1Activity({participants: 2}), models.createV1Activity({participants: 3})]).then(created => {
            activity = prune(created[0]);

            return chai.request(app).get(`/api/activity?participants=${activity.participants}`);
        }).then(res => {
            expect(unmask(res.body)).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?price={} GET should work as expected', done => {
        let activity;

        Promise.all([models.createV1Activity({price: 0.1}), models.createV1Activity({price: 0.5}), models.createV1Activity({price: 0.7})]).then(created => {
            activity = prune(created[0]);

            return chai.request(app).get(`/api/activity?price=${activity.price}`);
        }).then(res => {
            expect(unmask(res.body)).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?minprice={} GET should work as expected', done => {
        let activity;

        Promise.all([models.createV1Activity({price: 0.1}), models.createV1Activity({price: 0.2}), models.createV1Activity({price: 0.7})]).then(created => {
            activity = prune(created[2]);

            return chai.request(app).get('/api/activity?minprice=0.7');
        }).then(res => {
            expect(unmask(res.body)).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?maxprice={} GET should work as expected', done => {
        let activity;

        Promise.all([models.createV1Activity({price: 0.1}), models.createV1Activity({price: 0.2}), models.createV1Activity({price: 0.7})]).then(created => {
            activity = prune(created[0]);

            return chai.request(app).get('/api/activity?maxprice=0.1');
        }).then(res => {
            expect(unmask(res.body)).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?minprice={}&maxprice={} GET should return error if range is invalid', done => {
        Promise.all([models.createV1Activity(), models.createV1Activity(), models.createV1Activity()]).then(created => {
            return chai.request(app).get('/api/activity?minprice=0.9&maxprice=0.1');
        }).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?minprice={}&maxprice={} GET should work as expected', done => {
        let activity;

        Promise.all([models.createV1Activity({price: 0.1}), models.createV1Activity({price: 0.3}), models.createV1Activity({price: 0.7})]).then(created => {
            activity = prune(created[1]);

            return chai.request(app).get('/api/activity?minprice=0.2&maxprice=0.5');
        }).then(res => {
            expect(unmask(res.body)).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?price={}&minprice={}&maxprice={} GET should allow the range to override the specified value', done => {
        let activity;

        Promise.all([models.createV1Activity({price: 0.1}), models.createV1Activity({price: 0.3}), models.createV1Activity({price: 0.7})]).then(created => {
            activity = prune(created[1]);

            return chai.request(app).get('/api/activity?price=0.1&minprice=0.2&maxprice=0.5');
        }).then(res => {
            expect(unmask(res.body)).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?accessibility={} GET should work as expected', done => {
        let activity;

        Promise.all([models.createV1Activity({availability: 0.1}), models.createV1Activity({availability: 0.5}), models.createV1Activity({availability: 0.7})]).then(created => {
            activity = prune(created[0]);

            return chai.request(app).get(`/api/activity?accessibility=${activity.availability}`);
        }).then(res => {
            expect(unmask(res.body)).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?minaccessibility={} GET should work as expected', done => {
        let activity;

        Promise.all([models.createV1Activity({availability: 0.1}), models.createV1Activity({availability: 0.2}), models.createV1Activity({availability: 0.7})]).then(created => {
            activity = prune(created[2]);

            return chai.request(app).get('/api/activity?minaccessibility=0.6');
        }).then(res => {
            expect(unmask(res.body)).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?maxaccessibility={} GET should work as expected', done => {
        let activity;

        Promise.all([models.createV1Activity({availability: 0.1}), models.createV1Activity({availability: 0.2}), models.createV1Activity({availability: 0.7})]).then(created => {
            activity = prune(created[0]);

            return chai.request(app).get('/api/activity?maxaccessibility=0.1');
        }).then(res => {
            expect(unmask(res.body)).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?minaccessibility={}&maxaccessibility={} GET should return error if range is invalid', done => {
        Promise.all([models.createV1Activity(), models.createV1Activity(), models.createV1Activity()]).then(created => {
            return chai.request(app).get('/api/activity?minaccessibility=0.9&maxaccessibility=0.1');
        }).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?minaccessibility={}&maxaccessibility={} GET should work as expected', done => {
        let activity;

        Promise.all([models.createV1Activity({availability: 0.1}), models.createV1Activity({availability: 0.3}), models.createV1Activity({availability: 0.7})]).then(created => {
            activity = prune(created[1]);

            return chai.request(app).get('/api/activity?minaccessibility=0.2&maxaccessibility=0.5');
        }).then(res => {
            expect(unmask(res.body)).to.eql(activity);

            done();
        }).catch(err => done(err));
    });

    it('/api/activity?accessibility={}&minaccessibility={}&maxaccessibility={} GET should allow the range to override the specified value', done => {
        let activity;

        Promise.all([models.createV1Activity({availability: 0.1}), models.createV1Activity({availability: 0.3}), models.createV1Activity({availability: 0.7})]).then(created => {
            activity = prune(created[1]);

            return chai.request(app).get('/api/activity?accessibility=0.1&minaccessibility=0.2&maxaccessibility=0.5');
        }).then(res => {
            expect(unmask(res.body)).to.eql(activity);

            done();
        }).catch(err => done(err));
    });
});
