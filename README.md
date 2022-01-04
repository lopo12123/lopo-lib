## lopo-lib
some useful method  

author: lopo  
<a href="mailto:lopoflyfly@gmail.com" title="contact me">click here to contact me</a>

---  

### Installation  
`npm install lopo-lib`  

---  

### Import  
```js
// here i use 'dfs' for example

// 1 esm usage
// 1.1 import all
import lopo from 'lopo-lib'
let targetNode = lopo.dfs(/** ... */)

// 1.2 import some
import {dfs} from 'lopo-lib'
let targetNode = dfs(/** ... */)

// 2 cjs usage
// 2.1 import all
const lopo = require('lopo-lib')
lopo.dfs(/** ... */)

// 2.2 import some
const dfs = require('lopo-lib').dfs
dfs(/** ... */)

// 2.3 import some
const { dfs } = require('lopo-lib')
dfs(/** ... */)
```

---  

#### <a id="menu" name="menu">Menu</a>
<a id="menu_dfs" href="#dfs">1.1 dfs (depth first search)</a>  
<a id="menu_bfs" href="#bfs">1.2 bfs (undo)</a>  
<a id="menu_t2a" href="#t2a">2.1 t2a (tree to array)</a>  
<a id="menu_a2t" href="#a2t">2.2 a2t (array to tree(s))</a>  
<a id="menu_crop" href="#crop">3.1 crop (crop all the children from target node)</a>  
<a id="menu_append" href="#append">3.2 append (append some nodes to the target node)</a>  

---

#### Usage
**Search**  
- <a id="dfs" href="#menu_dfs">1.1 dfs</a>  
```js
// 0. create a tree object
const tree = {
    id: '1',
    name: 'Node 1',
    children: [
        {
            id: '1-1',
            name: 'Node 1-1',
            children: [
                {
                    id: '1-1-1',
                    name: 'Node 1-1-1',
                    children: []
                }
            ]
        },
        {
            id: '1-2',
            name: 'Node 1-2',
            children: []
        }
    ],
    childList: [
        {
            id: 'child-1',
            name: 'Node child-1',
            childList: [
                {
                    id: 'child-1-1',
                    name: 'Node child-1-1',
                    childList: []
                }
            ]
        },
        {
            id: 'child-2',
            name: 'Node child-2',
            childList: []
        }
    ]
}

// 1. default
const findNode1 = dfs(
    tree,
    (node) => {
        return node.id === '1-1'
    }
)
console.log(findNode1)  // output: { id: '1-1', name: 'Node 1-1', children: [] }

// 2. set 'childKey'
const findNode2 = dfs(
    tree,
    (node) => {
        return node.name === 'Node child-1'
    },
    'childList'
)
console.log(findNode2)  // output: "{ id: 'child-1', name: 'Node child-1', childList: [] }"

// 3. set 'resultFilter'
const findNode3 = dfs(
    tree,
    (node) => {
        return node.id === '1-1'
    },
    'children',
    (node) => {
        return node.name
    }
)
console.log(findNode3)  // output: "Node 1-1"

// 4. you can use "null" or "undefined" as a placeholder in args
const findNode4 = dfs(
    tree,
    (node) => {
        return node.id === '1-1'
    },
    null,  // "undefined" as well
    (node) => {
        return {name: node.name}
    }
)
console.log(findNode4)  // output: "{ name: 'Node 1-1' }"
```  

- <a id="bfs" href="#menu_bfs">1.2 bfs</a>  
```js
// undo
```

