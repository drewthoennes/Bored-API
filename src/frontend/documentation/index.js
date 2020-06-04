import {introductionMap} from './introduction';
import {v1Map} from './v1';
import {v2Map} from './v2';

const map = Object.assign({}, introductionMap, v1Map, v2Map);

// export * from './introduction';
// export * from './v1';
// export * from './v2';

export {
    map
};
