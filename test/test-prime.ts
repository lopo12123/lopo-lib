import { Prime } from "../lib/prime";

const do_test_wrong = () => {
    try {
        const wrong_when_double_false = new Prime(10, false, false)
    }
    catch (e: any) {
        console.log('error1: ', e.toString())
    }

    try {
        const wrong_when_n_out_range = new Prime(1)
    }
    catch (e: any) {
        console.log('error2: ', e.toString())
    }
}

const do_test_correct = () => {
    const primeFinder = new Prime(20)

    console.log('is 5 prime: ', primeFinder.is(5))
    console.log('is 16 prime: ', primeFinder.is(16))
    console.log('how many prime number in range [1, 20]: ', primeFinder.primeCount)
    console.log('show all the prime number in range [1, 20]: ', primeFinder.primeList)
}

do_test_wrong()
// error1:  Error: the instance is nonsense because both [map] and [list] are set to false
// error2:  Error: require n in range [2, 2^31]

do_test_correct()
// is 5 prime:  true
// is 16 prime:  false
// how many prime number in range [1, 20]:  8
// show all the prime number in range [1, 20]:  [
//    2,  3,  5,  7,
//   11, 13, 17, 19
// ]