- **Transition(Tree** & **Array)**  
- <a id="t2a" href="#menu_t2a">2.1 t2a</a>  
```js
// 0. create a tree object
const tree = {
    id: '1',
    name: 'Node 1',
    children: [
        {
            id: '1-1',
            name: 'Node 1-1',
            children: [
                {
                    id: '1-1-1',
                    name: 'Node 1-1-1',
                    children: []
                }
            ]
        },
        {
            id: '1-2',
            name: 'Node 1-2',
            children: []
        }
    ],
    childList: [
        {
            id: 'child-1',
            name: 'Node child-1',
            childList: [
                {
                    id: 'child-1-1',
                    name: 'Node child-1-1',
                    childList: []
                }
            ]
        },
        {
            id: 'child-2',
            name: 'Node child-2',
            childList: []
        }
    ]
}

// 1. default
const arr1 = t2a(tree)
console.log(arr1)
// output:
// [
//     {
//         id: '1',
//         parent: null,
//         info: { id: '1', name: 'Node 1', children: [], childList: [Array] }
//     },
//     {
//         id: '1-1',
//         parent: '1',
//         info: { id: '1-1', name: 'Node 1-1', children: [] }
//     },
//     {
//         id: '1-1-1',
//         parent: '1-1',
//         info: { id: '1-1-1', name: 'Node 1-1-1', children: [] }
//     },
//     {
//         id: '1-2',
//         parent: '1',
//         info: { id: '1-2', name: 'Node 1-2', children: [] }
//     }
// ]

// 2. set 'childKey'
const arr2 = t2a()
console.log(arr2)
// output:
// [
//     {
//         id: '1',
//         parent: null,
//         info: { id: '1', name: 'Node 1', children: [Array], childList: [] }
//     },
//     {
//         id: 'child-1',
//         parent: '1',
//         info: { id: 'child-1', name: 'Node child-1', childList: [] }
//     },
//     {
//         id: 'child-1-1',
//         parent: 'child-1',
//         info: { id: 'child-1-1', name: 'Node child-1-1', childList: [] }
//     },
//     {
//         id: 'child-2',
//         parent: '1',
//         info: { id: 'child-2', name: 'Node child-2', childList: [] }
//     }
// ]

// 3. set 'condition' (ignore child nodes if condition returns false)
const arr3 = t2a(
    tree,
    'childList',
    (node) => {
        return node.id !== 'child-1'
    }
)
console.log(arr3)
// output:
// [
//     {
//         id: '1',
//         parent: null,
//         info: { id: '1', name: 'Node 1', children: [Array], childList: [] }
//     },
//     {
//         id: 'child-1',
//         parent: '1',
//         info: { id: 'child-1', name: 'Node child-1', childList: [] }
//     },
//     {
//         id: 'child-2',
//         parent: '1',
//         info: { id: 'child-2', name: 'Node child-2', childList: [] }
//     }
// ]

// 4. set 'resultFilter'
const arr4 = t2a(
    tree,
    'childList',
    (node) => {
        return node.id !== 'child-1'
    },
    (node) => {
        return node.name
    }
)
console.log(arr4)
// output:
// [
//     { id: '1', parent: null, info: 'Node 1' },
//     { id: 'child-1', parent: '1', info: 'Node child-1' },
//     { id: 'child-2', parent: '1', info: 'Node child-2' }
// ]

// 5. you can use "null" or "undefined" as a placeholder in args
const arr5 = t2a(tree, null, undefined, (node) => { return node.name })
console.log(arr5)
// output:
// [
//     { id: '1', parent: null, info: 'Node 1' },
//     { id: '1-1', parent: '1', info: 'Node 1-1' },
//     { id: '1-1-1', parent: '1-1', info: 'Node 1-1-1' },
//     { id: '1-2', parent: '1', info: 'Node 1-2' }
// ]

// 6. you can choose to output in another type by set 'type'
const arr6 = t2a(tree, null, null, null, 2)
console.log(arr6)
// output:
// {
//   nodes: [
//     { id: '1', info: [Object] },
//     { id: '1-1', info: [Object] },
//     { id: '1-1-1', info: [Object] },
//     { id: '1-2', info: [Object] }
//   ],
//   links: [
//     { from: '1', to: '1-1' },
//     { from: '1-1', to: '1-1-1' },
//     { from: '1', to: '1-2' }
//   ]
// }
```  

