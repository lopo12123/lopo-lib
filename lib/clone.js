/**
 * @description deep clone an object with all its properties and methods
 * @param {any} originObj
 * @return {any}
 */
const clone = (originObj) => {
    // in some situation, we does not need to solve the input value
    if(typeof originObj !== 'object' || originObj === null) return originObj

    // originObj is an array or object
    else {
        let item

        // array
        if(Array.isArray(originObj)) item = []

        // object
        else item = {}

        // copy all the properties and methods
        for(let k in originObj) {
            if(Object.prototype.hasOwnProperty.call(originObj, k)) {
                item[k] = clone(originObj[k])
            }
        }

        // return the cloned item
        return item
    }
}

module.exports = clone