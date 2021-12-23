declare module "lopo-lib" {
    namespace LopoLib {
        interface lopo {
            // region dfs
            dfs:
                <TreeNode extends object, FilteredNode extends any>
                (
                    tree: TreeNode,
                    condition: (node: TreeNode) => boolean,
                    childKey?: string,
                    resultFilter?: string | ((node: TreeNode) => FilteredNode)
                )
                    => TreeNode | FilteredNode | any | null
            // endregion

            // region t2a
            t2a:
                <TreeNode extends object, FilteredNode extends any>
                (
                    tree: TreeNode,
                    childKey?: string,
                    condition?: (node: TreeNode) => boolean,
                    resultFilter?: string | ((node: TreeNode) => FilteredNode)
                )
                    => (TreeNode | FilteredNode | any) []
            // endregion
        }
    }

    const lopo: LopoLib.lopo
    export = lopo
}