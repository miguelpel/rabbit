const fs = require('fs');
const helperFunctions = require('../helperFunctions')
const _ = require('lodash')

const anagram = "poultry outwits ants"

//total's,tots,u,up,ry,win

const testAnagram = "brig brig's abaci"

const sortedTrimmedAnagram = helperFunctions.removeSpCharAndSort(anagram)
// const sortedTrimmedAnagram = helperFunctions.removeSpCharAndSort(testAnagram)
// console.log(sortedTrimmedTestAnagram)

// remaining word list

const wholeLineExp = /\w+('\w*)*\n/g;
const newLinesExp = /\r?\n|\r/g;

var contents = fs.readFileSync('wordlist', 'utf8');
// var contents = fs.readFileSync('test', 'utf8');

const brutWordList = contents.match(wholeLineExp)

let refinedWordList = []
brutWordList.forEach(word => {
    refinedWordList.push(word.replace(newLinesExp, ''))
})

const wordList = helperFunctions.removeIncompatibleWords(sortedTrimmedAnagram, refinedWordList)

const wordListWoutDoubles = helperFunctions.removeDoubles(wordList)

console.log(brutWordList.length);
console.log(refinedWordList.length)
console.log(wordList.length)
console.log(wordListWoutDoubles.length);

// console.log(wordList)

// Usage of the reduceWordarrayByAlfa
// const cutWordList = helperFunctions.reduceWordArrayByAlfa(''.charAt(0), wordList)

// getPossibleCombinations(sortedTrimmedTestAnagram, wordList)
let possibleWords = []
let removedWords = []


//TESTS FOR REMOVE WORD FROM ANAGRAM
// let words = ['abaci', 'brig', 'brig\'s']
// function test(anagr, words) {
//     words.forEach(word => {
//         anagr = helperFunctions.removeWordFromAnagram(anagr, word)
//         console.log(word)
//         console.log(anagr)
//     })
//     console.log(anagr)
// }

// test(sortedTrimmedTestAnagram, words)

getPossibleCombinations(sortedTrimmedAnagram, wordListWoutDoubles)
// getPossibleCombinations(sortedTrimmedTestAnagram, wordList)

function removeCurrentWordAndSortRest(currentWord) {
    //
    // fs.appendFileSync("./removed", currentWord + "\n");
    if (currentWord) {
        removedWords.push(currentWord)
    }
    // !!! TESTS !!!
    let wholeRemainingWords = wordListWoutDoubles.filter( word => !removedWords.includes(word))
    // console.log("removed words:")
    // console.log(removedWords)
    console.log(`REMOVED ${currentWord}`)
    // console.log(wholeRemainingWords)
    possibleWords = []
    // console.log(wholeRemainingWords.length)
    // return
    if (wholeRemainingWords && wholeRemainingWords.length > 0 && currentWord) {
        setTimeout(
            function(err, result) {
                getPossibleCombinations(sortedTrimmedAnagram, wholeRemainingWords)
            }, 10
        )
        
    } else {
        console.log("done")
        return
    }
}

function getPossibleCombinations(anagram, wordsArr) {
    
    let currentWord = wordsArr[0]

    // if (currentWord) {
    //     console.log(`GETTING POSSIBLES COMBINATIONS FOR WORD: ${currentWord}`)
    // }

    // let oldPossibleWords = possibleWords

    // let oldRemainingWords = wordsArr
    
    // get the word out of the wordsArr
    let remainingWordsArr = helperFunctions.removeWordFromArray(wordsArr, currentWord)

    // get the whole wordsArr without this word
    // let allRemainingWords = helperFunctions.removeWordFromArray(wordList, word)

    let oldAnagram = anagram
    // is this word in anagram?
    let newAnagram = helperFunctions.removeWordFromAnagram(anagram, currentWord)

    if (typeof newAnagram === "string") {
        if (newAnagram.length > 0) {
            if (remainingWordsArr.length > 0) {
                // console.log("PRE TEST")
                let filteredRemainingWords = helperFunctions.removeIncompatibleWords(newAnagram, remainingWordsArr)
                // print(filteredRemainingWords)
                if (filteredRemainingWords.length > 0 && filteredRemainingWords) {
                    possibleWords.push(currentWord)
                    console.log("REMAINING FILTERED WORDS")
                    console.log(`ANAGRAM: ${newAnagram}`)
                    // console.log(`REMAINING WORDS: ${filteredRemainingWords.length}`)
                    getPossibleCombinations(newAnagram, filteredRemainingWords)
                } else {
                    console.log("NO REMAINING FILTERED WORDS")
                    // removeCurrentWordAndSortRest(possibleWords[0])
                    getPossibleCombinations(oldAnagram, remainingWordsArr)
                }
            } else {
                console.log("NO REMAINING WORDS")
                // removedWords.push(possibleWords[0])
                removeCurrentWordAndSortRest(possibleWords[0])
            }
        } else {
            console.log("ANAGRAM EMPTY !")
            possibleWords.push(currentWord)
            fs.appendFileSync("./results", possibleWords + "\n");
            removeCurrentWordAndSortRest(possibleWords[0])
        }

    } else {
        console.log(`ANAGRAM FALSE: ${newAnagram}`)
        // removeCurrentWordAndSortRest(possibleWords[0])
        removeCurrentWordAndSortRest(currentWord)
        // getPossibleCombinations(oldAnagram, remainingWordsArr)
    }

    function print(filteredWords = []) {
        console.log("current word:")
        console.log(currentWord)
        console.log("remaining words Arr")
        console.log(remainingWordsArr)
        console.log('old anagram:')
        console.log(oldAnagram)
        console.log("new anagram:")
        console.log(newAnagram)
        console.log("filtered words:")
        console.log(filteredWords)
        console.log("possible words:")
        console.log(possibleWords)
        console.log("removed words:")
        console.log(removedWords)
    }

}