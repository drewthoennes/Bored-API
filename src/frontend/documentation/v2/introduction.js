import React from 'react';
import '@f/documentation/styles';

export default (
    <div className="v2-introduction-doc">
        <div className="header-section">
            <h3>Introduction</h3>
            <p>The Bored API was a project started in 2018 with the dual purpose of providing an easy to understand API that served as a introduction to full stack web applications and REST APIS while also fighting boredom. Since then, it has grown into a much larger project, now offering v2 endpoints, having community involvement through code contribution and API usage, and seeing hundreds of thousands of endpoint hits each day. It now offers endpoints for finding activities, facts, riddles, and websites, all to curb our boredom.</p>
        </div>

        <div className="content-section">
            <h3>Usage</h3>
            <p>Endpoints offered by the Bored API can be found by appending any endpoint to this website. The v2 API uses a mix of URL parameters and queries, which are in-URL variables and appended variables respectively. An example endpoint query and response are given below:</p>

            <div className="endpoint-url">https://www.boredapi.com/api/v2/activities</div>
            <h6><b>Response</b></h6>
            <pre className="endpoint-response">{`{
    "activity": {
        "activity": "Watch a movie you'd never usually watch",
        "accessibility": "Few to no challenges",
        "type": "relaxation",
        "participants": 1,
        "link": "",
        "key": "9212950",
        "price": "$"
    }
}`}</pre>

<p>In-URL parameters can be used to select specific objects instead of receiving a random response. An example of this is given below:</p>
        <div className="endpoint-url">https://www.boredapi.com/api/v2/facts/2562345</div>
            <h6><b>Response</b></h6>
            <pre className="endpoint-response">{`{
    "fact": {
        "fact": "Water makes different pouring sounds depending on its temperature.",
        "source": "https://bestlifeonline.com/random-fun-facts/",
        "key": "2562345"
    }
}`}</pre>

        <p>Queries can be appended to an endpoint to constrain the query, allowing for finer control over results. An example of this is given below:</p>
        <div className="endpoint-url">https://www.boredapi.com/api/v2/riddles?difficulty=normal</div>
            <h6><b>Response</b></h6>
            <pre className="endpoint-response">{`{
    "riddle": {
        "difficulty": "normal",
        "question": "What can you catch but never throw?",
        "answer": "A cold.",
        "source": "https://www.riddles.com/",
        "key": "7974324"
    }
}`}</pre>
        </div>
    </div>
);
