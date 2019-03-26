// import modules
var fs = require('fs');
var md5 = require('md5');
var _ = require('lodash');

var functions = require('./functions')

// create an array from the wordlist

var wordList;
var wordExp = /\w*'*\w/g;

// var contents = fs.readFileSync('wordlist', 'utf8');
var contents = fs.readFileSync('test', 'utf8');
wordList = contents.match(wordExp);
console.log(wordList.length);

// filter and remove from his array every entry that is not contained in original anagram
// if EVERY letter from the entry is not in the original anagram (with exception of '), remove this entry

const anagram = "abaft ab saback"
// const anagram = "poultry outwits ants"

const filteredWordList = functions.removeIncompatibleWords(anagram, wordList)

console.log(filteredWordList.length);

var anagramCopy = (' ' + anagram).slice(1)
var currentWord;
var currentWordsArray = [];
var arrayOfCombinations = []; // array containing arrays of every matching combinations




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
    // if (remainingWordList.length <= 0) {
    //     return
    // }
    // remainingWordList.forEach(word => {
    //     var currWord = word
    //     var remainingAnagramCopy = (' ' + remainingAnagram).slice(1);
    //     var remainingWordListClone = filteredWordList.slice(0);
    //     var currentWordsArrayClone = currentWordsArray.slice(0);
    //     //remove from anagram and add to currentWordsArray
    //     if (functions.checkIfWordInAnagram(currWord, remainingAnagramCopy)) {
    //         remainingAnagramCopy = functions.removeWordFromAnagram(remainingAnagramCopy, currWord)
    //         currentWordsArrayClone.push(currWord)
    //         currentWordsArrayClone.sort()
    //     } else {
    //         // console.log('no match in array')
    //         return
    //     }
    //     // remove currWord from WordListClone
    //     remainingWordListClone = functions.removeWordFromArray(remainingWordListClone, currWord)
    //     if (remainingAnagramCopy === '') {
    //         // return currentWordsArrayClone
    //         if (!functions.deepLook(arrayOfCombinations, currentWordsArrayClone)) {
    //             // console.log("match in array")
    //             // console.log(currentWordsArrayClone)
    //             arrayOfCombinations.push(currentWordsArrayClone)
                
    //         }
    //     }
    //     filterRemainingWordList(remainingAnagramCopy, remainingWordListClone, currentWordsArrayClone)
    // })
}

filterRemainingWordList(trimmedAnagram, filteredWordList)

function printResults() {
    console.log("arrayOfCombinations:")
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