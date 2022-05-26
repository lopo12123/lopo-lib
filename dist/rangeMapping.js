"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangeMapping = void 0;
function rangeMapping(from, to, val) {
    if (val !== undefined) {
        return (val - from[0]) * (to[1] - to[0]) / (from[1] - from[0]) + to[0];
    }
    else {
        return (x) => {
            return (x - from[0]) * (to[1] - to[0]) / (from[1] - from[0]) + to[0];
        };
    }
}
exports.rangeMapping = rangeMapping;
