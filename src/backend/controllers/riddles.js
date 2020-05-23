const Riddle = require('@b/models/Riddle');

exports.findRiddleByKey = key => {
    return Riddle.findOne({'key': key}).then(riddle => {
        if (!riddle) {
            throw new Error('No riddles found with the specified parameters');
        }

        return riddle;
    });
};

exports.findRandomRiddle = () => {
    return Riddle.countDocuments().then(count => {
        if (!count || count === 0) throw new Error('No riddles found');

        return Riddle.findOne().skip(Math.floor(Math.random() * count));
    }).then(riddle => {
        if (!riddle) throw new Error('No riddles found');

        return riddle;
    });
};
