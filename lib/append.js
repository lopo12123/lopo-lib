/**
 * @description append some nodes to the target node
 * @private
 * @param {Object} childTree child tree(search it as root)
 * @param {(Object) => boolean} condition target condition
 * @param {Object[]} nodes nodes to be appended
 * @param {string} childKey the groupName of child nodes(defaults to 'children')
 * @param {boolean} clearBeforeAdd if clear the children of targetNode before append
 * @return {boolean}
 */
const _deep = (childTree, condition, nodes, childKey, clearBeforeAdd) => {
    // find target at root
    if(condition(childTree)) {
        // clear (or 'children' is undefined)
        if(clearBeforeAdd || !childTree[childKey]) childTree[childKey] = nodes

        // just append
        else childTree[childKey].push(...nodes)

        // return true
        return true
    }
    // not found (search in child nodes)
    else {
        // directly return if childKey does not exist on the key map
        if(!childTree[childKey]) return false

        // deep all the child node
        for(let i = 0; i < childTree[childKey].length; i ++) {
            let _result = _deep(childTree[childKey][i], condition, nodes, childKey, clearBeforeAdd)

            // find target in child node
            if(!!_result) return true
        }

        // still not found
        return false
    }
}

/**
 * @description append some nodes to the target node
 * @param {Object} tree child tree(search it as root)
 * @param {(Object) => boolean} condition target condition
 * @param {Object[]} nodes nodes to be appended
 * @param {string} [childKey = 'children'] the groupName of child nodes(defaults to 'children')
 * @param {boolean} [clearBeforeAdd = false] if clear the children of targetNode before append
 * @return {boolean}
 */
const append = (tree, condition, nodes, childKey, clearBeforeAdd) => {
    childKey = childKey ? childKey : 'children'
    clearBeforeAdd = Boolean(clearBeforeAdd)

    return _deep(tree, condition, nodes, childKey, clearBeforeAdd)
}

module.exports = append