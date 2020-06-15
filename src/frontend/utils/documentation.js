import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLink} from '@fortawesome/free-solid-svg-icons';

function toKebabCase(str) {
    return str.toLowerCase().split(/\ /).filter(part => part && part.length).join('-');
}

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

                <div className="endpoint-anchor column column-center">
                    <a href={`#${anchor}`}>
                        <FontAwesomeIcon icon={faLink}/>
                    </a>
                </div>
            </div>
            <div className="endpoint-url">{endpoint}</div>

            {argTable ? (<table className="args-table">{argTable}</table>) : ''}

            <h5><b>Example</b></h5>
            <div className="endpoint-url">{example.url}</div>

            <h6><b>Response</b></h6>
            <pre className="endpoint-response">{example.response}</pre>
        </div>
    );
}

function generateTableHeader() {
    const columns = Object.entries(arguments).map(data => {
        const argument = data[1];
        return (<th key={`th-${argument}`}>{argument}</th>);
    });

    return (<tr>{columns}</tr>);
}

function generateTableRow() {
    const columns = Object.entries(arguments).map(data => {
        const argument = data[1];
        return (<td key={`th-${argument}`}>{argument}</td>);
    });

    return (<tr>{columns}</tr>);
}

export {
    toKebabCase,
    generateEndpoint,
    generateTableHeader,
    generateTableRow
}
