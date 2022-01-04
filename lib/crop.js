/**
 * @description recursion search
 * @private
 * @param {Object} childTree child tree(search it as root)
 * @param {(Object) => boolean} condition target condition
 * @param {string} childKey the groupName of child nodes(defaults to 'children')
 * @param {boolean} remove tree(remove the 'children') or false(set it as '[]')
 * @return {Object|null}
 */
const _deep = (childTree, condition, childKey, remove) => {
    // find target at root
    if(condition(childTree)) {
        // save the childArray
        const childList = childTree[childKey]

        // if [remove] is [true] - delete it
        if(remove) delete childTree[childKey]

        // if [remove] is [false] - clear it
        else childTree[childKey] = []

        // return the saved childArray
        return childList
    }
    // not found (search in child nodes)
    else {
        // directly return if childKey does not exist on the key map
        if(!childTree[childKey]) return null

        // deep all the child node
        for(let i = 0; i < childTree[childKey].length; i ++) {
            // now childTree[childKey][i] is a new childTree
            let _result = _deep(childTree[childKey][i], condition, childKey, remove)

            // find target in child nodes
            if(!!_result) return _result
        }

        // still not found
        return null
    }
}

/**
 * @description crop all the children from target node
 * @param {Object} tree whole tree
 * @param {(Object) => boolean} condition target condition
 * @param {string} [childKey = 'children'] the groupName of child nodes(defaults to 'children')
 * @param {boolean} [remove = false] tree(delete the 'children' of the targetNode) or false(set it as '[]')(defaults to false)
 * @return {Object[]|null}
 */
const crop = (tree, condition, childKey, remove) => {
    childKey = childKey ? childKey : 'children'
    remove = Boolean(remove)

    return _deep(tree, condition, childKey, remove)
}

module.exports = crop