const fs = require('fs');
const path = require('path');
const joi = require('@hapi/joi');

const activitySchema = joi.object().keys({
    activity: joi.string().required(),
    type: joi.string().allow('charity', 'cooking', 'music', 'diy', 'education', 'social', 'busywork', 'recreational', 'relaxation').required(),
    participants: joi.number().min(1).required(),
    price: joi.number().min(0).max(1).required(),
    availability: joi.number().min(0).max(1).required(),
    accessibility: joi.string().allow('Few to no challenges', 'Minor challenges', 'Major challenges').required(),
    duration: joi.string().allow('minutes', 'hours', 'days', 'weeks').required(),
    kidFriendly: joi.boolean().required(),
    link: joi.string().uri().allow('').optional(),
    key: joi.string().length(7).required()
}).required();

describe('Check that activities are valid and well formatted', () => {
    let unchangedFacts;
    let activities;

    before(() => {
        unchangedFacts = fs.readFileSync(path.join(__dirname, '../../db/activities.json'), 'utf8')
            .split(/\r?\n/)
            .filter(activity => activity.length > 0);
    });

    beforeEach(() => activities = unchangedFacts);


    it('Each line should be valid JSON', done => {
        for (let index in activities) {
            let activity = activities[index];

            try {
                JSON.parse(activity);
            } catch (err) {
                err.message = `Error on line ${++index}: ${err.message}`;
                done(err);
                return;
            }
        }

        done();
    });

    it('Each line should match the schema', done => {
        for (let index in activities) {
            let activity;

            try {
                activity = JSON.parse(activities[index]);
            } catch (err) {
                err.message = `Error on line ${++index}: ${err.message}`;
                done(err);
                return;
            }

            let err = activitySchema.validate(activity).error;

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

        for (let index in activities) {
            let activity;

            try {
                activity = JSON.parse(activities[index]);
            } catch (err) {
                err.message = `Error on line ${++index}: ${err.message}`;
                done(err);
                return;
            }

            if (keys.includes(activity.key)) {
                done(new Error(`Error on line ${++index}: Duplicate key`));
                return;
            }

            keys.push(activity.key);
        }

        done();
    });
});
