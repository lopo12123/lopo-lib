"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
var Search = /** @class */ (function () {
    function Search() {
    }
    Search._dfs = function (branchRoot, condition, childKey, resultFilter) {
        if (childKey === void 0) { childKey = 'children'; }
        if (resultFilter === void 0) { resultFilter = function (node) { return node; }; }
        // find target at root
        if (condition(branchRoot)) {
            return resultFilter(branchRoot);
        }
        // not found - deepen in child branches
        else {
            // directly return if childKey does not exist on the key map
            if (!branchRoot[childKey])
                return null;
            // deep into all the child branches
            for (var i = 0; i < branchRoot[childKey].length; i++) {
                // now branchRoot[childKey][i] is a new branchRoot
                var _result = Search._dfs(branchRoot[childKey][i], condition, childKey, resultFilter);
                // find target in this child branch
                if (!!_result)
                    return _result;
            }
            // still not found
            return null;
        }
    };
    /**
     * @description depth first search
     * @param root whole tree
     * @param condition target condition
     * @param childKey the key of child branches
     * @param resultFilter do filter with the target node before return
     */
    Search.dfs = function (root, condition, childKey, resultFilter) {
        if (childKey === void 0) { childKey = 'children'; }
        if (!resultFilter)
            resultFilter = function (node) { return node; };
        return Search._dfs(root, condition, childKey, resultFilter);
    };
    return Search;
}());
exports.Search = Search;
