import React from 'react';
import '@f/documentation/styles';
import c from '@f/constants/documentation';
import {
    generateEndpoint,
    generateTableHeader,
    generateTableRow
} from '@f/utils/documentation';

export default (
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
