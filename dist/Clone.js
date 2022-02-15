"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clone = void 0;
/**
 * @description clone an object、array or anything else
 */
var Clone = /** @class */ (function () {
    function Clone() {
    }
    /**
     * @description [plain] these wil be lost:
     * <br/>[1]methods on objects;
     * <br/>[2]key is in type 'Symbol';
     * <br/>[3]some else ...
     */
    Clone.plain = function (o) {
        return JSON.parse(JSON.stringify(o));
    };
    /**
     * @description [deep] all params and methods will be cloned
     */
    Clone.deep = function (o) {
        // in some situation, we does not need to solve the input value
        if (o === null)
            return o;
        switch (typeof o) {
            // we can simply return the input value if it is some simple type
            case "bigint":
            case "boolean":
            case "number":
            case "string":
            case "undefined":
                return o;
            // we can use this or 'eval' to clone a function
            case "function":
                return new Function('return ' + o.toString())();
            // now do the deep clone work
            case "object":
                // array
                if (Array.isArray(o)) {
                    var _o = [];
                    for (var i = 0; i < o.length; i++) {
                        _o.push(o[i]);
                    }
                    return _o;
                }
                // object
                else {
                    var _o = {};
                    var _keys = Reflect.ownKeys(o);
                    for (var i = 0; i < _keys.length; i++) {
                        _o[_keys[i]] = Clone.deep(Reflect.get(o, _keys[i]));
                    }
                    return _o;
                }
            case "symbol":
                throw new Error('Symbol can not be cloned');
            default:
                throw new Error('UnKnown Error');
        }
    };
    return Clone;
}());
exports.Clone = Clone;
