declare module "lopo-lib" {
    namespace LopoLib {
        // region [types] tree and array
        /**
         * the default key of children is 'children'.
         * <br/>you can change it in the param 'childKey' in `t2a` if need
         */
        type Tree = {
            [k: string]: any
            id?: string
            children: Tree[]
        }
        /**
         *
         */
        type Array1 = { id: string, info: any, parent?: string }[]
        type Array2 = { nodes: { id: string, info: any }[], links: { from: string, to: string }[] }
        // endregion

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
                    => TreeNode | FilteredNode | null | any
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
                (
                    tree: Tree,
                    childKey?: string,
                    condition?: (node: Tree) => boolean,
                    resultFilter?: string | ((node: Tree) => any),
                    type?: 1 | 2
                )
                    => Array1 | Array2
            // endregion

            // region a2t
            /**
             * @description array to tree
             * <br/>{@link https://github.com/lopo12123/lopo-lib#readme}
             * <br/>If you don't want (or don't need to) fill in some parameters
             * <br/>but need to fill in some parameters behind it, please use null
             * <br/>as a parameter placeholder (you can use it anywhere unless it`s required)
             * <br/>For example: you can use it like `a2t(arg0, null, arg2)`
             */
            a2t:
                (
                    flattenedArray: Array1 | Array2,
                    idKey?: string,
                    childKey?: string
                )
                    => Tree
            // endregion
        }
    }

    const lopo: LopoLib.lopo
    export = lopo
}