const Activity = require('@b/models/Activity');

exports.findActivity = params => {
    return Activity.findOne(params).then(activity => {
        if (!activity) {
            throw new Error('No activities found with the specified parameters');
        }

        return activity;
    });
};

exports.findRandomActivity = params => {
    return Activity.countDocuments(params).then(count => {
        if (!count || count === 0) throw new Error('No activity found with the specified parameters');

        return Activity.findOne(params).skip(Math.floor(Math.random() * count));
    }).then(activity => {
        if (!activity) throw new Error('No activity found with the specified parameters');

        return activity;
    });
};
