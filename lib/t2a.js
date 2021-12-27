const UUID = require('uuid').v4;

/**
 * @description flatten the tree and store the result into the 'can'
 * @private
 * @param {Object} treeNode
 * @param {string} childKey
 * @param {any[] | {nodes: any[], links: any[]}} can
 * @param {(Object) => boolean} condition
 * @param {(Object) => any} resultFilter
 * @param {1 | 2} type
 * @return {void}
 */
const _deepFlatten = (
    treeNode,
    childKey,
    can,
    condition,
    resultFilter,
    type
) => {
    // if the root node can not meet the condition
    if(!condition(treeNode)) return

    // save the root node (depend on type)
    const _upperNodeId = treeNode.id ? treeNode.id : UUID();

    if(type === 2) {
        can.nodes.push({
            id: _upperNodeId,
            info: resultFilter(treeNode)
        })
    }
    else {
        const  { parent, ...nodeFilterParentId } = treeNode

        can.push({
            id: _upperNodeId,
            parent: parent ? parent : null,
            info: resultFilter(nodeFilterParentId)
        })
    }

    // directly return if the child node does not exist
    if(!treeNode[childKey]) return

    // traverse child nodes
    for(let i = 0; i < treeNode[childKey].length; i ++) {
        // if child node meet the condition, do deep flatten
        // and this node will be push in function '_deepFlatten' as the root node
        if(condition(treeNode[childKey][i])) {
            // [type = 1]: pass the id of parent to child node
            if(type === 1) {
                treeNode[childKey][i].parent = _upperNodeId
            }
            // [type = 2]: just store 'link' into the can ('node' will be stored in the next flatten loop)
            else {
                treeNode[childKey][i].id = treeNode[childKey][i].id ? treeNode[childKey][i].id : UUID()
                can.links.push({
                    from: _upperNodeId,
                    to: treeNode[childKey][i].id
                })
            }

            // deep flat
            _deepFlatten(treeNode[childKey][i], childKey, can, condition, resultFilter, type)
        }
        // if child node do not meet the condition, just push itself and stop deepen
        else {
            // generate an 'id' for child node
            const _childNodeId = treeNode[childKey][i].id ? treeNode[childKey][i].id : UUID()

            if(type === 2) {
                // store in the can
                can.links.push({
                    from: _upperNodeId,
                    to: _childNodeId
                })
                can.nodes.push({
                    id: _childNodeId,
                    info: resultFilter(treeNode[childKey][i])
                })
            }
            else {
                can.push({
                    id: _childNodeId,
                    parent: _upperNodeId,
                    info: resultFilter(treeNode[childKey][i])
                })
            }
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
 * @param {1 | 2} [type = 1] which type of result to return.
 * <br/>`type=1`: return `{id: xx, parent: xx, info: any}[]`
 * <br/>`type=2`: return `{nodes: {id:string, info: any}[], links: {from:xx, to:xx}[]}`
 * @return {{id: string, parent: string, info: any}[] | {nodes: {id: string, info: any}[], links: {from: string, to: string}[]}}
 */
const t2a = (
    tree,
    childKey ,
    condition,
    resultFilter,
    type = 1
) => {
    // make sure the 'childKey'、 'condition' and 'resultFilter'、 'type' exist
    childKey = childKey ? childKey : 'children'
    condition = condition ? condition : (() => {return true})
    resultFilter = resultFilter ? resultFilter : ((n) => {return {...n, [childKey]: []}})

    // create a can (regard the value of 'type' as 1 if it neither 1 nor 2)
    const _can = type === 2 ? {nodes: [], links: []} : []

        // flatten the tree
    _deepFlatten(tree, childKey, _can, condition, resultFilter, type)
    return _can
}

module.exports = t2a