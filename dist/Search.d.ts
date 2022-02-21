export declare abstract class Search {
    private static _dfs;
    /**
     * @description depth first search
     * @param root whole tree
     * @param condition target condition
     * @param childKey the key of child branches
     * @param resultFilter do filter with the target node before return
     */
    static dfs<TreeNode extends object>(root: TreeNode, condition: (node: TreeNode) => boolean, childKey?: string, resultFilter?: (node: TreeNode) => any): any | null;
}
