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
            'accessibility',
            'availability',
            'minavailability',
            'maxavailability',
            'type',
            'participants',
            'minparticipants',
            'maxparticipants',
            'link',
            'key'
        ].filter(key => activity[key])
            .map(key => ({[key]: activity[key]})),
        ...[
            {name: 'price', action: () => unmaskPrice(activity, 'price')},
            {name: 'minprice', action: () => unmaskPrice(activity, 'minprice')},
            {name: 'maxprice', action: () => unmaskPrice(activity, 'maxprice')}
        ].filter(key => activity[key.filter || key.name])
            .map(field => ({[field.name]: field.action() || '0'}))
    );
}

exports.maskActivity = activity => {
    return !activity ? {} : Object.assign(
        {},
        ...['activity', 'availability', 'availability', 'type', 'participants', 'link', 'key']
            .map(key => ({[key]: activity[key] ? activity[key] : activity[key] === 0 ? '0' : ''})),
        ...[
            {name: 'price', action: () => maskPrice(activity, 'price')}
        ].map(field => ({[field.name]: field.action() || ''}))
    );
}

exports.unmaskActivityPrice = unmaskPrice;
exports.maskActivityPrice = maskPrice;
