import React from 'react';
import '@f/documentation/styles';
import c from '@f/constants/documentation';
import {
    generateEndpoint,
    generateTableHeader,
    generateTableRow
} from '@f/utils/documentation';

export default (
    <div className="v2-facts-doc">
        <div className="header-section">
            <h3>Facts</h3>
            <p>The fact endpoint is new to v2, enabling for the querying of a random or specified fact. Each fact also includes a source URL that reinforces its credibility.</p>
        </div>

        <div className="fields-section">
            <h3>Fields Explained</h3>
            <p>The facts API currently only has a few fields that allow for utilization despite its simplicity. All of the fields one can receive from a request to any of the activity endpoints are outlined below.</p>

            <table className="fields-table">
                <thead>
                    {generateTableHeader('Name', 'Description', 'Value Type', 'Constraints')}
                </thead>
                <tbody>
                    {generateTableRow('Fact', 'The fact itself', 'String', '')}
                    {generateTableRow('Source', 'The source URL of the fact', 'String', '')}
                    {generateTableRow('Key', 'A unique activity identifier', 'String', '^[1-9]\d{6}$')}
                </tbody>
            </table>
        </div>

        <div className="endpoints-section">
            {generateEndpoint('get', 'Get random fact', '/api/v2/facts', c.v2GetRandomFact)}
            {generateEndpoint('get', 'Get fact by key', '/api/v2/facts/:key', c.v2GetFactByKey)}
        </div>
    </div>
);
