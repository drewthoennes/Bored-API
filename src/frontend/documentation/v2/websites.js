import React from 'react';
import '@f/documentation/styles';
import c from '@f/constants/documentation';
import {
    generateEndpoint,
    generateTableHeader,
    generateTableRow
} from '@f/utils/documentation';

export default (
    <div className="v2-websites-doc">
        <div className="header-section">
            <h3>Websites</h3>
            <p>The websites API is new to v2 and allows for the querying of random or specified websites, most random and perfect for time wasting. A short description is also included with each response. Although all websites are vetted prior to acceptance, please exercise caution when visiting these webpages.</p>
        </div>

        <div className="fields-section">
            <h3>Fields Explained</h3>
            <p>The websites API currently only has fields necessary for basic API usage. All of the fields one can receive from a request to any of the activity endpoints are outlined below.</p>

            <table className="fields-table">
                <thead>
                    {generateTableHeader('Name', 'Description', 'Value Type', 'Constraints')}
                </thead>
                <tbody>
                    {generateTableRow('URL', 'The website URL', 'String', '')}
                    {generateTableRow('Description', 'A description of the website', 'String', '')}
                    {generateTableRow('Key', 'A unique activity identifier', 'String', '^[1-9]\d{6}$')}
                </tbody>
            </table>
        </div>

        <div className="endpoints-section">
            {generateEndpoint('get', 'Get random website', '/api/v2/websites', c.v2GetRandomWebsite)}
            {generateEndpoint('get', 'Get website by key', '/api/v2/websites/:key', c.v2GetWebsiteByKey)}
        </div>
    </div>
);
