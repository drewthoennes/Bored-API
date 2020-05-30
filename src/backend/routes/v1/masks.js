exports.unmaskActivity = activity => {
    return !activity ? {} : Object.assign(
        {},
        ...[
            'activity',
            'type',
            'participants',
            'minparticipants',
            'maxparticipants',
            'price',
            'minprice',
            'maxprice',
            'link',
            'key'
        ]
            .filter(key => activity[key] !== undefined)
            .map(key => ({[key]: activity[key]})),
        ...[
            {name: 'availability', filter: 'accessibility', action: () => {return activity.accessibility}},
            {name: 'minavailability', filter: 'minaccessibility', action: () => {return activity.minaccessibility}},
            {name: 'maxavailability', filter: 'maxaccessibility', action: () => {return activity.maxaccessibility}}
        ].filter(key => activity[key.filter || key.name] !== undefined)
            .map(field => ({[field.name]: field.action() || ''}))
    );
};

exports.maskActivity = activity => {
    return !activity ? {} : Object.assign(
        {},
        ...['activity', 'type', 'participants', 'price', 'link', 'key']
            .map(key => ({[key]: activity[key] !== undefined ? activity[key] : ''})),
        ...[
            {name: 'accessibility', filter: 'availability', action: () => {return activity.availability}}
        ].filter(key => activity[key.filter] !== undefined)
            .map(field => ({[field.name]: field.action()}))
    );
};
