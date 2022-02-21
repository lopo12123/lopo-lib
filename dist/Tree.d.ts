/**
 * @description tree operation
 */
export declare class Tree {
    /**
     * @description [Tree_FlatArray] trans from `parent-keyed` to `child-keyed`
     */
    static TransKeyed_P2C(ori: Tree_FlatArray_PKeyed): Tree_FlatArray_CKeyed;
    /**
     * @description [Tree_FlatArray] trans from `children-keyed` to `parent-keyed`
     */
    static TransKeyed_C2P(ori: Tree_FlatArray_CKeyed): Tree_FlatArray_PKeyed;
    /** Multilayer to FlatArray (with parent keyed) */
    private static _Multilayer2FlatArray_PKeyed;
    /** Multilayer to FlatArray (with children keyed) */
    private static _Multilayer2FlatArray_CKeyed;
    static Multilayer2FlatArray(ori: Tree_Multilayer, keyed: 'parent'): Tree_FlatArray_PKeyed;
    static Multilayer2FlatArray(ori: Tree_Multilayer, keyed: 'children'): Tree_FlatArray_CKeyed;
    /** FlatArray (with parent keyed) to Multilayer */
    private static _FlatArray2Multilayer_PKeyed;
    /** FlatArray (with children keyed) to Multilayer */
    private static _FlatArray2Multilayer_CKeyed;
    static FlatArray2Multilayer(ori: Tree_FlatArray_PKeyed, keyed: 'parent'): Tree_Multilayer;
    static FlatArray2Multilayer(ori: Tree_FlatArray_CKeyed, keyed: 'children'): Tree_Multilayer;
    /** Multilayer to NodeLink */
    private static _Multilayer2NodeLink;
    /**
     * @description trans tree from `Multilayer` to `NodeLink`.
     * <br/><b>·</b> if there is no `id` on the node, it will add an `id` for this node automatically.
     */
    static Multilayer2NodeLink(ori: Tree_Multilayer): Tree_NodeLink;
    /** NodeLink to Multilayer */
    private static _NodeLink2Multilayer;
    /**
     * @description trans tree from `NodeLink` to `Multilayer`
     * <br/><b>·</b> it will try to find a node that is not pointed to by the `to` of any of the `ori.links` as the root node, and build the tree on this node.
     * <br/><b>·</b> if there are multiple nodes that meet the conditions in `ori.nodes`, it will only take the first one as the root node and start building the tree directly, the rest of the nodes will be ignored.
     * <br/><b>·</b> if there are some nodes in `ori.nodes` that are not connected to other nodes, these nodes will be ignored.
     */
    static NodeLink2Multilayer(ori: Tree_NodeLink): Tree_Multilayer | null;
    /** FlatArray (with parent keyed) to NodeLink */
    private static _FlatArray2NodeLink_PKeyed;
    /** FlatArray (with children keyed) to NodeLink */
    private static _FlatArray2NodeLink_CKeyed;
    static FlatArray2NodeLink(ori: Tree_FlatArray_PKeyed, keyed: 'parent'): Tree_NodeLink;
    static FlatArray2NodeLink(ori: Tree_FlatArray_CKeyed, keyed: 'children'): Tree_NodeLink;
    /** NodeLink to FlatArray (with parent keyed) */
    private static _NodeLink2FlatArray_PKeyed;
    /** NodeLink to FlatArray (with children keyed) */
    private static _NodeLink2FlatArray_CKeyed;
    static NodeLink2FlatArray(ori: Tree_NodeLink, keyed: 'parent'): Tree_FlatArray_PKeyed;
    static NodeLink2FlatArray(ori: Tree_NodeLink, keyed: 'children'): Tree_FlatArray_CKeyed;
}
/** multilayer tree */
export declare type Tree_Multilayer = {
    [k: string]: any;
    id: string;
    extData?: any;
    children?: Tree_Multilayer[];
};
/** flat-array (parent keyed) tree */
export declare type Tree_FlatArray_PKeyed = Tree_FlatArray_PKeyed_Node[];
/** flat-array (parent keyed) tree`s node */
export declare type Tree_FlatArray_PKeyed_Node = {
    [k: string]: any;
    id: string;
    extData?: any;
    parent?: string;
};
/** flat-array (children keyed) tree */
export declare type Tree_FlatArray_CKeyed = Tree_FlatArray_CKeyed_Node[];
/** flat-array (children keyed) tree`s node */
export declare type Tree_FlatArray_CKeyed_Node = {
    [k: string]: any;
    id: string;
    extData?: any;
    children?: string[];
};
/** node-link tree */
export declare type Tree_NodeLink = {
    nodes: Tree_NodeLink_Node[];
    links: Tree_NodeLink_Link[];
};
/** node-link tree`s node */
export declare type Tree_NodeLink_Node = {
    [k: string]: any;
    id: string;
    extData?: any;
};
/** node-link tree`s link */
export declare type Tree_NodeLink_Link = {
    id: string;
    from: string;
    to: string;
};
