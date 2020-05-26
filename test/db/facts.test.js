const fs = require('fs');
const path = require('path');
const joi = require('@hapi/joi');

const factSchema = joi.object().keys({
    fact: joi.string().required(),
    source: joi.string().uri().allow('').optional(),
    key: joi.string().length(7).required()
}).required();

describe('Check that facts are valid and well formatted', () => {
    let unchangedFacts;
    let facts;

    before(() => {
        unchangedFacts = fs.readFileSync(path.join(__dirname, '../../db/facts.json'), 'utf8')
            .split(/\r?\n/)
            .filter(fact => fact.length > 0);
    });

    beforeEach(() => facts = unchangedFacts);


    it('Each line should be valid JSON', done => {
        for (let index in facts) {
            let fact = facts[index];

            try {
                JSON.parse(fact);
            } catch (err) {
                err.message = `Error on line ${++index}: ${err.message}`;
                done(err);
                return;
            }
        }

        done();
    });

    it('Each line should match the schema', done => {
        for (let index in facts) {
            let fact;

            try {
                fact = JSON.parse(facts[index]);
            } catch (err) {
                err.message = `Error on line ${++index}: ${err.message}`;
                done(err);
                return;
            }

            let err = factSchema.validate(fact).error;

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

        for (let index in facts) {
            let fact;

            try {
                fact = JSON.parse(facts[index]);
            } catch (err) {
                err.message = `Error on line ${++index}: ${err.message}`;
                done(err);
                return;
            }

            if (keys.includes(fact.key)) {
                done(new Error(`Error on line ${++index}: Duplicate key`));
                return;
            }

            keys.push(fact.key);
        }

        done();
    });
});
