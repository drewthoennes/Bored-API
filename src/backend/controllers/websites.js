const Website = require('@b/models/Website');

exports.findWebsiteByKey = key => {
    return Website.findOne({'key': key}).then(website => {
        if (!website) {
            throw new Error('No websites found with the specified parameters');
        }

        return website;
    });
};

exports.findRandomWebsite = () => {
    return Website.countDocuments().then(count => {
        if (!count || count === 0) throw new Error('No websites found');

        return Website.findOne().skip(Math.floor(Math.random() * count));
    }).then(website => {
        if (!website) throw new Error('No websites found');

        return website;
    });
};
