import React from 'react';
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
            <p></p>
        </div>

        <div className="endpoints-section">
            {generateEndpoint('get', 'Get random website', '/api/v2/websites', c.v2GetRandomWebsite)}
            {generateEndpoint('get', 'Get website by key', '/api/v2/websites/:key', c.v2GetWebsiteByKey)}
        </div>
    </div>
);
