const generateUrl = endpoint => `https://www.boredapi.com${endpoint}`;

const v2GetRandomActivity = {
    url: generateUrl('/api/v2/activities'),
    response: `{
    "activity": {
        "activity": "Wash your car",
        "accessibility": "Minor challenges",
        "type": "busywork",
        "participants": 1,
        "link": "",
        "key": "1017771",
        "price": "$"
    }
}`};

const v2GetActivityByKey = {
    url: generateUrl('/api/v2/activities/8724324'),
    response: `{
    "activity": {
        "activity": "Take a hike at a local park",
        "accessibility": "Minor challenges",
        "type": "recreational",
        "participants": 1,
        "link": "",
        "key": "8724324",
        "price": "$"
    }
}`};

const v2GetActivityByType = {
    url: generateUrl('/api/v2/activities?type=social'),
    response: `{
    "activity": {
        "activity": "Hold a video game tournament with some friends",
        "accessibility": "Few to no challenges",
        "type": "social",
        "participants": 4,
        "link": "",
        "key": "2300257",
        "price": "$"
    }
}`};

const v2GetActivityByParticipants = {
    url: generateUrl('/api/v2/activities?participants=2'),
    response: `{
    "activity": {
        "activity": "Cook something together with someone",
        "accessibility": "Few to no challenges",
        "type": "cooking",
        "participants": 2,
        "link": "",
        "key": "1799120",
        "price": "$$"
    }
}`};

const v2GetActivityByConstrainedParticipants = {
    url: generateUrl('/api/v2/activities?minparticipants=2&maxparticipants=4'),
    response: `{
    "activity": {
        "activity": "Go to a karaoke bar with some friends",
        "accessibility": "Few to no challenges",
        "type": "social",
        "participants": 4,
        "link": "",
        "key": "9072906",
        "price": "$$$"
    }
}`};

const v2GetActivityByPrice = {
    url: generateUrl('/api/v2/activities?price=$$$'),
    response: `{
    "activity": {
        "activity": "Go to a karaoke bar with some friends",
        "accessibility": "Few to no challenges",
        "type": "social",
        "participants": 4,
        "link": "",
        "key": "9072906",
        "price": "$$$"
    }
}`};

const v2GetActivityByConstrainedPrice = {
    url: generateUrl('/api/v2/activities?minprice=$&maxprice=$$'),
    response: `{
    "activity": {
        "activity": "Volunteer at a local animal shelter",
        "accessibility": "Minor challenges",
        "type": "charity",
        "participants": 1,
        "link": "",
        "key": "1382389",
        "price": "$"
    }
}`};

export default {
    v2GetRandomActivity,
    v2GetActivityByKey,
    v2GetActivityByType,
    v2GetActivityByParticipants,
    v2GetActivityByConstrainedParticipants,
    v2GetActivityByPrice,
    v2GetActivityByConstrainedPrice
};
