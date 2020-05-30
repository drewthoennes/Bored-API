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

describe('Suggestions v2 routes should work as expected', () => {
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

    it('/api/v2/suggestions POST for activities should fail if missing fields', done => {
        let suggestion = {
            activity: {
                activity: 'Missing other fields'
            }
        };

        chai.request(app).post('/api/v2/suggestions').send(suggestion).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/suggestions POST for activites should fail if activity is not a string', done => {
        let suggestion = {
            activity: {
                activity: 1,
                type: 'education',
                participants: 1
            }
        };

        chai.request(app).post('/api/v2/suggestions').send(suggestion).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/suggestions POST for activities should fail if type is invalid', done => {
        let suggestion = {
            activity: {
                activity: 'Bubble wrap the house',
                type: 'prank',
                participants: 1
            }

        };

        chai.request(app).post('/api/v2/suggestions').send(suggestion).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/suggestions POST for activities should fail if participants is not a number', done => {
        let suggestion = {
            activity: {
                activity: 'Sing in the shower',
                type: 'relaxation',
                participants: 'Just me'
            }
        };

        chai.request(app).post('/api/v2/suggestions').send(suggestion).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/suggestions POST for activities should fail if participants is less than one', done => {
        let suggestion = {
            activity: {
                activity: 'Exist',
                type: 'diy',
                participants: -1
            }
        };

        chai.request(app).post('/api/v2/suggestions').send(suggestion).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/suggestions POST for activities should work as expected', done => {
        let suggestion = models.createV2Suggestion('activity', {}, true);

        chai.request(app).post('/api/v2/suggestions').send(suggestion).then(res => {
            expect(res.body).to.have.property('message');

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/suggestions POST for facts should fail if missing fields', done => {
        let suggestion = {fact: {}};

        chai.request(app).post('/api/v2/suggestions').send(suggestion).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/suggestions POST for facts should fail if fact is not a string', done => {
        let suggestion = {
            fact: {
                fact: 100101,
                source: 'https://google.com'
            }
        };

        chai.request(app).post('/api/v2/suggestions').send(suggestion).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/suggestions POST for facts should fail if source is not a url', done => {
        let suggestion = {
            fact: {
                fact: 'Tabs >>> spaces',
                source: 'everywhere'
            }
        };

        chai.request(app).post('/api/v2/suggestions').send(suggestion).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/suggestions POST for facts should work as expected', done => {
        let suggestion = models.createV2Suggestion('fact', {}, true);

        chai.request(app).post('/api/v2/suggestions').send(suggestion).then(res => {
            expect(res.body).to.have.property('message');

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/suggestions POST for riddles should fail if missing fields', done => {
        let suggestion = {riddle: {}};

        chai.request(app).post('/api/v2/suggestions').send(suggestion).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/suggestions POST for riddles should fail if source is not a url', done => {
        let suggestion = {
            riddle: {
                question: 'What english word has three consecutive double letters?',
                answer: 'Bookkeeper',
                url: 'big brain energy'
            }
        };

        chai.request(app).post('/api/v2/suggestions').send(suggestion).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/suggestions POST for riddles should work as expected', done => {
        let suggestion = models.createV2Suggestion('riddle', {}, true);

        chai.request(app).post('/api/v2/suggestions').send(suggestion).then(res => {
            expect(res.body).to.have.property('message');

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/suggestions POST for websites should fail if missing fields', done => {
        let suggestion = {website: {}};

        chai.request(app).post('/api/v2/suggestions').send(suggestion).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/suggestions POST for websites should fail if url is not a url', done => {
        let suggestion = {website:
            {
                url: 'not a url',
                description: 'Does something cool, but I don\'t know what'
            }
        };

        chai.request(app).post('/api/v2/suggestions').send(suggestion).then(res => {
            expect(res.body).to.have.property('error');

            done();
        }).catch(err => done(err));
    });

    it('/api/v2/suggestions POST for websites should work as expected', done => {
        let suggestion = models.createV2Suggestion('website', {}, true);

        chai.request(app).post('/api/v2/suggestions').send(suggestion).then(res => {
            expect(res.body).to.have.property('message');

            done();
        }).catch(err => done(err));
    });
});
