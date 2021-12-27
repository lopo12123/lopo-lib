// region type 1
/**
 * @description grow trees into type 1
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

    for(let i = 0; i < trees.length; i ++) {
        _branchGrow_type1(trees[i], nodeList, idKey, childKey)
    }

    return trees
}
/**
 * @description
 * @param {{id: string, parent?: string, children: any[]}} rootNode
 * @param {{id: string, parent?: string}[]} nodePool
 * @param {string} idKey
 * @param {string} childKey
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
const _getTrees_type2 = () => {

}
const _branchGrow_type2 = (nodePool, edgePool, childKey) => {

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
        _type = 1
        _solved = ori
            .map((node) => {
                // The node that does not exist the 'parent' key will
                // be considered as the root node for parsing, so type 1
                // only filters the nodes that do not exist the id key
                if(!!node[idKey]) return node
                else return null
            })
            .filter((node) => {
                return node !== null
            })
    }
    // flattened in type 2
    else if(!!ori.nodes && !!ori.links) {
        _type = 2
        _solved = {nodes: [], links: []}

        // filter nodes (by 'id')
        for(let i = 0; i < ori.nodes.length; i ++) {
            if(!!ori.nodes[i][idKey]) {
                _solved.nodes.push(ori.nodes[i])
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
        return _getTrees_type2(solved, idKey, childKey)
    }
}


let testArr1 = [
    {id: '1', info: '11', name: 'name1'},
    {id: '2', info: '22', name: 'name2', parent: '1'},
    {id: '3', info: '33', name: 'name3', parent: '2'},
    {id: '4', info: '44', name: 'name4', parent: '2'},
    {id: '5', info: '55', name: 'name5', parent: '4'},
]
let testArr2 = {
    nodes: [
        {id: '1', info: '11'},
        {id: '2', info: '22'},
        {info: '33'}
    ],
    links: [
        {from: '1', to: '2'},
        {from: '1'},
        {to: '2'}
    ]
}

let res = a2t(testArr2)
console.log(JSON.stringify(res))