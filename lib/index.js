// export all functions
module.exports = {
    // search
    /** depth first search */
    dfs: require('./dfs.js'),

    // transition
    /** tree 2 array */
    t2a: require('./t2a.js'),

    /** array 2 tree */
    a2t: require('./a2t.js'),

    // operate
    /** crop all the children from target node */
    crop: require('./crop.js'),

    /** append some nodes to the target node */
    append: require('./append.js'),
}