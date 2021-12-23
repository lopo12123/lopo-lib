const _branchGrow_1 = (treeNode, nodePool, edgePool, childKey) => {

}

const _branchGrow_2 = () => {

}

/**
 * @description 自动判断输入格式并过滤不符合该格式的节点, 返回处理后的数据和类型
 * @description automatically judge the input format and
 * <br/>filter the nodes that do not meet the format,
 * <br/>and return the processed data and type
 * @private
 * @param {{id: string, parent: string, info: any}[] | {nodes: {id: string, info: any}[], links: {from: string, to: string}[]}} ori origin input
 */
const _typeFilter = (ori) => {
    let _solved, _type
    // flattened in type 1
    if(ori instanceof Array) {
        _type = 1
        _solved = ori
            .map((node) => {
                // The node that does not exist the 'parent' key will
                // be considered as the root node for parsing, so type 1
                // only filters the nodes that do not exist the 'id' key
                if(!!node.id) return node
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
            if(!!ori.nodes[i].id) {
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
 * @param {(Object) => boolean} [rootNodeFilter]
 * @param {string} [childKey = 'children']\
 * @return {{[k: string]: string, id: string, info: any, children: Object[]}[]}
 */
const a2t = (
    flattenedArray,
    rootNodeFilter,
    childKey,
) => {
    const { solved, type } = _typeFilter(flattenedArray)

    console.log(solved, type)
}


let testArr1 = [
    {id: '1', info: '11'},
    {id: '2', info: '22'},
    {id: '3', info: '33'},
    {id: '4', info: '44'},
    {info: '55'},
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

a2t(testArr2)