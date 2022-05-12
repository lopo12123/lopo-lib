import { Heap_big_root, Heap_small_root } from "../lib/heap";

const do_test_big = () => {
    const big_root = new Heap_big_root([ 2, 5, 1, 3, 6, 1, 2 ])
    big_root.add(5)
    console.log(big_root.heap)
    let head = big_root.delete()
    console.log(head, big_root.heap)
    head = big_root.delete()
    console.log(head, big_root.heap)
}
do_test_big()
// [ 6, 5, 3, 5, 2, 1, 1, 2 ]
// 6 [ 5, 5, 3, 2, 2, 1, 1 ]
// 5 [ 5, 2, 3, 2, 1, 1 ]

const do_test_small = () => {
    const small_root = new Heap_small_root([ 2, 5, 1, 3, 6, 1, 2 ])
    small_root.add(5)
    console.log(small_root.heap)
    let head = small_root.delete()
    console.log(head, small_root.heap)
    head = small_root.delete()
    console.log(head, small_root.heap)
}
do_test_small()
// [ 1, 1, 2, 2, 3, 5, 6, 5 ]
// 1 [ 1, 2, 2, 5, 3, 5, 6 ]
// 1 [ 2, 2, 6, 5, 3, 5 ]