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

const prune = fact => {
    let pruned = fact.toObject();

    delete pruned._id;
    delete pruned.__v;

    return pruned;
};

describe('Facts v2 routes should work as expected', () => {
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

    it('/api/v2/facts GET should work as expected', done => {
        let fact;

        models.createV2Fact().then(created => {
            fact = prune(created);

            return chai.request(app).get('/api/v2/facts');
        }).then(res => {
            expect(res.body).to.have.property('fact');
            expect(res.body.fact).to.eql(fact);

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/facts/:key GET should work as expected', done => {
        let fact;

        Promise.all([models.createV2Fact(), models.createV2Fact(), models.createV2Fact()]).then(created => {
            fact = prune(created[0]);

            return chai.request(app).get(`/api/v2/facts/${fact.key}`);
        }).then(res => {
            expect(res.body).to.have.property('fact');
            expect(res.body.fact).to.eql(fact);

            done();
        }).catch(err => done(err));
    });
});
