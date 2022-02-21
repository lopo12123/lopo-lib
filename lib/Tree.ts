import { v4 as UUID } from "uuid"

/**
 * @description tree operation
 */
export class Tree {
    // region FlatArray
    /**
     * @description [Tree_FlatArray] trans from `parent-keyed` to `child-keyed`
     */
    public static TransKeyed_P2C(ori: Tree_FlatArray_PKeyed): Tree_FlatArray_CKeyed {
        // result tree array
        const resultTree: Tree_FlatArray_CKeyed = []
        // solve all the nodes in `ori`
        ori.forEach((node) => {
            // generate the new node
            const newNode: Tree_FlatArray_CKeyed_Node = {
                ...node,
                children: [],
                extData: node.extData
            }
            // delete the extra param
            delete newNode.parent
            // find all child nodes in `ori`
            ori.forEach((_child) => {
                if(node.id === _child.parent) {
                    newNode.children!.push(_child.id)
                }
            })
            // delete the `children` param if it is empty
            if(newNode.children && newNode.children.length === 0) delete newNode.children
            // add the new node to the resultTree
            resultTree.push(newNode)
        })
        return resultTree
    }
    /**
     * @description [Tree_FlatArray] trans from `children-keyed` to `parent-keyed`
     */
    public static TransKeyed_C2P(ori: Tree_FlatArray_CKeyed): Tree_FlatArray_PKeyed {
        // result tree array
        const resultTree: Tree_FlatArray_PKeyed = []
        // solve all the nodes in `ori`
        ori.forEach((node) => {
            // generate the new node
            const newNode: Tree_FlatArray_PKeyed_Node = {
                ...node,
                parent: '',
                extData: node.extData
            }
            // delete the extra param
            delete newNode.children
            // find all child nodes in `ori`
            ori.forEach((_parent) => {
                if(_parent.children && _parent.children.includes(node.id)) {
                    newNode.parent = _parent.id
                }
            })
            // delete the `parent` param if it is empty
            if((newNode.parent!== undefined) && (newNode.parent === '')) {
                delete newNode.parent
            }
            // add the new node to the resultTree
            resultTree.push(newNode)
        })
        return resultTree
    }
    // endregion

    // region Multilayer to FlatArray
    /** Multilayer to FlatArray (with parent keyed) */
    private static _Multilayer2FlatArray_PKeyed(ori: Tree_Multilayer, container: Tree_FlatArray_PKeyed, pid?: string): void {
        // store this node`s id
        const _thisId = ori.id ?? UUID()
        // generate this node
        const _thisNode: Tree_FlatArray_PKeyed_Node = {
            ...ori,
            id: _thisId,
            extData: ori.extData
        }
        // delete the `children` field
        delete _thisNode.children
        // set parent`s id
        if(!!pid) _thisNode.parent = pid
        // store this node
        container.push(_thisNode)
        // deepen
        ori.children?.forEach((sTree) => {
            Tree._Multilayer2FlatArray_PKeyed(sTree, container, _thisId)
        })
    }
    /** Multilayer to FlatArray (with children keyed) */
    private static _Multilayer2FlatArray_CKeyed(ori: Tree_Multilayer, container: Tree_FlatArray_CKeyed, pid?: string): void {
        // store this node`s id
        const _thisId = ori.id ?? UUID()
        // generate this node
        const _thisNode: Tree_FlatArray_CKeyed_Node = {
            ...ori as Omit<Tree_Multilayer, 'children'>,
            id: _thisId,
            extData: ori.extData
        }
        // attach this node`s id into this parent`s `children` field
        if(!!pid) container.forEach((item, index, arr) => {
            if(item.id === pid) arr[index].children?.push(_thisId)
        })
        // reset the value of key`children`
        _thisNode.children = []
        // store this node
        container.push(_thisNode)
        // deepen
        ori.children?.forEach((sTree) => {
            Tree._Multilayer2FlatArray_CKeyed(sTree, container, _thisId)
        })
    }
    public static Multilayer2FlatArray(ori: Tree_Multilayer, keyed: 'parent'): Tree_FlatArray_PKeyed
    public static Multilayer2FlatArray(ori: Tree_Multilayer, keyed: 'children'): Tree_FlatArray_CKeyed
    /**
     * @description trans tree from `Multilayer` to `FlatArray`.
     * <br/><b>·</b> if there is no `id` on the node, it will add an `id` for this node automatically.
     */
    public static Multilayer2FlatArray(ori: Tree_Multilayer, keyed: 'parent' | 'children'): Tree_FlatArray_PKeyed | Tree_FlatArray_CKeyed {
        const can: Tree_FlatArray_PKeyed | Tree_FlatArray_CKeyed = []
        if(keyed === 'parent') Tree._Multilayer2FlatArray_PKeyed(ori, can)
        else if(keyed === 'children') Tree._Multilayer2FlatArray_CKeyed(ori, can)
        return can
    }
    // endregion

