import React from 'react';
import c from '@f/constants/documentation';
import {
    generateEndpoint,
    generateTableHeader,
    generateTableRow
} from '@f/utils/documentation';

export default (
    <div className="v2-activities-doc">
        <div className="header-section">
            <h3>Activities</h3>
            <p>The Bored API activity endpoints are the most built-out endpoints, offering many different ways to search for specific activities. These queries are done through queries in the request URL, and this is demonstrated below in the endpoint examples.</p>
        </div>

        <div className="fields-section">
            <h3>Fields Explained</h3>
            <p>There are many values associated with the activity endpoints fo this API. Some fields are bounded in their values while others are more open ended. All of the fields one can receive from a request to any of the activity endpoints are outlined below.</p>

            {/* <table>
                <thead>
                    {generateTableHeader('Name', 'Description', 'Value Type', 'Constraints')}
                </thead>
                <tbody>
                    {generateTableRow('Activity', 'The description of the queried activity', 'Enum', '[]')}
                    {generateTableRow('Accessibility', 'The accessibility of this activity is for the elderly or those with physical disabilities', 'String', '')}
                    {generateTableRow('Type', 'The category this activity falls into', 'Enum', '[]')}
                    {generateTableRow('Participants', 'The number of participants this activity', 'Integer', '1 - n')}
                    {generateTableRow('Link', 'An optional related link', 'String', '')}
                    {generateTableRow('Price', 'A relative price for this activity', 'String', 'Composed of dollar signs')}
                    {generateTableRow('Key', 'A unique activity identifier', 'String', 'Composed of digits')}
                </tbody>
            </table> */}
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
