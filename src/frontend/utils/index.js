function toKebabCase(str) {
    return str.toLowerCase().split(/\ /).filter(part => part && part.length).join('-');
}

export {
    toKebabCase
};
