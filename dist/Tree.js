"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = void 0;
var uuid_1 = require("uuid");
/**
 * @description tree operation
 */
var Tree = /** @class */ (function () {
    function Tree() {
    }
    // region FlatArray
    /**
     * @description [Tree_FlatArray] trans from `parent-keyed` to `child-keyed`
     */
    Tree.TransKeyed_P2C = function (ori) {
        // result tree array
        var resultTree = [];
        // solve all the nodes in `ori`
        ori.forEach(function (node) {
            // generate the new node
            var newNode = __assign(__assign({}, node), { children: [], extData: node.extData });
            // delete the extra param
            delete newNode.parent;
            // find all child nodes in `ori`
            ori.forEach(function (_child) {
                if (node.id === _child.parent) {
                    newNode.children.push(_child.id);
                }
            });
            // delete the `children` param if it is empty
            if (newNode.children && newNode.children.length === 0)
                delete newNode.children;
            // add the new node to the resultTree
            resultTree.push(newNode);
        });
        return resultTree;
    };
    /**
     * @description [Tree_FlatArray] trans from `child-keyed` to `parent-keyed`
     */
    Tree.TransKeyed_C2P = function (ori) {
        // result tree array
        var resultTree = [];
        // solve all the nodes in `ori`
        ori.forEach(function (node) {
            // generate the new node
            var newNode = __assign(__assign({}, node), { parent: '', extData: node.extData });
            // delete the extra param
            delete newNode.children;
            // find all child nodes in `ori`
            ori.forEach(function (_parent) {
                if (_parent.children && _parent.children.includes(node.id)) {
                    newNode.parent = _parent.id;
                }
            });
            // delete the `parent` param if it is empty
            if ((newNode.parent !== undefined) && (newNode.parent === '')) {
                delete newNode.parent;
            }
            // add the new node to the resultTree
            resultTree.push(newNode);
        });
        return resultTree;
    };
    // endregion
    // region Multilayer to FlatArray
    /** Multilayer to FlatArray (with parent keyed) */
    Tree._Multilayer2FlatArray_PKeyed = function (ori, container, pid) {
        var _a, _b;
        // store this node`s id
        var _thisId = (_a = ori.id) !== null && _a !== void 0 ? _a : uuid_1.v4();
        // generate this node
        var _thisNode = __assign(__assign({}, ori), { id: _thisId, extData: ori.extData });
        // delete the `children` field
        delete _thisNode.children;
        // set parent`s id
        if (!!pid)
            _thisNode.parent = pid;
        // store this node
        container.push(_thisNode);
        // deepen
        (_b = ori.children) === null || _b === void 0 ? void 0 : _b.forEach(function (sTree) {
            Tree._Multilayer2FlatArray_PKeyed(sTree, container, _thisId);
        });
    };
    /** Multilayer to FlatArray (with children keyed) */
    Tree._Multilayer2FlatArray_CKeyed = function (ori, container, pid) {
        var _a, _b;
        // store this node`s id
        var _thisId = (_a = ori.id) !== null && _a !== void 0 ? _a : uuid_1.v4();
        // generate this node
        var _thisNode = __assign(__assign({}, ori), { id: _thisId, extData: ori.extData });
        // attach this node`s id into this parent`s `children` field
        if (!!pid)
            container.forEach(function (item, index, arr) {
                var _a;
                if (item.id === pid)
                    (_a = arr[index].children) === null || _a === void 0 ? void 0 : _a.push(_thisId);
            });
        // reset the value of key`children`
        _thisNode.children = [];
        // store this node
        container.push(_thisNode);
        // deepen
        (_b = ori.children) === null || _b === void 0 ? void 0 : _b.forEach(function (sTree) {
            Tree._Multilayer2FlatArray_CKeyed(sTree, container, _thisId);
        });
    };
    /**
     * @description trans tree from `Multilayer` to `FlatArray`.
     * <br/><b>·</b> if there is no `id` on the node, it will add an `id` for this node automatically.
     */
    Tree.Multilayer2FlatArray = function (ori, keyed) {
        var can = [];
        if (keyed === 'parent')
            Tree._Multilayer2FlatArray_PKeyed(ori, can);
        else if (keyed === 'children')
            Tree._Multilayer2FlatArray_CKeyed(ori, can);
        return can;
    };
    // endregion
    // region FlatArray to Multilayer
    /** FlatArray (with parent keyed) to Multilayer */
    Tree._FlatArray2Multilayer_PKeyed = function (ori, root) {
        if (!root) {
            // find the root of the tree
            var rootNode = ori.find(function (_rootNode) {
                var ifChild = ori.find(function (_node) {
                    return !!_node.children && _node.children.includes(_rootNode.id);
                });
                return !ifChild;
            });
            // if there is no node can be `root`, return `null` directly
            if (!rootNode)
                return null;
            // generate this node
            root = __assign(__assign({}, rootNode), { id: rootNode.id, children: [], extData: rootNode.extData });
            // build its branches
            ori.forEach(function (node) {
                if (node.parent === root.id) {
                    // generate this branch
                    var _branch = __assign(__assign({}, node), { children: [], extData: node.extData });
                    // delete the origin node`s `parent` param
                    delete _branch.parent;
                    // build this branch
                    Tree._FlatArray2Multilayer_PKeyed(ori, _branch);
                    // attach this branch
                    root.children.push(_branch);
                }
            });
            // delete the `children` param if it is empty
            if (root.children && root.children.length === 0)
                delete root.children;
            return root;
        }
        else {
            ori.forEach(function (node) {
                // generate this branch
                if (node.parent === root.id) {
                    var _branch = __assign(__assign({}, node), { children: [], extData: node.extData });
                    // delete the origin node`s `parent` param
                    delete _branch.parent;
                    // build this branch
                    Tree._FlatArray2Multilayer_PKeyed(ori, _branch);
                    // attach this branch
                    root.children.push(_branch);
                }
            });
            // delete the `children` param if it is empty
            if (root.children && root.children.length === 0)
                delete root.children;
            return root;
        }
    };
    /** FlatArray (with children keyed) to Multilayer */
    Tree._FlatArray2Multilayer_CKeyed = function (ori, root, childIds) {
        if (!root) {
            // find the root of the tree
            var rootNode = ori.find(function (_rootNode) {
                var ifChild = ori.find(function (_node) {
                    return !!_node.children && _node.children.includes(_rootNode.id);
                });
                return !ifChild;
            });
            // if there is no node can be `root`, return `null` directly
            if (!rootNode)
                return null;
            // generate this node
            root = __assign(__assign({}, rootNode), { id: rootNode.id, children: [], extData: rootNode.extData });
            // attach its branches
            Tree._FlatArray2Multilayer_CKeyed(ori, root, rootNode.children);
            // delete the `children` param if it is empty
            if (root.children && root.children.length === 0)
                delete root.children;
            return root;
        }
        else {
            if (!!childIds && childIds.length > 0) {
                // reset the `children` param
                root.children = [];
                // query every branch
                childIds.forEach(function (childId) {
                    // query this branch
                    var _branchNode = ori.find(function (node) {
                        return childId === node.id;
                    });
                    // if the branch node exist
                    if (!!_branchNode) {
                        var _branch = __assign(__assign({}, _branchNode), { children: [], extData: _branchNode.extData });
                        Tree._FlatArray2Multilayer_CKeyed(ori, _branch, _branchNode.children);
                        root.children.push(_branch);
                    }
                });
                if (root.children.length === 0)
                    delete root.children;
            }
            // directly return the root if it has no child
            return root;
        }
    };
    /**
     * @description trans tree from `FlatArray` to `Multilayer`.
     * <br/><b>·</b> it will try to find a node with no `parent` field (or `parent` with value `null` or `undefined`) as the root node, and build the tree on this node.
     * <br/><b>·</b> if there are multiple nodes that meet the conditions in `ori`, it will only take the first one as the root node and start building the tree directly, the rest of the nodes will be ignored.
     */
    Tree.FlatArray2Multilayer = function (ori, keyed) {
        if (keyed === 'parent')
            return Tree._FlatArray2Multilayer_PKeyed(ori);
        else if (keyed === 'children')
            return Tree._FlatArray2Multilayer_CKeyed(ori);
        else
            return null;
    };
    // endregion
    // region Multilayer to NodeLink
    /** Multilayer to NodeLink */
    Tree._Multilayer2NodeLink = function (ori, container, pid) {
        var _a, _b;
        // store this node`s id
        var _thisId = (_a = ori.id) !== null && _a !== void 0 ? _a : uuid_1.v4();
        // generate this node
        var _thisNode = __assign(__assign({}, ori), { id: _thisId, extData: ori.extData });
        // delete the `children` field
        delete _thisNode.children;
        // store this node
        container.nodes.push(_thisNode);
        // store this link
        if (!!pid)
            container.links.push({
                id: uuid_1.v4(),
                from: pid,
                to: _thisId,
            });
        // deepen
        (_b = ori.children) === null || _b === void 0 ? void 0 : _b.forEach(function (sTree) {
            Tree._Multilayer2NodeLink(sTree, container, _thisId);
        });
    };
    /**
     * @description trans tree from `Multilayer` to `NodeLink`.
     * <br/><b>·</b> if there is no `id` on the node, it will add an `id` for this node automatically.
     */
    Tree.Multilayer2NodeLink = function (ori) {
        var can = { nodes: [], links: [] };
        Tree._Multilayer2NodeLink(ori, can);
        return can;
    };
    // endregion
    // region NodeLink to Multilayer
    /** NodeLink to Multilayer */
    Tree._NodeLink2Multilayer = function (nodes, links, root) {
        // search all the links whose `from` equals `root.id`
        links.forEach(function (link) {
            if (link.from === root.id) {
                // find the node on the other side
                nodes.forEach(function (node) {
                    if (node.id === link.to) {
                        // set `children` if undefined
                        if (!root.children)
                            root.children = [];
                        // push the child root and deepen on it
                        var sRoot = __assign(__assign({}, node), { extData: node.extData });
                        Tree._NodeLink2Multilayer(nodes, links, sRoot);
                        root.children.push(sRoot);
                    }
                });
            }
        });
    };
    /**
     * @description trans tree from `NodeLink` to `Multilayer`
     * <br/><b>·</b> it will try to find a node that is not pointed to by the `to` of any of the `ori.links` as the root node, and build the tree on this node.
     * <br/><b>·</b> if there are multiple nodes that meet the conditions in `ori.nodes`, it will only take the first one as the root node and start building the tree directly, the rest of the nodes will be ignored.
     * <br/><b>·</b> if there are some nodes in `ori.nodes` that are not connected to other nodes, these nodes will be ignored.
     */
    Tree.NodeLink2Multilayer = function (ori) {
        // get nodes and links
        var nodes = ori.nodes, links = ori.links;
        // do filter job (filter out single nodes and links)
        var filteredNodes = nodes.filter(function (node) {
            var ifLinked = links.find(function (link) {
                return (link.from === node.id) || (link.to === node.id);
            });
            return Boolean(ifLinked);
        });
        var filteredLinks = links.filter(function (link) {
            var ifNoded = nodes.find(function (node) {
                return (link.from === node.id) || (link.to === node.id);
            });
            return Boolean(ifNoded);
        });
        // find the root of the tree
        var rootNode = filteredNodes.find(function (node) {
            var ifPointed = filteredLinks.find(function (link) {
                return link.to === node.id;
            });
            return Boolean(!ifPointed);
        });
        // return if there has no root node
        if (!rootNode)
            return null;
        // generate the root of tree
        var treeRoot = __assign(__assign({}, rootNode), { extData: rootNode.extData });
        // build the tree
        Tree._NodeLink2Multilayer(nodes, links, treeRoot);
        return treeRoot;
    };
    // endregion
    // region FlatArray to NodeLink
    /** FlatArray (with parent keyed) to NodeLink */
    Tree._FlatArray2NodeLink_PKeyed = function (ori, container) {
        // solve every node in `ori`
        ori.forEach(function (node) {
            // generate the new node
            var newNode = __assign(__assign({}, node), { extData: node.extData });
            // delete the origin param `parent`
            delete newNode.parent;
            // add node
            container.nodes.push(newNode);
            // add link(s)
            ori.forEach(function (_others) {
                if (_others.parent === node.id) {
                    container.links.push({
                        id: uuid_1.v4(),
                        from: node.id,
                        to: _others.id
                    });
                }
            });
        });
    };
    /** FlatArray (with children keyed) to NodeLink */
    Tree._FlatArray2NodeLink_CKeyed = function (ori, container) {
        // solve every node in `ori`
        ori.forEach(function (node) {
            // generate the new node
            var newNode = __assign(__assign({}, node), { extData: node.extData });
            // delete the origin param `children`
            delete newNode.children;
            // add node
            container.nodes.push(newNode);
            // add link(s)
            ori.forEach(function (_others) {
                if (_others.children && _others.children.includes(node.id)) {
                    container.links.push({
                        id: uuid_1.v4(),
                        from: _others.id,
                        to: node.id
                    });
                }
            });
        });
    };
    /**
     * @description trans from `FlatArray` to `NodeLink`
     */
    Tree.FlatArray2NodeLink = function (ori, keyed) {
        var can = { nodes: [], links: [] };
        if (keyed === 'parent')
            Tree._FlatArray2NodeLink_PKeyed(ori, can);
        else if (keyed === 'children')
            Tree._FlatArray2NodeLink_CKeyed(ori, can);
        return can;
    };
    // endregion
    // region NodeLink to FlatArray
    /** NodeLink to FlatArray (with parent keyed) */
    Tree._NodeLink2FlatArray_PKeyed = function (ori, container) {
        // get nodes and links
        var nodes = ori.nodes, links = ori.links;
        // look for all the nodes
        nodes.forEach(function (node) {
            // if the node has no `id`, just ignore and skip it
            if (!node.id)
                return;
            // generate this node
            var _thisNode = __assign(__assign({}, node), { extData: node.extData });
            // delete the `children` field
            delete _thisNode.children;
            // search its parent in `links`
            links.forEach(function (link) {
                if (node.id === link.to && !!link.from) {
                    _thisNode.parent = link.from;
                }
            });
            // store this node
            container.push(_thisNode);
        });
    };
    /** NodeLink to FlatArray (with children keyed) */
    Tree._NodeLink2FlatArray_CKeyed = function (ori, container) {
        // get nodes and links
        var nodes = ori.nodes, links = ori.links;
        // look for all the nodes
        nodes.forEach(function (node) {
            // if the node has no `id`, just ignore and skip it
            if (!node.id)
                return;
            // generate this node
            var _thisNode = __assign(__assign({}, node), { extData: node.extData });
            // reset the `children` field
            _thisNode.children = [];
            // search its children in `links`
            links.forEach(function (link) {
                if (node.id === link.from && !!link.to) {
                    _thisNode.children.push(link.to);
                }
            });
            // delete the `children` field if it is empty
            if (_thisNode.children.length === 0)
                delete _thisNode.children;
            // store this node
            container.push(_thisNode);
        });
    };
    /**
     * @description trans tree from `NodeLink` to `FlatArray`.
     * <br/><b>·</b> if there is no `id` on the node, the node will be ignored.
     * <br/><b>·</b> if there is no `id` on the link, the link works as well.
     * <br/><b>·</b> if a node's `id` appears in the `to` of two(or more) links, the last link will be used and all the rest links will be ignored.
     */
    Tree.NodeLink2FlatArray = function (ori, keyed) {
        var can = [];
        if (keyed === 'parent')
            Tree._NodeLink2FlatArray_PKeyed(ori, can);
        else if (keyed === 'children')
            Tree._NodeLink2FlatArray_CKeyed(ori, can);
        return can;
    };
    return Tree;
}());
exports.Tree = Tree;
// endregion
