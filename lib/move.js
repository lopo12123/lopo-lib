/**
 * @description reuse the [dfs]
 * @private
 */
const _dfs = require('./dfs.js')

/**
 * @description already have the pointer of target, now all the thing to do is finding the source and attach it to the target node
 * @private
 * @param {Object} childTree child tree(search it as root)
 * @param {(Object) => boolean} sourceCondition source condition
 * @param {Object} targetP the pointer of target node
 * @param {string} childKey the groupName of child nodes(defaults to 'children')
 * @return {boolean|null}
 */
const _deep = (childTree, sourceCondition, targetP, childKey) => {
    // find target at root
    if(sourceCondition(childTree)) {
        // add 'children' if does not exist
        if(!targetP[childKey]) targetP[childKey] = []

        // attach to target node
        targetP[childKey].push(childTree)

        // return if the source node is cut
        return false
    }

    // not found (search in child nodes)
    else {
        // directly return if childKey does not exist on the key map
        if(!childTree[childKey]) return null

        // deep all the child node
        for(let i = 0; i < childTree[childKey].length; i ++) {
            // now childTree[childKey][i] is a new childTree
            let _result = _deep(childTree[childKey][i], sourceCondition, targetP, childKey)

            // find target in child nodes
            if(_result !== null) {
                // if not splice, splice it
                if(!_result) childTree[childKey].splice(i, 1)

                // else, just return the result
                return true
            }
        }

        // still not found
        return null
    }
}

/**
 * @description cut the source node as a branch and attach it to the target node (as a child node)
 * @param {Object} tree whole tree
 * @param {(Object) => boolean} sourceCondition source condition
 * @param {(Object) => boolean} targetCondition target condition
 * @param {string} [childKey = 'children'] the groupName of child nodes(defaults to 'children')
 * @return {[boolean, string]}
 */
const move = (tree, sourceCondition, targetCondition, childKey) => {
    // firstly find two nodes (with children not clear)
    const source = _dfs(tree, sourceCondition, childKey, item => item)
    const target = _dfs(tree, targetCondition, childKey, item => item)

    // directly return cause [source node] or [target node] does not exist on the tree
    if(source === null || target === null) return [false, '[source node] or [target node] does not exist on the tree']

    // directly return cause [target node] is on a branch of [source node]
    else if(_dfs(source, targetCondition, childKey, item => item) !== null) return [false, '[target node] is on a branch of [source node]']

    // [source] and [target] is on different branch, we can do move now
    else {
        childKey = childKey ? childKey : 'children'
        const _result = _deep(tree, sourceCondition, target, childKey)

        return _result === null
            ? [false, '[source node] does not exist on the tree']
            : [true, 'success']
    }
}

module.exports = move