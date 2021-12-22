declare module "lopo-lib" {
    namespace LopoLib {
        interface lopo {
            /**
             * @description depth first search
             * @param {Object} tree whole tree
             * @param {(Object) => boolean} condition target condition
             * @param {string} [childKey = 'children'] the groupName of child nodes(defaults to 'children')
             * @param {string|Function} [resultFilter] what to return(return the whole node when undefined)
             * @return {Object|null}
             */
            dfs: (tree: object, condition: (node: object) => boolean, childKey?: string, resultFilter?: string | Function) => object|null

            bfs: () => object|null
        }
    }

    const lopo: LopoLib.lopo
    export = lopo
}