    // region FlatArray to Multilayer
    /** FlatArray (with parent keyed) to Multilayer */
    private static _FlatArray2Multilayer_PKeyed(ori: Tree_FlatArray_PKeyed, root?: Tree_Multilayer) {
        if(!root) {
            // find the root of the tree
            const rootNode = (ori as Tree_FlatArray_CKeyed).find((_rootNode) => {
                const ifChild = ori.find((_node) => {
                    return !!_node.children && _node.children.includes(_rootNode.id)
                })
                return !ifChild
            })
            // if there is no node can be `root`, return `null` directly
            if(!rootNode) return null
            // generate this node
            root = {
                ...rootNode as Omit<Tree_FlatArray_PKeyed_Node, 'parent'>,
                id: rootNode.id,
                children: [],
                extData: rootNode.extData
            }
            // build its branches
            ori.forEach((node) => {
                if(node.parent === root!.id) {
                    // generate this branch
                    const _branch: Tree_Multilayer = {
                        ...node,
                        children: [],
                        extData: node.extData
                    }
                    // delete the origin node`s `parent` param
                    delete _branch.parent
                    // build this branch
                    Tree._FlatArray2Multilayer_PKeyed(ori, _branch)
                    // attach this branch
                    root!.children!.push(_branch)
                }
            })
            // delete the `children` param if it is empty
            if(root.children && root.children.length === 0) delete root.children
            return root
        }
        else {
            ori.forEach((node) => {
                // generate this branch
                if(node.parent === root!.id) {
                    const _branch: Tree_Multilayer = {
                        ...node,
                        children: [],
                        extData: node.extData
                    }
                    // delete the origin node`s `parent` param
                    delete _branch.parent
                    // build this branch
                    Tree._FlatArray2Multilayer_PKeyed(ori, _branch)
                    // attach this branch
                    root!.children!.push(_branch)
                }
            })
            // delete the `children` param if it is empty
            if(root.children && root.children.length === 0) delete root.children
            return root
        }
    }
    /** FlatArray (with children keyed) to Multilayer */
    private static _FlatArray2Multilayer_CKeyed(ori: Tree_FlatArray_CKeyed, root?: Tree_Multilayer, childIds?: string[]) {
        if(!root) {
            // find the root of the tree
            const rootNode = (ori as Tree_FlatArray_CKeyed).find((_rootNode) => {
                const ifChild = ori.find((_node) => {
                    return !!_node.children && _node.children.includes(_rootNode.id)
                })
                return !ifChild
            })
            // if there is no node can be `root`, return `null` directly
            if(!rootNode) return null
            // generate this node
            root = {
                ...rootNode as Omit<Tree_FlatArray_CKeyed_Node, 'children'>,
                id: rootNode.id,
                children: [],
                extData: rootNode.extData
            }
            // attach its branches
            Tree._FlatArray2Multilayer_CKeyed(ori, root, rootNode.children)
            // delete the `children` param if it is empty
            if(root.children && root.children.length === 0) delete root.children
            return root
        }
        else {
            if(!!childIds && childIds.length > 0) {
                // reset the `children` param
                root.children = []
                // query every branch
                childIds.forEach((childId) => {
                    // query this branch
                    const _branchNode = ori.find((node) => {
                        return childId === node.id
                    })
                    // if the branch node exist
                    if(!!_branchNode) {
                        const _branch: Tree_Multilayer = {
                            ..._branchNode,
                            children: [],
                            extData: _branchNode.extData
                        }
                        Tree._FlatArray2Multilayer_CKeyed(ori, _branch, _branchNode.children)
                        root!.children!.push(_branch)
                    }
                })
                if(root.children.length === 0) delete root.children
            }
            // directly return the root if it has no child
            return root
        }
    }
    public static FlatArray2Multilayer(ori: Tree_FlatArray_PKeyed, keyed: 'parent'): Tree_Multilayer
    public static FlatArray2Multilayer(ori: Tree_FlatArray_CKeyed, keyed: 'children'): Tree_Multilayer
    /**
     * @description trans tree from `FlatArray` to `Multilayer`.
     * <br/><b>·</b> it will try to find a node with no `parent` field (or `parent` with value `null` or `undefined`) as the root node, and build the tree on this node.
     * <br/><b>·</b> if there are multiple nodes that meet the conditions in `ori`, it will only take the first one as the root node and start building the tree directly, the rest of the nodes will be ignored.
     */
    public static FlatArray2Multilayer(ori: Tree_FlatArray_PKeyed | Tree_FlatArray_CKeyed, keyed: 'parent' | 'children'): Tree_Multilayer | null {
        if(keyed === 'parent') return Tree._FlatArray2Multilayer_PKeyed(ori)
        else if(keyed === 'children') return Tree._FlatArray2Multilayer_CKeyed(ori)
        else return null
    }
    // endregion

