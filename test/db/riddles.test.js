const fs = require('fs');
const path = require('path');
const joi = require('@hapi/joi');

const riddleSchema = joi.object().keys({
    question: joi.string().required(),
    answer: joi.string().required(),
    difficulty: joi.string().valid('easy', 'normal', 'hard'),
    source: joi.string().uri().allow('').optional(),
    key: joi.string().length(7).required()
}).required();

describe('Check that riddles are valid and well formatted', () => {
    let unchangedRiddles;
    let riddles;

    before(() => {
        unchangedRiddles = fs.readFileSync(path.join(__dirname, '../../db/riddles.json'), 'utf8')
            .split(/\r?\n/)
            .filter(riddle => riddle.length > 0);
    });

    beforeEach(() => riddles = unchangedRiddles);


    it('Each line should be valid JSON', done => {
        for (let index in riddles) {
            let riddle = riddles[index];

            try {
                JSON.parse(riddle);
            } catch (err) {
                err.message = `Error on line ${++index}: ${err.message}`;
                done(err);
                return;
            }
        }

        done();
    });

    it('Each line should match the schema', done => {
        for (let index in riddles) {
            let riddle;

            try {
                riddle = JSON.parse(riddles[index]);
            } catch (err) {
                err.message = `Error on line ${++index}: ${err.message}`;
                done(err);
                return;
            }

            let err = riddleSchema.validate(riddle).error;

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

        for (let index in riddles) {
            let riddle;

            try {
                riddle = JSON.parse(riddles[index]);
            } catch (err) {
                err.message = `Error on line ${++index}: ${err.message}`;
                done(err);
                return;
            }

            if (keys.includes(riddle.key)) {
                done(new Error(`Error on line ${++index}: Duplicate key`));
                return;
            }

            keys.push(riddle.key);
        }

        done();
    });
});
