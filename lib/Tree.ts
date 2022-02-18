import { v4 as UUID } from "uuid"

/**
 * @description tree operation
 */
export class Tree {
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
        // remove the `extData` param if it`s value is `undefined`
        if(_thisNode.extData === undefined) delete _thisNode.extData
        // delete the `children` param
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
    /** Multilayer to FlatArray (with parent keyed) */
    private static _Multilayer2FlatArray_CKeyed(ori: Tree_Multilayer, container: Tree_FlatArray_CKeyed, pid?: string): void {
        // store this node`s id
        const _thisId = ori.id ?? UUID()
        // generate this node
        const _thisNode: Tree_FlatArray_CKeyed_Node = {
            ...ori as Omit<Tree_Multilayer, 'children'>,
            id: _thisId,
            extData: ori.extData
        }
        // remove the `extData` param if it`s value is `undefined`
        if(_thisNode.extData === undefined) delete _thisNode.extData
        // attach this node`s id into this parent`s `children` param
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
    /**
     * @description trans tree from `Multilayer` to `FlatArray`.
     * <br/><b>Note:</b> if there is no `id` on the node, it will add an `id` for this node automatically.
     */
    public static Multilayer2FlatArray(ori: Tree_Multilayer, keyed: 'parent'): Tree_FlatArray_PKeyed
    public static Multilayer2FlatArray(ori: Tree_Multilayer, keyed: 'children'): Tree_FlatArray_CKeyed
    public static Multilayer2FlatArray(ori: Tree_Multilayer, keyed: 'parent' | 'children'): Tree_FlatArray_PKeyed | Tree_FlatArray_CKeyed {
        const can: Tree_FlatArray_PKeyed | Tree_FlatArray_CKeyed = []
        if(keyed === 'parent') Tree._Multilayer2FlatArray_PKeyed(ori, can)
        else if(keyed === 'children') Tree._Multilayer2FlatArray_CKeyed(ori, can)
        return can
    }
    // endregion

    // region FlatArray to Multilayer

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
        // remove the `extData` param if it`s value is `undefined`
        if(_thisNode.extData === undefined) delete _thisNode.extData
        // delete the `children` param
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
     * <br/><b>Note:</b> if there is no `id` on the node, it will add an `id` for this node automatically.
     */
    public static Multilayer2NodeLink(ori: Tree_Multilayer) {
        const can: Tree_NodeLink = { nodes: [], links: [] }
        Tree._Multilayer2NodeLink(ori, can)
        return can
    }
    // endregion

    // region NodeLink to Multilayer

    // endregion

    // region FlatArray to NodeLink

    // endregion

    // region NodeLink to FlatArray
    public static NodeLink2FlatArray() {

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
    parent?: string
    extData?: any
}
/** flat-array (children keyed) tree */
export type Tree_FlatArray_CKeyed = Tree_FlatArray_CKeyed_Node[]
/** flat-array (children keyed) tree`s node */
export type Tree_FlatArray_CKeyed_Node = {
    [k: string]: any
    id: string
    children?: string[]
    extData?: any
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


const ori: Tree_Multilayer = {
    id: 'n1',
    name: 'name1',
    children: [
        { id: 'n2', children: [] },
        { id: 'n3', children: [] },  // @ts-ignore
        { children: [] }
    ]
}

let flat = Tree.Multilayer2NodeLink(ori)
console.log(flat)