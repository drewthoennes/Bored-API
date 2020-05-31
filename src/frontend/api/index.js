import axios from 'axios';

function getV2Activity(key) {
    return axios.get(`/api/v2/activities${key ? `/${key}` : ''}`).then(res => {
        if (!res || !res.data || !res.data.activity) {
            throw new Error('Error querying for v2 activities');
        }

        return res.data.activity;
    });
}

function getV2Fact(key) {
    return axios.get(`/api/v2/facts${key ? `/${key}` : ''}`).then(res => {
        if (!res || !res.data || !res.data.fact) {
            throw new Error('Error querying for v2 facts');
        }

        return res.data.fact;
    });
}

function getV2Riddle(key) {
    return axios.get(`/api/v2/riddles${key ? `/${key}` : ''}`).then(res => {
        if (!res || !res.data || !res.data.riddle) {
            throw new Error('Error querying for v2 riddles');
        }

        return res.data.riddle;
    });
}

function getV2Website(key) {
    return axios.get(`/api/v2/websites${key ? `/${key}` : ''}`).then(res => {
        if (!res || !res.data || !res.data.website) {
            throw new Error('Error querying for v2 websites');
        }

        return res.data.website;
    });
}

export default {
    getV2Activity,
    getV2Fact,
    getV2Riddle,
    getV2Website
}
