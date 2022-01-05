/**
 * @description deep clone an object with all its properties and methods
 * @param {any} originInput
 * @param {boolean} [withFn = true]
 * @return {any}
 */
const clone = (originInput, withFn = true) => {
    // in some situation, we does not need to solve the input value
    if(typeof originInput !== 'object' || originInput === null) return originInput

    // originInput is an array or object
    else {
        // 'withFn' is false - just use JSON.parse and JSON.stringify to clone an object
        if(!withFn) return JSON.parse(JSON.stringify(originInput))

        // 'withFn' is true - search all the properties and methods on the object and clone them
        let item

        // array
        if(Array.isArray(originInput)) item = []

        // object
        else item = {}

        // copy all the properties and methods
        for(let k in originInput) {
            if(Object.prototype.hasOwnProperty.call(originInput, k)) {
                item[k] = clone(originInput[k])
            }
        }

        // return the cloned item
        return item
    }
}

module.exports = clone