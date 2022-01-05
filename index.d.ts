declare module "lopo-lib" {
    // region [Search_xxx] dfs and bfs
    type Search_Tree = {
        [k: string]: any
        children: Search_Tree[]
    }
    // endregion

    // region [Trans_xxx] t2a and a2t
    /**
     * the default key of children is 'children'.
     * <br/>you can change it by using the param 'childKey' if need
     */
    type Trans_Tree = {
        [k: string]: any
        id?: string
        children: Trans_Tree[]
    }
    /**
     * the default key of id is 'id'.
     * <br/>you can change it by using the param 'idKey' if need
     */
    type Trans_Array1 = { id: string, info: any, parent?: string }[]
    /**
     * the default key of id is 'id'.
     * <br/>you can change it by using the param 'idKey' if need
     */
    type Trans_Array2 = { nodes: { id: string, info: any }[], links: { from: string, to: string }[] }
    // endregion

    // region [Operate_xxx] crop
    type Operate_tree = {
        [k: string]: any
        children: Operate_tree[]
    }
    // endregion

    // region [lopo] module namespace
    /**
     * @description interface of the module 'lopo-lib'
     */
    interface lopo {
        // region clone
        /**
         * @description deep clone an object with all its properties and methods
         * <br/>{@link https://github.com/lopo12123/lopo-lib#clone}
         * <br/> ---
         * <br/>some thing about the param `withFn`:
         * <br/>`withFn=true(default)`: search all the properties and methods on the object and clone them
         * <br/>`withFn=false`: just use JSON.parse and JSON.stringify to clone an object
         */
        clone: <T>(originInput: T, withFn: boolean) => T
        // endregion

        // region dfs
        /**
         * @description depth first search
         * <br/>{@link https://github.com/lopo12123/lopo-lib#dfs}
         * <br/>If you don't want (or don't need to) fill in some parameters
         * <br/>but need to fill in some parameters behind it, please use null
         * <br/>as a parameter placeholder (you can use it anywhere unless it`s required)
         * <br/>For example: you can use it like `dfs(arg0, arg1, null, arg3)`
         */
        dfs:
            (
                tree: Search_Tree,
                condition: (node: Search_Tree) => boolean,
                childKey?: string,
                resultFilter?: string | ((node: Search_Tree) => any)
            )
                => Search_Tree | null | any
        // endregion

        // region t2a
        /**
         * @description tree to array
         * <br/>{@link https://github.com/lopo12123/lopo-lib#t2a}
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
                tree: Trans_Tree,
                childKey?: string,
                condition?: (node: Trans_Tree) => boolean,
                resultFilter?: string | ((node: Trans_Tree) => any),
                type?: 1 | 2
            )
                => Trans_Array1 | Trans_Array2
        // endregion

        // region a2t
        /**
         * @description array to tree
         * <br/>{@link https://github.com/lopo12123/lopo-lib#a2t}
         * <br/>If you don't want (or don't need to) fill in some parameters
         * <br/>but need to fill in some parameters behind it, please use null
         * <br/>as a parameter placeholder (you can use it anywhere unless it`s required)
         * <br/>For example: you can use it like `a2t(arg0, null, arg2)`
         */
        a2t:
            (
                flattenedArray: Trans_Array1 | Trans_Array2,
                idKey?: string,
                childKey?: string
            )
                => Trans_Tree
        // endregion

        // region crop
        /**
         * @description crop all the children from target node
         * <br/>{@link https://github.com/lopo12123/lopo-lib#crop}
         * <br/>If you don't want (or don't need to) fill in some parameters
         * <br/>but need to fill in some parameters behind it, please use null
         * <br/>as a parameter placeholder (you can use it anywhere unless it`s required)
         * <br/>For example: you can use it like `crop(arg0, args1, null, arg3)`
         * <br/> ---
         * <br/>some thing about the param `remove`:
         * <br/>`remove=false(default)`: the value of target node\`s 'children' will be set as an empty array.(`targetNode.children` will be `[]`)
         * <br/>`remove=true`: the key 'children' will be removed from target node. (`targetNode.children` will be `undefined`)
         */
        crop: (
            tree: Operate_tree,
            condition: (node: Operate_tree) => boolean,
            childKey?: string,
            remove?: boolean
        )
            => Operate_tree[] | null
        // endregion

        // region append
        /**
         * @description append some nodes to the target node
         * <br/>{@link https://github.com/lopo12123/lopo-lib#append}
         * <br/>If you don't want (or don't need to) fill in some parameters
         * <br/>but need to fill in some parameters behind it, please use null
         * <br/>as a parameter placeholder (you can use it anywhere unless it`s required)
         * <br/>For example: you can use it like `append(arg0, args1, null, arg3)`
         */
        append: (
            tree: Operate_tree,
            condition: (node: Operate_tree) => boolean,
            nodes: Operate_tree[],
            childKey?: string,
            clearBeforeAdd?: boolean
        )
            => boolean
        // endregion

        // region move
        /**
         * @description cut the source node as a branch and attach it to the target node (as a child node)
         * <br/>{@link https://github.com/lopo12123/lopo-lib#move}
         * <br/> ---
         * <br/>some thing about the 'return':
         * <br/>the function will return an array which means [result, reason]
         * <br/>result: `boolean`, if the move succeed or failed
         * <br/>reason: `string`, the reason why `move` failed (or just 'success' when reason is `true`)
         */
        move: (
            tree: Operate_tree,
            sourceCondition: (node: Operate_tree) => boolean,
            targetCondition: (node: Operate_tree) => boolean,
            childKey?: string
        )
            => [boolean, string]
        // endregion
    }
    // endregion

    // region [lopo] export
    const clone: lopo["clone"]
    const dfs: lopo["dfs"]
    const t2a: lopo["t2a"]
    const a2t: lopo["a2t"]
    const crop: lopo["crop"]
    const append: lopo["append"]
    const move: lopo["move"]
    // endregion

    module.exports = {
        clone,
        dfs,
        t2a, a2t,
        crop, append, move
    }
}