- <a id="a2t" href="#menu_a2t">2.2 a2t</a>  
```js
// t2a has two types of output, correspondingly, a2t has two types of input available
// 0. create two array
const array1 = [
    { id: '1', name: 'Node 1', parent: null },
    { id: '2', name: 'Node 2', parent: '1' },
    { id: '3', name: 'Node 3', parent: '2' },
    { id: '4', name: 'Node 4', parent: '1' }
]
const array2 = {
    nodes: [
        { id: '1', name: 'Node 1' },
        { id: '2', name: 'Node 2' },
        { id: '3', name: 'Node 3' },
        { id: '4', name: 'Node 4' },
    ],
    links: [
        { from: '1', to: '2' },
        { from: '2', to: '3' },
        { from: '1', to: '4' },
    ]
}

// 1. default
const tree1_1 = a2t(array1)
const tree1_2 = a2t(array2)
console.log("tree1_1:\n", tree1_1)
console.log("tree1_2:\n", tree1_2)
// output: (two outputs are the same)
// tree1_1:
// [
//     {
//         "id": "1",
//         "name": "Node 1",
//         "children": [
//             {
//                 "id": "2",
//                 "name": "Node 2",
//                 "children": [
//                     {
//                         "id": "3",
//                         "name": "Node 3",
//                         "children": []
//                     }
//                 ]
//             },
//             {
//                 "id": "4",
//                 "name": "Node 4",
//                 "children": []
//             }
//         ]
//     }
// ]
// tree1_2:
// [
//     {
//         "id": "1",
//         "name": "Node 1",
//         "children": [
//             {
//                 "id": "2",
//                 "name": "Node 2",
//                 "children": [
//                     {
//                         "id": "3",
//                         "name": "Node 3",
//                         "children": []
//                     }
//                 ]
//             },
//             {
//                 "id": "4",
//                 "name": "Node 4",
//                 "children": []
//             }
//         ]
//     }
// ]

// 2. set 'idKey'
const array3 = [
    { uuid: '1', name: 'Node 1', parent: null },
    { uuid: '2', name: 'Node 2', parent: '1' },
    { uuid: '3', name: 'Node 3', parent: '2' },
    { uuid: '4', name: 'Node 4', parent: '1' }
]
const tree2_1 = a2t(array3)
console.log(tree2_1)
// output:
// [
//     {
//         "uuid": "1",
//         "name": "Node 1",
//         "children": [
//             {
//                 "uuid": "2",
//                 "name": "Node 2",
//                 "children": [
//                     {
//                         "uuid": "3",
//                         "name": "Node 3",
//                         "children": []
//                     }
//                 ]
//             },
//             {
//                 "uuid": "4",
//                 "name": "Node 4",
//                 "children": []
//             }
//         ]
//     }
// ]

// 3. set 'childKey'
const tree3_1 = a2t(array3, 'uuid', 'kids')
console.log(tree3_1)
// output:
// [
//     {
//         "uuid": "1",
//         "name": "Node 1",
//         "kids": [
//             {
//                 "uuid": "2",
//                 "name": "Node 2",
//                 "kids": [
//                     {
//                         "uuid": "3",
//                         "name": "Node 3",
//                         "kids": []
//                     }
//                 ]
//             },
//             {
//                 "uuid": "4",
//                 "name": "Node 4",
//                 "kids": []
//             }
//         ]
//     }
// ]

// 4. you can use "null" or "undefined" as a placeholder in args
const tree4_1 = a2t(array1, null, 'kids')
console.log(tree4_1)
// output:
// [
//     {
//         "id": "1",
//         "name": "Node 1",
//         "kids": [
//             {
//                 "id": "2",
//                 "name": "Node 2",
//                 "kids": [
//                     {
//                         "id": "3",
//                         "name": "Node 3",
//                         "kids": []
//                     }
//                 ]
//             },
//             {
//                 "id": "4",
//                 "name": "Node 4",
//                 "kids": []
//             }
//         ]
//     }
// ]
```  

