import React from 'react';
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

        <div className="endpoints-section">
            {generateEndpoint('get', 'Get random fact', '/api/v2/facts', c.v2GetRandomFact)}
            {generateEndpoint('get', 'Get fact by key', '/api/v2/facts/:key', c.v2GetFactByKey)}
        </div>
    </div>
);
