const Fact = require('@b/models/Fact');

exports.findFactByKey = key => {
    return Fact.findOne({'key': key}).then(fact => {
        if (!fact) {
            throw new Error('No facts found with the specified parameters');
        }

        return fact;
    });
};

exports.findRandomFact = () => {
    return Fact.countDocuments().then(count => {
        if (!count || count === 0) throw new Error('No facts found');

        return Fact.findOne().skip(Math.floor(Math.random() * count));
    }).then(fact => {
        if (!fact) throw new Error('No facts found');

        return fact;
    });
};
