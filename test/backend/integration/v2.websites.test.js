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

const prune = website => {
    let pruned = website.toObject();

    delete pruned._id;
    delete pruned.__v;

    return pruned;
};

describe('Websites v2 routes should work as expected', () => {
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

    it('/api/v2/websites GET should work as expected', done => {
        let website;

        models.createV2Website().then(created => {
            website = prune(created);

            return chai.request(app).get('/api/v2/websites');
        }).then(res => {
            expect(res.body).to.have.property('website');
            expect(res.body.website).to.eql(website);

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/websites/:key GET should work as expected', done => {
        let website;

        Promise.all([models.createV2Website(), models.createV2Fact(), models.createV2Fact()]).then(created => {
            website = prune(created[0]);

            return chai.request(app).get(`/api/v2/websites/${website.key}`);
        }).then(res => {
            expect(res.body).to.have.property('website');
            expect(res.body.website).to.eql(website);

            done();
        }).catch(err => done(err));
    });
});
