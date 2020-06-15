import React from 'react';
import '@f/documentation/styles';

export default (
    <div className="v1-introduction-doc">
        <div className="header-section">
            <h3>Introduction</h3>
            <p>The Bored API was a project started in 2018 with the dual purpose of providing an easy to understand API that served as a introduction to full stack web applications and REST APIS while also fighting boredom.</p>
        </div>

        <div className="content-section">
            <h3>Usage</h3>
            <p>Endpoints offered by the Bored API can be found by appending any endpoint to this website. An example endpoint query and response are given below:</p>

            <div className="endpoint-url">https://www.boredapi.com/api/v1/activity</div>
            <h6><b>Response</b></h6>
            <pre className="endpoint-response">{`{
    "activity": "Surprise your significant other with something considerate",
    "type": "social",
    "participants": 1,
    "price": 0,
    "link": "",
    "key": "6204657",
    "accessibility": 0
}`}</pre>

        <p>The v1 API uses queries appended to the endpoint URL to constrain the responses. An example of this is given below:</p>
        <div className="endpoint-url">https://www.boredapi.com/api/v1/activity?participants=4</div>
            <h6><b>Response</b></h6>
            <pre className="endpoint-response">{`{
    "activity": "Have a paper airplane contest with some friends",
    "type": "social",
    "participants": 4,
    "price": 0.02,
    "link": "",
    "key": "8557562",
    "accessibility": 0.05
}`}</pre>
        </div>
    </div>
);
