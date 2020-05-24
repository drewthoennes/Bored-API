const Riddle = require('@b/models/Riddle');

exports.findRiddle = params => {
    return Riddle.findOne(params).then(riddle => {
        if (!riddle) {
            throw new Error('No riddles found with the specified parameters');
        }

        return riddle;
    });
};

exports.findRandomRiddle = params => {
    return Riddle.countDocuments(params).then(count => {
        if (!count || count === 0) throw new Error('No riddles found with the specified query');

        return Riddle.findOne(params).skip(Math.floor(Math.random() * count));
    }).then(riddle => {
        if (!riddle) throw new Error('No riddles found with the specified query');

        return riddle;
    });
};
