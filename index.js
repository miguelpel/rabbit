// import modules
var fs = require('fs');
var md5 = require('md5');
var _ = require('lodash');

// create an array from the wordlist

var wordList;
var wordExp = /\w*'*\w/g;

var contents = fs.readFileSync('wordlist', 'utf8');
// var contents = fs.readFileSync('test', 'utf8');
wordList = contents.match(wordExp);
console.log(wordList.length);

// filter and remove from his array every entry that is not contained in original anagram
// if EVERY letter from the entry is not in the original anagram (with exception of '), remove this entry

// const anagram = "abaft ab saback"
const anagram = "poultry outwits ants"

const filteredWordList = wordList.filter(word => checkIfWordInAnagram(word, anagram));

function checkIfWordInAnagram(word, anagram) {
    var charactersRemaining = word.length
    var i = charactersRemaining;
    while (i--) {
      var character = word.charAt(i);
      if (anagram.includes(character) || character === "'") {
        charactersRemaining--
      }
    }
    return charactersRemaining === 0
}

console.log(filteredWordList.length);

var anagramCopy = (' ' + anagram).slice(1)
var currentWord;
var currentWordsArray = [];
var arrayOfCombinations = []; // array containing arrays of every matching combinations

function removeDuplicates(arrOfArr) {
 //
}


// remove spaces from anagram
var trimmedAnagram = anagram.replace(/\s+/g, '')
console.log(trimmedAnagram)
// console.log(filteredWordList)
// looks if word is in anagram
// if word in anagram, add word to currentWordsArray
// then remove word from array and from wordsArray
//    if anagram === '' => add currentWordArray to arrayOfCombinations reset all but arrayOfCombinations
//    else for word in remainingWordsArray, recursivelyLookForCombinations(word)
// else:
//     remove the word from wordList, and for word in remainingWordsArray, recursivelyLookForCombinations(word)

function filterRemainingWordList(remainingAnagram, remainingWordList, currentWordsArray = []) {
    // console.log("at enter")
    // console.log(currentWordsArray)
    // console.log(remainingWordList)
    if (remainingWordList.length <= 0) {
        // console.log('no more words')
        return
    }
    remainingWordList.forEach(word => {
        var currWord = word
        var remainingAnagramCopy = (' ' + remainingAnagram).slice(1);
        var remainingWordListClone = filteredWordList.slice(0);
        var currentWordsArrayClone = currentWordsArray.slice(0);
        //remove from anagram and add to currentWordsArray
        if (checkIfWordInAnagram(currWord, remainingAnagramCopy)) {
            remainingAnagramCopy = removeWordFromAnagram(remainingAnagramCopy, currWord)
            currentWordsArrayClone.push(currWord)
            currentWordsArrayClone.sort()
        } else {
            // console.log('no match in array')
            return
        }
        // remove currWord from WordListClone
        remainingWordListClone = removeWordFromArray(remainingWordListClone, currWord)
        if (remainingAnagramCopy === '') {
            // return currentWordsArrayClone
            if (!deepLook(arrayOfCombinations, currentWordsArrayClone)) {
                // console.log("match in array")
                // console.log(currentWordsArrayClone)
                arrayOfCombinations.push(currentWordsArrayClone)
                
            }
        }
        filterRemainingWordList(remainingAnagramCopy, remainingWordListClone, currentWordsArrayClone)
    })
}

filterRemainingWordList(trimmedAnagram, filteredWordList)

// function checkForMatches(remainingAmagram, remainingWordList) {
//     if (remainingWordList.length !== 0) {
//         var currentWord = remainingWordList.splice(0,1)[0];
//         console.log('currentWord')
//         console.log(currentWord)
//         console.log('remainingWordList')
//         console.log(remainingWordList)
//         console.log('remainingAmagram')
//         console.log(remainingAmagram)
//         checkForMatches(remainingAmagram, remainingWordList)
//         // return
//         // if (checkIfWordInAnagram(currentWord, remainingAmagram)) {
//         //     currentWordsArray.push(currentWord)
//         //     remainingAmagram = removeWordFromAnagram(currentWord, remainingAmagram)
//         //     if (remainingAmagram.length === 0) {
//         //         arrayOfCombinations.push(currentWordsArray) 
//         //     }
//         //     checkForMatches(remainingAmagram, remainingWordList)
//         // } else {
//         //     // throw word away and continue test
//         //     checkForMatches(remainingAmagram, remainingWordList)
//         // }
//     } else {
//         //no remaining words
//         console.log('return')
//         return
//     }
// }

