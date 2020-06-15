import {
    toKebabCase,
    generateEndpoint,
    generateTableHeader,
    generateTableRow
} from './documentation';

function capitalize(string) {
    if (!string || string.length === 0) return "";

    return string.charAt(0).toUpperCase() + string.substr(1);
}

export {
    toKebabCase,
    generateEndpoint,
    generateTableHeader,
    generateTableRow,
    capitalize
};
