import React from 'react';
import '@f/documentation/styles';
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
            <p>The riddles API is new to v2 and allows for the querying for random or specific riddles. Queries can also be constrained using the difficulty field.</p>
        </div>

        <div className="fields-section">
            <h3>Fields Explained</h3>
            <p>The riddles API currently has only a few fields, including necessary information and a difficulty field for constraining queries. All of the fields one can receive from a request to any of the activity endpoints are outlined below.</p>

            <table className="fields-table">
                <thead>
                    {generateTableHeader('Name', 'Description', 'Value Type', 'Constraints')}
                </thead>
                <tbody>
                    {generateTableRow('Question', 'The riddle itself', 'String', '')}
                    {generateTableRow('Answer', 'The answer to the riddle', 'String', '')}
                    {generateTableRow('Difficulty', 'A general difficulty rating for the riddle', 'Enum', '["easy", "normal", "hard"]')}
                    {generateTableRow('Source', 'The source URL of the riddle', 'String', '')}
                    {generateTableRow('Key', 'A unique activity identifier', 'String', '^[1-9]\d{6}$')}
                </tbody>
            </table>
        </div>

        <div className="endpoints-section">
            {generateEndpoint('get', 'Get random riddle', '/api/v2/riddles', c.v2GetRandomRiddle)}
            {generateEndpoint('get', 'Get riddle by key', '/api/v2/riddles/:key', c.v2GetRiddleByKey)}
            {generateEndpoint('get', 'Get riddle by difficulty', '/api/v2/riddles?difficulty=:difficulty', c.v2GetRiddleByDifficulty)}
        </div>
    </div>
);
