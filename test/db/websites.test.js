const fs = require('fs');
const path = require('path');
const joi = require('@hapi/joi');

const websiteSchema = joi.object().keys({
    url: joi.string().uri().allow('').required(),
    description: joi.string().required(),
    key: joi.string().length(7).required()
}).required();

describe('Check that websites are valid and well formatted', () => {
    let unchangedWebsites;
    let websites;

    before(() => {
        unchangedWebsites = fs.readFileSync(path.join(__dirname, '../../db/websites.json'), 'utf8')
            .split(/\r?\n/)
            .filter(website => website.length > 0);
    });

    beforeEach(() => websites = unchangedWebsites);


    it('Each line should be valid JSON', done => {
        for (let index in websites) {
            let website = websites[index];

            try {
                JSON.parse(website);
            } catch (err) {
                err.message = `Error on line ${++index}: ${err.message}`;
                done(err);
                return;
            }
        }

        done();
    });

    it('Each line should match the schema', done => {
        for (let index in websites) {
            let website;

            try {
                website = JSON.parse(websites[index]);
            } catch (err) {
                err.message = `Error on line ${++index}: ${err.message}`;
                done(err);
                return;
            }

            let err = websiteSchema.validate(website).error;

            if (err) {
                err.message = `Error on line ${++index}: ${err.message}`;
                done(err);
                return;
            }
        }

        done();
    });

    it('Each key should be unique', done => {
        let keys = [];

        for (let index in websites) {
            let website;

            try {
                website = JSON.parse(websites[index]);
            } catch (err) {
                err.message = `Error on line ${++index}: ${err.message}`;
                done(err);
                return;
            }

            if (keys.includes(website.key)) {
                done(new Error(`Error on line ${++index}: Duplicate key`));
                return;
            }

            keys.push(website.key);
        }

        done();
    });
});
