/**
 * @description tree operation
 */
export class Tree {
    // region MultilayerObject to FlatArray
    private static _MultilayerObject2FlatArray(ori: Tree_MultilayerObject, keyed: 'parent' | 'children'): void {

    }
    /**
     * @description trans tree from `MultilayerObject` to `FlatArray`
     */
    public static MultilayerObject2FlatArray(ori: Tree_MultilayerObject, keyed: 'parent'): Tree_FlatArray_PKeyed
    public static MultilayerObject2FlatArray(ori: Tree_MultilayerObject, keyed: 'children'): Tree_FlatArray_CKeyed
    public static MultilayerObject2FlatArray(ori: Tree_MultilayerObject, keyed: 'parent' | 'children'): Tree_FlatArray_PKeyed | Tree_FlatArray_CKeyed {
        const can: Tree_FlatArray_PKeyed | Tree_FlatArray_CKeyed = []
        Tree._MultilayerObject2FlatArray(ori, keyed)
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
// type RelationKey = 'Parent' | 'Children'

// region [type] multilayer-object
/** multilayer-object tree */
export type Tree_MultilayerObject = {
    [k: string]: any
    id: string
    extData?: any
    children: Tree_MultilayerObject[]
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