require('module-alias/register');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const faker = require('faker');

const server = require('@t/backend/utils/server');
const mongo = require('@t/backend/utils/mongo');

let app;

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const createSuggestion = () => {
    return {
        activity: faker.random.words(),
        type: faker.random.objectElement(['education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork']),
        participants: faker.random.number({min: 1, max: 10})
    }
};

describe('Suggestions v1 routes should work as expected', () => {
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

    it('/api/suggestion POST should fail if missing fields', done => {
        let suggestion = {
            activity: 'Missing other fields'
        };

        chai.request(app).post('/api/suggestion').send(suggestion).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/suggestion POST should fail if activity is not a string', done => {
        let suggestion = {
            activity: 1,
            type: 'education',
            participants: 1
        };

        chai.request(app).post('/api/suggestion').send(suggestion).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/suggestion POST should fail if type is invalid', done => {
        let suggestion = {
            activity: 'Bubble wrap the house',
            type: 'prank',
            participants: 1
        };

        chai.request(app).post('/api/suggestion').send(suggestion).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/suggestion POST should fail if participants is not a number', done => {
        let suggestion = {
            activity: 'Sing in the shower',
            type: 'relaxation',
            participants: 'Just me'
        };

        chai.request(app).post('/api/suggestion').send(suggestion).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/suggestion POST should fail if participants is less than one', done => {
        let suggestion = {
            activity: 'Exist',
            type: 'diy',
            participants: -1
        };

        chai.request(app).post('/api/suggestion').send(suggestion).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/suggestion POST should work as expected', done => {
        let suggestion = createSuggestion();

        chai.request(app).post('/api/suggestion').send(suggestion).then(res => {
            expect(res.body).to.have.property('message');

            done();
        }).catch(err => done(err));
    });
});
