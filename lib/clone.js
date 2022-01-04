/**
 * @description deep clone an object with all its properties and methods
 * @param {any} originInput
 * @return {any}
 */
const clone = (originInput) => {
    // in some situation, we does not need to solve the input value
    if(typeof originInput !== 'object' || originInput === null) return originInput

    // originInput is an array or object
    else {
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