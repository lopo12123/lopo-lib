// export all functions
module.exports = {
    // region clone
    /** deep clone an object with all its properties and methods */
    clone: require('./clone.js'),
    // endregion

    // region search
    /** depth first search */
    dfs: require('./dfs.js'),
    // endregion

    // region transition
    /** tree 2 array */
    t2a: require('./t2a.js'),

    /** array 2 tree */
    a2t: require('./a2t.js'),
    // endregion

    // region operate
    /** crop all the children from target node */
    crop: require('./crop.js'),

    /** append some nodes to the target node */
    append: require('./append.js'),

    /** cut the source node as a branch and attach it to the target node (as a child node) */
    move: require('./move.js'),
    // endregion
}