    // region Multilayer to NodeLink
    /** Multilayer to NodeLink */
    private static _Multilayer2NodeLink(ori: Tree_Multilayer, container: Tree_NodeLink, pid?: string): void {
        // store this node`s id
        const _thisId = ori.id ?? UUID()
        // generate this node
        const _thisNode: Tree_NodeLink_Node = {
            ...ori,
            id: _thisId,
            extData: ori.extData
        }
        // delete the `children` field
        delete _thisNode.children
        // store this node
        container.nodes.push(_thisNode)
        // store this link
        if(!!pid) container.links.push({
            id: UUID(),
            from: pid,
            to: _thisId,
        })
        // deepen
        ori.children?.forEach((sTree) => {
            Tree._Multilayer2NodeLink(sTree, container, _thisId)
        })
    }
    /**
     * @description trans tree from `Multilayer` to `NodeLink`.
     * <br/><b>·</b> if there is no `id` on the node, it will add an `id` for this node automatically.
     */
    public static Multilayer2NodeLink(ori: Tree_Multilayer) {
        const can: Tree_NodeLink = { nodes: [], links: [] }
        Tree._Multilayer2NodeLink(ori, can)
        return can
    }
    // endregion

    // region NodeLink to Multilayer
    /** NodeLink to Multilayer */
    private static _NodeLink2Multilayer(nodes: Tree_NodeLink_Node[], links: Tree_NodeLink_Link[], root: Tree_Multilayer) {
        // search all the links whose `from` equals `root.id`
        links.forEach((link) => {
            if(link.from === root.id) {
                // find the node on the other side
                nodes.forEach((node) => {
                    if(node.id === link.to) {
                        // set `children` if undefined
                        if(!root.children) root.children = []
                        // push the child root and deepen on it
                        const sRoot: Tree_Multilayer = {
                            ...node,
                            extData: node.extData
                        }
                        Tree._NodeLink2Multilayer(nodes, links, sRoot)
                        root.children.push(sRoot)
                    }
                })
            }
        })
    }
    /**
     * @description trans tree from `NodeLink` to `Multilayer`
     * <br/><b>·</b> it will try to find a node that is not pointed to by the `to` of any of the `ori.links` as the root node, and build the tree on this node.
     * <br/><b>·</b> if there are multiple nodes that meet the conditions in `ori.nodes`, it will only take the first one as the root node and start building the tree directly, the rest of the nodes will be ignored.
     * <br/><b>·</b> if there are some nodes in `ori.nodes` that are not connected to other nodes, these nodes will be ignored.
     */
    public static NodeLink2Multilayer(ori: Tree_NodeLink): Tree_Multilayer | null {
        // get nodes and links
        const { nodes, links } = ori
        // do filter job (filter out single nodes and links)
        const filteredNodes = nodes.filter((node) => {
            const ifLinked = links.find((link) => {
                return (link.from === node.id) || (link.to === node.id)
            })
            return Boolean(ifLinked)
        })
        const filteredLinks = links.filter((link) => {
            const ifNoded = nodes.find((node) => {
                return (link.from === node.id) || (link.to === node.id)
            })
            return Boolean(ifNoded)
        })
        // find the root of the tree
        const rootNode = filteredNodes.find((node) => {
            const ifPointed = filteredLinks.find((link) => {
                return link.to === node.id
            })
            return Boolean(!ifPointed)
        })
        // return if there has no root node
        if(!rootNode) return null
        // generate the root of tree
        const treeRoot: Tree_Multilayer = {
            ...rootNode,
            extData: rootNode.extData
        }
        // build the tree
        Tree._NodeLink2Multilayer(nodes, links, treeRoot)

        return treeRoot
    }
    // endregion

