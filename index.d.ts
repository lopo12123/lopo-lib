declare module "lopo-lib" {
    namespace LopoLib {
        interface lopo {
            // region dfs
            dfs:
                <T extends object, K extends any>
                (
                    tree: T,
                    condition: (node: T) => boolean,
                    childKey?: string,
                    resultFilter?: string | ((node: T) => K)
                )
                    => object | K | null
            // endregion

            // region t2a
            t2a:
                <T extends object, K extends any>
                (
                    tree: T,
                    childKey?: string,
                    condition?: (node: T) => boolean,
                    resultFilter?: string | ((node: T) => K)
                )
                    => (T | K | any) []
            // endregion
        }
    }

    const lopo: LopoLib.lopo
    export = lopo
}