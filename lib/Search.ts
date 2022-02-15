export abstract class Search {
    private static _dfs<BranchNode extends {[k: string]: any}>(
        branchRoot: BranchNode,
        condition: (node: BranchNode) => boolean,
        childKey: string = 'children',
        resultFilter: (node: BranchNode) => any = node => node
    ): any | null {
        // find target at root
        if(condition(branchRoot)) {
            return resultFilter(branchRoot)
        }

        // not found - deepen in child branches
        else {
            // directly return if childKey does not exist on the key map
            if(!branchRoot[childKey]) return null

            // deep into all the child branches
            for(let i = 0; i < branchRoot[childKey].length; i ++) {
                // now branchRoot[childKey][i] is a new branchRoot
                let _result = Search._dfs(branchRoot[childKey][i], condition, childKey, resultFilter)

                // find target in this child branch
                if(!!_result) return _result
            }

            // still not found
            return null
        }
    }

    /**
     * @description depth first search
     * @param root whole tree
     * @param condition target condition
     * @param childKey the key of child branches
     * @param resultFilter do filter with the target node before return
     */
    public static dfs<TreeNode extends object>(
        root: TreeNode,
        condition: (node: TreeNode) => boolean,
        childKey: string = 'children',
        resultFilter: (node: TreeNode) => any = node => node
    ): any | null {
        return Search._dfs(root, condition, childKey, resultFilter)
    }
}
