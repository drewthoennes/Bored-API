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

const prune = riddle => {
    let pruned = riddle.toObject();

    delete pruned._id;
    delete pruned.__v;

    return pruned;
};

describe('Riddles v2 routes should work as expected', () => {
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

    it('/api/v2/riddles GET should work as expected', done => {
        let riddle;

        models.createV2Riddle().then(created => {
            riddle = prune(created);

            return chai.request(app).get('/api/v2/riddles');
        }).then(res => {
            expect(res.body).to.have.property('riddle');
            expect(res.body.riddle).to.eql(riddle);

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/riddles/:key GET should work as expected', done => {
        let riddle;

        Promise.all([models.createV2Riddle(), models.createV2Riddle(), models.createV2Riddle()]).then(created => {
            riddle = prune(created[0]);

            return chai.request(app).get(`/api/v2/riddles/${riddle.key}`);
        }).then(res => {
            expect(res.body).to.have.property('riddle');
            expect(res.body.riddle).to.eql(riddle);

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/riddles?difficulty={} GET should return an error if the difficulty is invalid', done => {
        let riddle;

        Promise.all([models.createV2Riddle({'difficulty': 'easy'}), models.createV2Riddle({'difficulty': 'normal'}), models.createV2Riddle({'difficulty': 'hard'})]).then(created => {
            riddle = prune(created[0]);

            return chai.request(app).get(`/api/v2/riddle?difficulty=invalid`);
        }).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/riddles?difficulty={} GET should work as expected', done => {
        let riddle;

        Promise.all([models.createV2Riddle({'difficulty': 'easy'}), models.createV2Riddle({'difficulty': 'normal'}), models.createV2Riddle({'difficulty': 'hard'})]).then(created => {
            riddle = prune(created[0]);

            return chai.request(app).get(`/api/v2/riddles?difficulty=${riddle.difficulty}`);
        }).then(res => {
            expect(res.body).to.have.property('riddle');
            expect(res.body.riddle).to.eql(riddle);

            done();
        }).catch(err => done(err));
    });
});