    // region FlatArray to NodeLink
    /** FlatArray (with parent keyed) to NodeLink */
    private static _FlatArray2NodeLink_PKeyed(ori: Tree_FlatArray_PKeyed, container: Tree_NodeLink) {
        // solve every node in `ori`
        ori.forEach((node) => {
            // generate the new node
            const newNode: Tree_NodeLink_Node = {
                ...node,
                extData: node.extData
            }
            // delete the origin param `parent`
            delete newNode.parent
            // add node
            container.nodes.push(newNode)
            // add link(s)
            ori.forEach((_others) => {
                if(_others.parent === node.id) {
                    container.links.push({
                        id: UUID(),
                        from: node.id,
                        to: _others.id
                    })
                }
            })
        })
    }
    /** FlatArray (with children keyed) to NodeLink */
    private static _FlatArray2NodeLink_CKeyed(ori: Tree_FlatArray_CKeyed, container: Tree_NodeLink) {
        // solve every node in `ori`
        ori.forEach((node) => {
            // generate the new node
            const newNode: Tree_NodeLink_Node = {
                ...node,
                extData: node.extData
            }
            // delete the origin param `children`
            delete newNode.children
            // add node
            container.nodes.push(newNode)
            // add link(s)
            ori.forEach((_others) => {
                if(_others.children && _others.children.includes(node.id)) {
                    container.links.push({
                        id: UUID(),
                        from: _others.id,
                        to: node.id
                    })
                }
            })
        })
    }
    public static FlatArray2NodeLink(ori: Tree_FlatArray_PKeyed, keyed: 'parent'): Tree_NodeLink
    public static FlatArray2NodeLink(ori: Tree_FlatArray_CKeyed, keyed: 'children'): Tree_NodeLink
    /**
     * @description trans from `FlatArray` to `NodeLink`
     */
    public static FlatArray2NodeLink(ori: Tree_FlatArray_PKeyed | Tree_FlatArray_CKeyed, keyed: 'parent' | 'children'): Tree_NodeLink | null {
        const can: Tree_NodeLink = { nodes: [], links: [] }

        if(keyed === 'parent') Tree._FlatArray2NodeLink_PKeyed(ori, can)
        else if(keyed === 'children') Tree._FlatArray2NodeLink_CKeyed(ori, can)

        return can
    }
    // endregion

