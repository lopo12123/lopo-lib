declare module "lopo-lib" {
    namespace LopoLib {
        // region [types] dfs and bfs
        namespace DfsAndBfs {
            type Tree = {
                [k: string]: any
                children: Tree[]
            }
        }
        // endregion

        // region [types] tree and array
        namespace TreeAndArray {
            /**
             * the default key of children is 'children'.
             * <br/>you can change it by using the param 'childKey' if need
             */
            type Tree = {
                [k: string]: any
                id?: string
                children: Tree[]
            }
            /**
             * the default key of id is 'id'.
             * <br/>you can change it by using the param 'idKey' if need
             */
            type Array1 = { id: string, info: any, parent?: string }[]
            /**
             * the default key of id is 'id'.
             * <br/>you can change it by using the param 'idKey' if need
             */
            type Array2 = { nodes: { id: string, info: any }[], links: { from: string, to: string }[] }
        }
        // endregion

        interface lopo {
            // region dfs
            /**
             * @description depth first search
             * <br/>{@link https://github.com/lopo12123/lopo-lib#readme}
             */
            dfs:
                (
                    tree: DfsAndBfs.Tree,
                    condition: (node: DfsAndBfs.Tree) => boolean,
                    childKey?: string,
                    resultFilter?: string | ((node: DfsAndBfs.Tree) => any)
                )
                    => DfsAndBfs.Tree | null | any
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
                    tree: TreeAndArray.Tree,
                    childKey?: string,
                    condition?: (node: TreeAndArray.Tree) => boolean,
                    resultFilter?: string | ((node: TreeAndArray.Tree) => any),
                    type?: 1 | 2
                )
                    => TreeAndArray.Array1 | TreeAndArray.Array2
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
                    flattenedArray: TreeAndArray.Array1 | TreeAndArray.Array2,
                    idKey?: string,
                    childKey?: string
                )
                    => TreeAndArray.Tree
            // endregion
        }
    }

    const lopo: LopoLib.lopo
    export = lopo
}