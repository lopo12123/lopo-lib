import { v4 as UUID } from "uuid"

/**
 * @description tree operation
 */
export class Tree {
    // region MultilayerObject to FlatArray
    /**
     * @description parent keyed
     * @private
     */
    private static _MultilayerObject2FlatArray_PKeyed(ori: Tree_MultilayerObject, keyed: 'parent', container: Tree_FlatArray_PKeyed, pid?: string): void {
        // store this node`s id
        const _thisId = ori.id ?? UUID()
        // generate this node
        const _thisNode: Tree_FlatArray_PKeyed_Node = {
            ...ori,
            id: _thisId,
            extData: ori.extData
        }
        // set parent`s id
        if(!!pid) _thisNode.parent = pid
        // delete the `children` param
        delete _thisNode.children
        // remove the `extData` param if it`s value is `undefined`
        if(!_thisNode.extData) delete _thisNode.extData

        container.push(_thisNode)

        ori.children?.forEach((sTree) => {
            Tree._MultilayerObject2FlatArray_PKeyed(sTree, 'parent', container, _thisId)
        })
    }
    private static _MultilayerObject2FlatArray_CKeyed(ori: Tree_MultilayerObject, keyed: 'children', container: Tree_FlatArray_CKeyed): void {

    }
    /**
     * @description trans tree from `MultilayerObject` to `FlatArray`.
     * <br/><b>Note:</b> if there is no `id` on the node, it will add an `id` for this node automatically.
     */
    public static MultilayerObject2FlatArray(ori: Tree_MultilayerObject, keyed: 'parent'): Tree_FlatArray_PKeyed
    public static MultilayerObject2FlatArray(ori: Tree_MultilayerObject, keyed: 'children'): Tree_FlatArray_CKeyed
    public static MultilayerObject2FlatArray(ori: Tree_MultilayerObject, keyed: 'parent' | 'children'): Tree_FlatArray_PKeyed | Tree_FlatArray_CKeyed {
        const can: Tree_FlatArray_PKeyed | Tree_FlatArray_CKeyed = []

        if(keyed === 'parent') Tree._MultilayerObject2FlatArray_PKeyed(ori, keyed, can)
        else if(keyed === 'children') Tree._MultilayerObject2FlatArray_CKeyed(ori, keyed, can)

        return can
    }
    // endregion

    // region FlatArray to MultilayerObject

    // endregion

    // region MultilayerObject to NodeLink

    // endregion

    // region NodeLink to MultilayerObject

    // endregion

    // region FlatArray to NodeLink

    // endregion

    // region NodeLink to FlatArray
    public static NodeLink2FlatArray() {

    }
    // endregion
}

// type TreeType = 'MultilayerObject' | 'FlatArray' | 'NodeLink'
// region [type] multilayer-object
/** multilayer-object tree */
export type Tree_MultilayerObject = {
    [k: string]: any
    id: string
    extData?: any
    children?: Tree_MultilayerObject[]
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
    [k: string]: any
    id: string
    from: string
    to: string
    extData?: any
}
// endregion


const ori: Tree_MultilayerObject = {
    id: 'n1',
    name: 'name1',
    children: [
        { id: 'n2', children: [] },
        { id: 'n3', children: [] },  // @ts-ignore
        { children: [] }
    ]
}

let flat = Tree.MultilayerObject2FlatArray(ori, 'parent')
console.log(flat)