- **Operate(Crop、append & ??)**  
- <a id="crop" href="#menu_crop">3.1 crop</a>  
```js
// 0. create a tree object
const tree = {
    id: '1',
    name: 'node 1',
    children: [
        {
            id: '2',
            name: 'node 2',
            children: []
        },
        {
            id: '3',
            name: 'node 3',
            children: [
                {
                    id: '4',
                    name: 'node 4',
                    children: []
                }
            ]
        }
    ]
}

// 1. default
const croppedTree1 = crop(
    tree,
    (node) => {
        return node.id === '3'
    }
)
console.log(tree)
console.log(croppedTree1)
// output:
// {
//     id: '1',
//     name: 'node 1',
//     children: [
//         { id: '2', name: 'node 2', children: [] },
//         { id: '3', name: 'node 3', children: [] }
//     ]
// }
// [ { id: '4', name: 'node 4', children: [] } ]

// 2. set 'childKey'
const tree2 = {
    id: '1',
    name: 'node 1',
    kids: [
        {
            id: '2',
            name: 'node 2',
            kids: []
        },
        {
            id: '3',
            name: 'node 3',
            kids: [
                {
                    id: '4',
                    name: 'node 4',
                    kids: []
                }
            ]
        }
    ]
}
const croppedTree2 = crop(
    tree2,
    (node) => {
        return node.id === '3'
    },
    'kids'
)
console.log(tree2)
console.log(croppedTree2)
// output:
// {
//     id: '1',
//     name: 'node 1',
//     kids: [
//         { id: '2', name: 'node 2', kids: [] },
//         { id: '3', name: 'node 3', kids: [] }
//     ]
// }
// [ { id: '4', name: 'node 4', kids: [] } ]

// 3. set 'remove'
const croppedTree3 = crop(
    tree,
    (node) => {
        return node.id === '3'
    },
    'children',
    true
)
console.log(tree)
console.log(croppedTree3)
// output:
// {
//     id: '1',
//     name: 'node 1',
//     children: [
//         { id: '2', name: 'node 2', children: [] },
//         { id: '3', name: 'node 3' }
//     ]
// }
// [ { id: '4', name: 'node 4', children: [] } ]

// 4. you can use "null" or "undefined" as a placeholder in args
const croppedTree3 = crop(
    tree,
    (node) => {
        return node.id === '3'
    },
    null,
    true
)
console.log(tree)
console.log(croppedTree3)
// output:
// {
//     id: '1',
//     name: 'node 1',
//     children: [
//         { id: '2', name: 'node 2', children: [] },
//         { id: '3', name: 'node 3' }
//     ]
// }
// [ { id: '4', name: 'node 4', children: [] } ]
```  

- <a id="append" href="#menu_append">3.2 append</a>
```js
// 0. create a tree object
const tree = {
    id: '1',
    name: 'node 1',
    children: [
        {
            id: '2',
            name: 'node 2'
        }
    ]
}
const nodesToAppend = [
    {id: '3', name: 'node 3'},
    {id: '4', name: 'node 4'}
]

// 1. default
const result1 = append(
    tree,
    (node) => {
        return node.id === '1'
    }
)
console.log(result1)
console.log(tree)
// output:
// true
// {
//     id: '1',
//     name: 'node 1',
//     children: [
//         { id: '2', name: 'node 2' },
//         { id: '3', name: 'node 3' },
//         { id: '4', name: 'node 4' }
//     ]
// }

// 2. set 'childKey'
const tree2 = {
    id: '1',
    name: 'node 1',
    kids: [
        {
            id: '2',
            name: 'node 2'
        }
    ]
}
const result2 = append(
    tree2,
    (node) => {
        return node.id === '1'
    },
    'kids'
)
console.log(result2)
console.log(tree2)
// output:
// true
// {
//     id: '1',
//     name: 'node 1',
//     kids: [
//         { id: '2', name: 'node 2' },
//         { id: '3', name: 'node 3' },
//         { id: '4', name: 'node 4' }
//     ]
// }

// 3. set 'clearBeforeAdd'
const result3= append(
    tree,
    (node) => {
        return node.id === '1'
    },
    nodesToAppend,
    'children',
    true
)
console.log(result3)
console.log(tree)
// output:
// true
// {
//     id: '1',
//     name: 'node 1',
//     children: [
//         { id: '3', name: 'node 3' },
//         { id: '4', name: 'node 4' }
//     ]
// }

// 4. you can use "null" or "undefined" as a placeholder in args
const result4= append(
    tree,
    (node) => {
        return node.id === '1'
    },
    nodesToAppend,
    null,
    true
)
console.log(result4)
console.log(tree)
// output:
// true
// {
//     id: '1',
//     name: 'node 1',
//     children: [
//         { id: '3', name: 'node 3' },
//         { id: '4', name: 'node 4' }
//     ]
// }
```  

- another todo  


I will update it continually...