    // region NodeLink to FlatArray
    /** NodeLink to FlatArray (with parent keyed) */
    private static _NodeLink2FlatArray_PKeyed(ori: Tree_NodeLink, container: Tree_FlatArray_PKeyed) {
        // get nodes and links
        const { nodes, links } = ori
        // look for all the nodes
        nodes.forEach((node) => {
            // if the node has no `id`, just ignore and skip it
            if(!node.id) return
            // generate this node
            const _thisNode: Tree_FlatArray_PKeyed_Node = {
                ...node,
                extData: node.extData
            }
            // delete the `children` field
            delete _thisNode.children
            // search its parent in `links`
            links.forEach((link) => {
                if(node.id === link.to && !!link.from) {
                    _thisNode.parent = link.from
                }
            })
            // store this node
            container.push(_thisNode)
        })
    }
    /** NodeLink to FlatArray (with children keyed) */
    private static _NodeLink2FlatArray_CKeyed(ori: Tree_NodeLink, container: Tree_FlatArray_CKeyed) {
        // get nodes and links
        const { nodes, links } = ori
        // look for all the nodes
        nodes.forEach((node) => {
            // if the node has no `id`, just ignore and skip it
            if(!node.id) return
            // generate this node
            const _thisNode: Tree_FlatArray_CKeyed_Node = {
                ...node,
                extData: node.extData
            }
            // reset the `children` field
            _thisNode.children = []
            // search its children in `links`
            links.forEach((link) => {
                if(node.id === link.from && !!link.to) {
                    _thisNode.children!.push(link.to)
                }
            })
            // delete the `children` field if it is empty
            if(_thisNode.children!.length === 0) delete _thisNode.children
            // store this node
            container.push(_thisNode)
        })
    }
    public static NodeLink2FlatArray(ori: Tree_NodeLink, keyed: 'parent'): Tree_FlatArray_PKeyed
    public static NodeLink2FlatArray(ori: Tree_NodeLink, keyed: 'children'): Tree_FlatArray_CKeyed
    /**
     * @description trans tree from `NodeLink` to `FlatArray`.
     * <br/><b>·</b> if there is no `id` on the node, the node will be ignored.
     * <br/><b>·</b> if there is no `id` on the link, the link works as well.
     * <br/><b>·</b> if a node's `id` appears in the `to` of two(or more) links, the last link will be used and all the rest links will be ignored.
     */
    public static NodeLink2FlatArray(ori: Tree_NodeLink, keyed: 'parent' | 'children'): Tree_FlatArray_PKeyed | Tree_FlatArray_CKeyed {
        const can: Tree_FlatArray_PKeyed | Tree_FlatArray_CKeyed = []
        if(keyed === 'parent') Tree._NodeLink2FlatArray_PKeyed(ori, can)
        else if(keyed === 'children') Tree._NodeLink2FlatArray_CKeyed(ori, can)
        return can
    }
    // endregion
}

// type TreeType = 'Multilayer' | 'FlatArray' | 'NodeLink'
// region [type] multilayer
/** multilayer tree */
export type Tree_Multilayer = {
    [k: string]: any
    id: string
    extData?: any
    children?: Tree_Multilayer[]
}
// endregion
// region [type] flat-array
/** flat-array (parent keyed) tree */
export type Tree_FlatArray_PKeyed = Tree_FlatArray_PKeyed_Node[]
/** flat-array (parent keyed) tree`s node */
export type Tree_FlatArray_PKeyed_Node = {
    [k: string]: any
    id: string
    extData?: any
    parent?: string
}
/** flat-array (children keyed) tree */
export type Tree_FlatArray_CKeyed = Tree_FlatArray_CKeyed_Node[]
/** flat-array (children keyed) tree`s node */
export type Tree_FlatArray_CKeyed_Node = {
    [k: string]: any
    id: string
    extData?: any
    children?: string[]
}
// endregion
// region [type] node-link
/** node-link tree */
export type Tree_NodeLink = {
    nodes: Tree_NodeLink_Node[]
    links: Tree_NodeLink_Link[]
}
/** node-link tree`s node */
export type Tree_NodeLink_Node = {
    [k: string]: any
    id: string
    extData?: any
}
/** node-link tree`s link */
export type Tree_NodeLink_Link = {
    id: string
    from: string
    to: string
}
// endregion