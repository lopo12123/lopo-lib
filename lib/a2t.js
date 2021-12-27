// region type 1
/**
 * @description grow trees in type 1
 * @param {{[k: string]: any, id: string, parent: string}[]} nodeList array of nodes
 * @param {string} idKey key of 'id'
 * @param {string} childKey key of 'children'
 * @private
 */
const _getTrees_type1 = (nodeList, idKey, childKey) => {
    // create a container to store all trees
    const trees = []

    // first: find out all the root nodes(nodes that do not have 'parent' key or its value is 'null')
    for(let i = 0; i < nodeList.length; i ++) {
        if(!nodeList[i].parent) {
            const {parent, ...rest} = nodeList[i]
            trees.push({
                ...rest,
                [childKey]: []
            })
        }
    }

    // second: grow up all the trees from root
    for(let i = 0; i < trees.length; i ++) {
        _branchGrow_type1(trees[i], nodeList, idKey, childKey)
    }

    return trees
}
/**
 * @description
 * @param {{id: string, parent?: string, children: any[]}} rootNode thie node
 * @param {{id: string, parent?: string}[]} nodePool array of nodes
 * @param {string} idKey key of 'id'
 * @param {string} childKey key of 'children'
 * @private
 */
const _branchGrow_type1 = (rootNode, nodePool, idKey, childKey) => {
    // find all the child node(s) and store them
    for(let i = 0; i < nodePool.length; i ++) {
        if(nodePool[i].parent === rootNode[idKey]) {
            const {parent, ...rest} = nodePool[i]
            rootNode[childKey].push({
                ...rest,
                [childKey]: []
            })
            _branchGrow_type1(rootNode[childKey][(rootNode[childKey].length - 1)], nodePool, idKey, childKey)
        }
    }
}
// endregion

// region type 2
/**
 * @description grow trees in type 2
 * @param {{id: string, info: any}[]} nodePool array of nodes
 * @param {{from: string, to: string}[]} linkPool array of links
 * @param {string} idKey key of 'id'
 * @param {string} childKey key of 'children'
 * @private
 */
const _getTrees_type2 = (nodePool, linkPool, idKey, childKey) => {
    const trees = []

    // first: find out all the root nodes(nodes that do not have 'to' point to)
    for(let i = 0; i < nodePool.length; i ++) {
        let ifRoot = !Boolean(linkPool.find((link) => {
            return link.to === nodePool[i][idKey]
        }))
        if(ifRoot) {
            trees.push({
                ...nodePool[i],
                [childKey]: []
            })
        }
    }

    // second: grow up all the trees from root
    for(let i = 0; i < trees.length; i ++) {
        _branchGrow_type2(trees[i], nodePool, linkPool, idKey, childKey)
    }

    return trees
}
/**
 * @description
 * @param {{id: string, parent?: string, children: any[]}} rootNode this node
 * @param {{id: string, info: any}[]} nodePool array of nodes
 * @param {{from: string, to: string}[]} linkPool array of links
 * @param {string} idKey key of 'id'
 * @param {string} childKey key of 'children'
 * @private
 */
const _branchGrow_type2 = (rootNode, nodePool, linkPool, idKey, childKey) => {
    // find all the child node(s) and store them
    for(let i = 0; i < linkPool.length; i ++) {
        if(linkPool[i].from === rootNode[idKey]) {
            const _childNode = nodePool.find((item) => {
                return item[idKey] === linkPool[i].to
            })
            if(_childNode) {
                rootNode.children.push({
                    ..._childNode,
                    [childKey]: []
                })
                _branchGrow_type2(rootNode[childKey][rootNode[childKey].length - 1], nodePool, linkPool, idKey, childKey)
            }
        }
    }
}
// endregion

/**
 * @description 自动判断输入格式并过滤不符合该格式的节点, 返回处理后的数据和类型
 * @description automatically judge the input format and
 * <br/>filter the nodes that do not meet the format,
 * <br/>and return the processed data and type
 * @private
 * @param {{id: string, parent: string, info: any}[] | {nodes: {id: string, info: any}[], links: {from: string, to: string}[]}} ori origin input
 * @param {string} idKey the key that indicate node`s 'id'
 * @return {{solved: {[k: string]: any, id: string, parent: string}[] | {nodes: {id: string, info: any}[], links: {from: string, to: string}[]}, type: 1 | 2}}
 */
const _typeFilter = (ori, idKey) => {
    let _solved, _type
    // flattened in type 1
    if(ori instanceof Array) {
        // filter the duplicate 'id' (it will ignore all the nodes whose 'id' has appeared before)
        const _ids = []

        _type = 1
        _solved = ori
            .map((node) => {
                // The node that does not exist the 'parent' key will
                // be considered as the root node for parsing, so type 1
                // only filters the nodes that do not exist the id key
                // and has duplicate 'id'.

                if(!node[idKey] || node[idKey].trim() === '') return null  // no 'id' exist or 'id' === ''
                else if(_ids.includes(node[idKey])) return null  // duplicate 'id'
                else {
                    _ids.push(node[idKey])
                    return node
                }
            })
            .filter((node) => {
                return node !== null
            })
    }
    // flattened in type 2
    else if(!!ori.nodes && !!ori.links) {
        // filter the duplicate 'id' (it will ignore all the nodes whose 'id' has appeared before)
        const _ids = []

        _type = 2
        _solved = {nodes: [], links: []}

        // filter nodes (by 'id')
        for(let i = 0; i < ori.nodes.length; i ++) {
            if(!!ori.nodes[i][idKey] && !_ids.includes(ori.nodes[i][idKey])) {
                _solved.nodes.push(ori.nodes[i])
                _ids.push(ori.nodes[i][idKey])
            }
        }
        // filter links (by 'from' and 'to')
        for(let j = 0; j < ori.links.length; j ++) {
            if(!!ori.links[j].from && !!ori.links[j].to) {
                _solved.links.push(ori.links[j])
            }
        }
    }

    return { solved: _solved, type: _type }
}

/**
 * @description array to tree(s)
 * @description use the nodes and links in the pool to grow a tree(or trees if any)
 * <br/>return `[tree]` if there is only one tree
 * <br/>return `[tree1, tree2, ...]` if there have several trees
 * @param {{id: string, info: any, parent?: string}[] | {nodes: {id: string, info: any}[], links: {from: string, to: string}[]}} flattenedArray
 * @param {string} [idKey = 'id] the key that indicate node`s 'id'
 * @param {string} [childKey = 'children'] the key to store node`s 'children'
 * @return {{[k: string]: any, id: string, children: Object[]}[]}
 */
const a2t = (
    flattenedArray,
    idKey,
    childKey,
) => {
    // make sure the 'idKey' and 'childKey' exist
    idKey = idKey ? idKey : 'id'
    childKey = childKey ? childKey : 'children'

    // analyze the input original array to return its type and filter out unformatted nodes
    const { solved, type } = _typeFilter(flattenedArray, idKey)

    if(type === 1) {
        return _getTrees_type1(solved, idKey, childKey)
    }
    else if(type === 2) {
        return _getTrees_type2(solved.nodes, solved.links, idKey, childKey)
    }
}

module.exports = a2t