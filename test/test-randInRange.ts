import randInRange from "../lib/randInRange";

// default [0, 1)
console.log(randInRange(0, 1))

// same as default [0, 1)
console.log(randInRange(0, 1, 'right'))

// (0, 1]
console.log(randInRange(0, 1, 'left'))

// random in [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
console.log(randInRange(0, 1, 'right', 0.1))

// random in [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
console.log(randInRange(0, 1, 'left', 0.1))