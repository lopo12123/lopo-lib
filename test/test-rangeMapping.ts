import { rangeMapping } from "../lib/rangeMapping";

// overload 1
const mapping = rangeMapping([ 0, 1 ], [ 0, 100 ])

console.log(mapping(0))  // 0
console.log(mapping(0.5))  // 50
console.log(mapping(0.3))  // 30
console.log(mapping(1.1))  // 110.00000000000001

// overload 2
console.log(rangeMapping([ 0, 1 ], [ 0, 100 ], 0))  // 0
console.log(rangeMapping([ 0, 1 ], [ 0, 100 ], 0.5))  // 50
console.log(rangeMapping([ 0, 1 ], [ 0, 100 ], 0.3))  // 30
console.log(rangeMapping([ 0, 1 ], [ 0, 100 ], 1.1))  // 110.00000000000001

// anyway, `110.00000000000001` is not totally wrong.
// because in javascript, you will get this return for `1.1 * 100`.