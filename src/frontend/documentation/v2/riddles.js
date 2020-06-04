import React from 'react';
import c from '@f/constants/documentation';
import {
    generateEndpoint,
    generateTableHeader,
    generateTableRow
} from '@f/utils/documentation';

export default (
    <div className="v2-riddles-doc">
        <div className="header-section">
            <h3>Riddles</h3>
            <p></p>
        </div>

        <div className="endpoints-section">
            {generateEndpoint('get', 'Get random riddle', '/api/v2/riddles', c.v2GetRandomRiddle)}
            {generateEndpoint('get', 'Get riddle by key', '/api/v2/riddles/:key', c.v2GetRiddleByKey)}
            {generateEndpoint('get', 'Get riddle by difficulty', '/api/v2/riddles?difficulty=:difficulty', c.v2GetRiddleByDifficulty)}
        </div>
    </div>
);
