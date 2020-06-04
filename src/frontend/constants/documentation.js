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

const v2GetRandomFact = {
    url: generateUrl('/api/v2/facts'),
    response: `{
    "fact": {
        "fact": "The first computer was invented in the 1940s.",
        "source": "https://bestlifeonline.com/random-fun-facts",
        "key": "8929851"
    }
}`};

const v2GetFactByKey = {
    url: generateUrl('/api/v2/facts/1848104'),
    response: `{
    "fact": {
        "fact": "Playing the accordion was once required for teachers in North Korea.",
        "source": "https://bestlifeonline.com/random-fun-facts/",
        "key": "1848104"
    }
}`};

const v2GetRandomRiddle = {
    url: generateUrl('/api/v2/riddles'),
    response: `{
    "riddle": {
        "difficulty": "hard",
        "question": "Who is that with a neck and no head, two arms and no hands?  What is it?",
        "answer": "A shirt.",
        "source": "https://www.riddles.com/",
        "key": "2347324"
    }
}`};

const v2GetRiddleByKey = {
    url: generateUrl('/api/v2/riddles/7974324'),
    response: `{
    "riddle": {
        "difficulty": "normal",
        "question": "What can you catch but never throw?",
        "answer": "A cold.",
        "source": "https://www.riddles.com/",
        "key": "7974324"
    }
}`};

const v2GetRiddleByDifficulty = {
    url: generateUrl('/api/v2/riddles?difficulty=easy'),
    response: `{
    "riddle": {
        "difficulty": "easy",
        "question": "You live in a one story house made entirely of redwood. What color would the stairs be?",
        "answer": "What stairs? You live in a one-story house.",
        "source": "https://www.riddles.com/",
        "key": "3684252"
    }
}`};

const v2GetRandomWebsite = {
    url: generateUrl('/api/v2/websites'),
    response: `{
    "website": {
        "url": "https://weirdorconfusing.com",
        "description": "Random random being sold.",
        "key": "4298747"
    }
}`};

const v2GetWebsiteByKey = {
    url: generateUrl('/api/v2/websites/9723037'),
    response: `{
    "website": {
        "url": "https://heeeeeeeey.com",
        "description": "Hey there.",
        "key": "9723037"
    }
}`};

export default {
    v2GetRandomActivity,
    v2GetActivityByKey,
    v2GetActivityByType,
    v2GetActivityByParticipants,
    v2GetActivityByConstrainedParticipants,
    v2GetActivityByPrice,
    v2GetActivityByConstrainedPrice,
    v2GetRandomFact,
    v2GetFactByKey,
    v2GetRandomRiddle,
    v2GetRiddleByKey,
    v2GetRiddleByDifficulty,
    v2GetRandomWebsite,
    v2GetWebsiteByKey
};
