/**
 * @description clone an object、array or anything else
 */
export default class Clone {
    /**
     * @description [plain] these wil be lost:
     * <br/>[1]methods on objects;
     * <br/>[2]key is in type 'Symbol';
     * <br/>[3]some else ...
     */
    static plain = <T>(o: T): T => {
        return JSON.parse(JSON.stringify(o))
    }

    /**
     * @description [deep] all params and methods will be cloned
     */
    static deep = <T extends any>(o: T): T => {
        // in some situation, we does not need to solve the input value
        if(o === null) return o

        switch (typeof o) {
            // we can simply return the input value if it is some simple type
            case "bigint":
            case "boolean":
            case "number":
            case "string":
            case "undefined":
                return o
            // we can use this or 'eval' to clone a function
            case "function":
                return new Function('return ' + o.toString())()
            // now do the deep clone work
            case "object":
                // array
                if(Array.isArray(o)) {
                    const _o: any[] = []
                    for(let i = 0; i < o.length; i ++) {
                        _o.push(o[i])
                    }
                    return _o as T
                }
                // object
                else {
                    const _o: any = {}
                    const _keys = Reflect.ownKeys(o as object)
                    for(let i = 0; i < _keys.length; i ++) {
                        _o[_keys[i]] = Clone.deep(Reflect.get(o as object, _keys[i]))
                    }
                    return _o
                }
            case "symbol":
                throw new Error('Symbol can not be cloned')
            default:
                throw new Error('UnKnown Error')
        }
    }
}
