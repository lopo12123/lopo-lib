/**
 * @description flatten the tree and store the result into the 'can'
 * @private
 * @param {Object} treeNode
 * @param {string} childKey
 * @param {any[]} can
 * @param {(Object) => boolean} condition
 * @param {(Object) => any} resultFilter
 * @return {void}
 */
const _deepFlatten = (treeNode, childKey, can, condition, resultFilter) => {
    // if the root node can not meet the condition
    if(!condition(treeNode)) return

    // save the root node
    can.push(resultFilter(treeNode))

    // directly return if the child node does not exist
    if(!treeNode[childKey]) return

    // traverse child nodes
    for(let i = 0; i < treeNode[childKey].length; i ++) {
        // if child node meet the condition, do deep flatten
        // and this node will be push in function '_deepFlatten' as the root node
        if(condition(treeNode[childKey][i])) {
            _deepFlatten(treeNode[childKey][i], childKey, can, condition, resultFilter)
        }
        // if child node do not meet the condition, just push itself and stop deepen
        else {
            can.push(resultFilter(treeNode[childKey][i]))
        }
    }
}

/**
 * @description tree to array
 * @description flatten the tree structure object
 * into an array with condition (if any).
 * @param {Object} tree whole tree
 * @param {string} [childKey = 'children'] The key name of the key that stores the subtree
 * @param {(Object) => boolean} [condition] deepen condition
 * @param {(Object) => any} [resultFilter] what to return(return the whole node when undefined)
 * @return {any[]}
 */
const t2a = (tree, childKey = 'children', condition, resultFilter) => {
    // create a can
    const _can = []

    // make sure the function 'childKey'、 'condition' and 'resultFilter' exist
    childKey = childKey ? childKey : 'children'
    condition = condition ? condition : (() => {return true})
    resultFilter = resultFilter ? resultFilter : ((n) => {return n})

    // flatten the tree
    _deepFlatten(tree, childKey, _can, condition, resultFilter)
    return _can
}

module.exports = t2a