// checkForMatches(anagram, filteredWordList)













// function recursivelyLookForCombinations(word) {
//     console.log(word)
//     if (checkIfWordInAnagram(word, anagramCopy)) {
//         console.log(`word: ${word} in anagram: ${anagramCopy}`)
//         currentWordsArray.push(wordListClone.splice(wordListClone.indexOf(word), 1))
//         console.log(`currentWordsArray:`)
//         console.log(currentWordsArray)
//         anagramCopy = removeWordFromAnagram(word, anagramCopy)
//         console.log(`anagram:`)
//         console.log(anagramCopy)
//         // remove all words in currentWordsArray from wordListClone
//         console.log(`remaining words:`)
//         console.log(wordListClone)
//     } else {
//         console.log(`No word: ${word} in anagram: ${anagramCopy}`)
//         wordListClone = filteredWordList.slice(0);
//         currentWordsArray = []
//         return false
//     }
    // if (checkIfWordInAnagram(word, anagramCopy)) {
    //     console.log(`word: ${word} in anagram`)
    //     currentWordsArray.push(word)
    //     anagramCopy = removeWordFromAnagram(word, anagramCopy)
    //     console.log(`remaining anagram:`)
    //     console.log(anagramCopy)
    //     wordListClone = removeWordFromArray(wordListClone, word)
    //     console.log(`remaining wordlist:`)
    //     console.log(wordListClone)
    //     if (anagramCopy.length === 0) {
    //         console.log(`anagram empty!`)
    //         arrayOfCombinations.push(currentWordArray)
    //         anagramCopy = (' ' + anagram).slice(1)
    //         currentWordsArray = [];
    //         wordListClone = filteredWordList.slice(0);
    //     } else {
    //         console.log(`recursive call`)
    //         wordListClone.forEach(word => recursivelyLookForCombinations(word))
    //     }
    // } else {
    //     console.log(`No word: ${word} in anagram`)
    //     wordListClone = removeWordFromArray(wordListClone, word)
    //     if (wordListClone.length === 0) {
    //         return false
    //     } else {
    //         wordListClone.forEach(word => recursivelyLookForCombinations(word))
    //     }
    // }
//}

function removeWordFromAnagram(anagram, word) {
    var anagramCopy = (' ' + anagram).slice(1);
    var i = word.length;
    while (i--) {
      var character = word.charAt(i);
      if (anagramCopy.includes(character)) {
         anagramCopy = anagramCopy.replace(character,'');
      }
    }
    return anagramCopy
}

function removeWordFromArray(arr) { //  Usage : removeWordFromArray(array, element1, [element2, [...]]);
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        // console.log(`remove ${what} from array`)
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

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

// wordListClone.forEach(word => recursivelyLookForCombinations(word))
function printResults() {
    console.log("arrayOfCombinations:")
    // arrayOfCombinations = Array.from(new Set(arrayOfCombinations.map(JSON.stringify)), JSON.parse)
    console.log(arrayOfCombinations.length)
}

printResults()

// reorganise and Hash those anagrams against the three hashes, and return the designated anagrams.

var easyHash = "e4820b45d2277f3844eac66c903e84be"
var difficultHash = "23170acc097c24edb98fc5488ab033fe"
var hardHash = "665e5bcb0c20062fe8abaaf4628bb154"

// console.log(`easiest secret phrase: '${sentence1}'`)
// console.log(`more difficult secret phrase: '${sentence2}'`)
// console.log(`hard secret phrase: '${sentence3}'`)