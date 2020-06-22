const unmaskPrice = (activity, field) => {
    return activity[field] === undefined ? 0.1 : (activity[field].length - 1) * 0.25 || 0.1;
};

const maskPrice = (activity, field) => {
    return activity[field] === undefined ? '$' : '$'.repeat(1 + (activity.price / 0.25));
};

exports.unmaskActivity = activity => {
    return !activity ? {} : Object.assign(
        {},
        ...[
            'activity',
            'availability',
            'minavailability',
            'maxavailability',
            'type',
            'participants',
            'minparticipants',
            'maxparticipants',
            'link',
            'key'
        ].filter(key => activity[key] !== undefined)
            .map(key => ({[key]: activity[key]})),
        ...[
            {name: 'price', action: () => unmaskPrice(activity, 'price')},
            {name: 'minprice', action: () => unmaskPrice(activity, 'minprice')},
            {name: 'maxprice', action: () => unmaskPrice(activity, 'maxprice')}
        ].filter(key => activity[key.filter || key.name] !== undefined)
            .map(field => ({[field.name]: field.action() || '0'}))
    );
}

exports.maskActivity = activity => {
    return !activity ? {} : Object.assign(
        {},
        ...['activity', 'accessibility', 'type', 'participants', 'link', 'key', 'duration', 'kidFriendly']
            .map(key => ({[key]: activity[key] ? activity[key] : activity[key] === 0 ? '0' : ''})),
        ...[
            {name: 'price', action: () => maskPrice(activity, 'price')}
        ].map(field => ({[field.name]: field.action() || ''}))
    );
}

exports.maskFact = fact => {
    if (!fact) return {};

    let masked = fact.toObject();

    delete masked._id;
    delete masked.__v;

    return masked;
};

exports.maskRiddle = riddle => {
    if (!riddle) return {};

    let masked = riddle.toObject();

    delete masked._id;
    delete masked.__v;

    return masked;
};

exports.maskWebsite = website => {
    if (!website) return {};

    let masked = website.toObject();

    delete masked._id;
    delete masked.__v;

    return masked;
};

exports.unmaskActivityPrice = unmaskPrice;
exports.maskActivityPrice = maskPrice;
