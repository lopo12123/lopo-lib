declare module "lopo-lib" {
    namespace LopoLib {
        interface lopo {
            // region dfs
            /**
             * @description depth first search
             * <br/>{@link https://github.com/lopo12123/lopo-lib#readme}
             */
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
            /**
             * @description tree to array
             * <br/>{@link https://github.com/lopo12123/lopo-lib#readme}
             * <br/>If you don't want (or don't need to) fill in some parameters
             * <br/>but need to fill in some parameters behind it, please use null
             * <br/>as a parameter placeholder (you can use it anywhere unless it`s required)
             * <br/>For example: you can use it like `t2a(arg0, null, arg2, null, arg4)`
             * <br/> ---
             * <br/>some thing about the param `type`:
             * <br/>`type=1(default)`: return `{id: string, parent: string, info: any}[]`
             * <br/>`type=2`: return `{nodes: {id:string, info: any}[], links: {from:xx, to:xx}[]}`
             */
            t2a:
                <TreeNode extends object, FilteredNode extends any>
                (
                    tree: TreeNode,
                    childKey?: string,
                    condition?: (node: TreeNode) => boolean,
                    resultFilter?: string | ((node: TreeNode) => FilteredNode),
                    type?: 1 | 2
                )
                    => { id: string, parent: string, info: TreeNode | FilteredNode | any }[]
                    | { nodes: { id: string, info: TreeNode | FilteredNode | any }[], links: { from: string, to: string }[] }
            // endregion
        }
    }

    const lopo: LopoLib.lopo
    export = lopo
}