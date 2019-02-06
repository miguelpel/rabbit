var _ = require('lodash');

var underscore = require('underscore')

var arrTest = [ [ 'aback', 'ab\'s', 'abaft' ]
 ]

var elm = [ 'ab\'s', 'aback', 'abaft' ]

function deepLook(arrOfArr, arr){
    var length = arr.length
    var count = 0
    var result = false
    arrOfArr.forEach(elm => {
        elm.forEach((item, i) => {
            if (item === arr[i]) {
                count++
            }
            if (count === length) result = true
        })
    })
    return result
}

// var result = Array.from(new Set(arr.map(JSON.stringify)), JSON.parse)

console.log(arrTest.includes(elm))
console.log(deepLook(arrTest, elm))

// console.log(_.uniq(arr))
// console.log(underscore.uniq(arr))
// console.log(result)