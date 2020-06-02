import React from 'react';
import {toKebabCase} from '@f/utils';
import c from '@f/constants/documentation';

function generateEndpoint(type, name, endpoint, example, args = {}) {
    const anchor = toKebabCase(name);

    const argTable = Object.keys(args).length == 0 ? '' : Object.entries(args).map((key, value) => {
        return (
            <tr key={key}>
                <td><b>{key}</b></td>
                <td>{value}</td>
            </tr>
        );
    });

    return (
        <div className="endpoint">
            <div className="endpoint-header row">
                <div className={`header-type ${type}`}>
                    <h4>{type.toUpperCase()}</h4>
                </div>

                <div id={anchor} className="header-name">
                    <h4><a href={endpoint}>{name}</a></h4>
                </div>

                <div className="endpoint-anchor">
                    <a href={`#${anchor}`}>Anchor</a>
                </div>
            </div>
            <div className="endpoint-url">{endpoint}</div>

            {argTable ? (<table class="args-table">{argTable}</table>) : ''}

            <h5><b>Example</b></h5>
            <div className="endpoint-url">{example.url}</div>

            <h6><b>Response</b></h6>
            <pre className="endpoint-response">{example.response}</pre>
        </div>
    );
}

const v1ActivitiesPage = (
    <div className="v1-activities-doc">
        <div className="header-section">
            <h3>Activities</h3>
            <p>The Bored API activity endpoints are the most built-out endpoints, offering many different ways to search for specific activities. These queries are done through queries in the request URL, and this is demonstrated below in the endpoint examples.</p>
        </div>

        <div className="endpoints-section">
            {/* Use private function and include anchors */}
        </div>
    </div>
);

const v2ActivitiesPage = (
    <div className="v2-activities-doc">
        <div className="header-section">
            <h3>Activities</h3>
            <p>The Bored API activity endpoints are the most built-out endpoints, offering many different ways to search for specific activities. These queries are done through queries in the request URL, and this is demonstrated below in the endpoint examples.</p>
        </div>

        <div className="endpoints-section">
            {generateEndpoint('get', 'Get random activity', '/api/v2/activities', c.v2GetRandomActivity)}
            {generateEndpoint('get', 'Get activity by key', '/api/v2/activities/:key', c.v2GetActivityByKey)}
            {generateEndpoint('get', 'Get activity by type', '/api/v2/activities?type=:type', c.v2GetActivityByType)}
            {generateEndpoint('get', 'Get activity by participants', '/api/v2/activities?participants=:participants', c.v2GetActivityByParticipants)}
            {generateEndpoint('get', 'Get activity by constrained participants', '/api/v2/activities?minparticipants=:minparticipants&maxparticipants=:maxparticipants', c.v2GetActivityByConstrainedParticipants)}
            {generateEndpoint('get', 'Get activity by price', '/api/v2/activities?price=:price', c.v2GetActivityByPrice)}
            {generateEndpoint('get', 'Get activity by constrained price', '/api/v2/activities?minprice=:minprice&maxprice=:maxprice', c.v2GetActivityByConstrainedPrice)}
        </div>
    </div>
);

const v2FactsPage = (
    <div className="v2-facts-doc">
        v2 facts
    </div>
);

const v2RiddlesPage = (
    <div className="v2-riddles-doc">
        v2 riddles
    </div>
);

const v2WebsitesPage = (
    <div className="v2-websites-doc">
        v2 websites
    </div>
);

const map = {
    v1: {
        activities: v1ActivitiesPage
    },
    v2: {
        activities: v2ActivitiesPage,
        facts: v2FactsPage,
        riddles: v2RiddlesPage,
        websites: v2WebsitesPage
    }
};

export {
    v1ActivitiesPage,
    v2ActivitiesPage,
    v2FactsPage,
    v2RiddlesPage,
    v2WebsitesPage,
    map
}
