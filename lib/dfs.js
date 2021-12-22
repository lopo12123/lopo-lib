/**
 * @description recursion search
 * @private
 * @param {Object} childTree child tree(search it as root)
 * @param {(Object) => boolean} condition target condition
 * @param {string} childKey the groupName of child nodes(defaults to 'children')
 * @param {string|Function|undefined} resultFilter what to return(return the whole node when undefined)
 * @return {Object|null}
 */
const _deep = (childTree, condition, childKey, resultFilter) => {
    // find target at root
    if(condition(childTree)) {
        // if [resultFilter] is [undefined] - directly return
        if(resultFilter === undefined) return childTree

        // if [resultFilter] is a [string] - key
        if(typeof resultFilter === 'string') return childTree[resultFilter]

        // if [resultFilter] is a [function] - filter
        if(typeof resultFilter === 'function') return resultFilter(childTree)

        // else
        return null
    }
    // not found (search in child nodes)
    else {
        // directly return if childKey does not exist on the key map
        if(!childTree[childKey]) return null

        // deep all the child node
        for(let i = 0; i < childTree[childKey].length; i ++) {
            // now childTree[childKey][i] is a new childTree
            let _result = _deep(childTree[childKey][i], condition, childKey, resultFilter)

            // find target in child nodes
            if(!!_result) return _result
        }

        // still not found
        return null
    }
}

/**
 * @description depth first search
 * @param {Object} tree whole tree
 * @param {(Object) => boolean} condition target condition
 * @param {string|undefined} childKey the groupName of child nodes(defaults to 'children')
 * @param {string|Function|undefined} resultFilter what to return(return the whole node when undefined)
 */
const dfs = (tree, condition, childKey = 'children', resultFilter = undefined) => {
    let _result = _deep(tree, condition, childKey, resultFilter)
    return _result ? _result : null
}

module.exports = dfs