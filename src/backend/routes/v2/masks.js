const unmaskPrice = (activity, field) => {
    return !activity[field] ? 0 : (activity[field].length - 1) * 0.25;
};

const maskPrice = activity => {
    return !activity.price ? '$' : '$'.repeat(1 + (activity.price / 0.25));
};

exports.unmaskActivity = activity => {
    return !activity ? {} : Object.assign(
        {},
        ...[
            'activity',
            'accessibility',
            'minaccessibility',
            'maxaccessibility',
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
            .map(field => ({[field.name]: field.action() || ''}))
    );
}

exports.maskActivity = activity => {
    return !activity ? {} : Object.assign(
        {},
        ...['activity', 'accessibility', 'type', 'participants', 'link', 'key']
            .map(key => ({[key]: activity[key] || ''})),
        ...[
            {name: 'price', action: () => maskPrice(activity)}
        ].map(field => ({[field.name]: field.action() || ''}))
    );
}
