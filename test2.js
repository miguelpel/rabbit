const fs = require('fs');
const helperFunctions = require('./helperFunctions')
const _ = require('lodash')

const anagram = "poultry outwits ants"
const sortedTrimmedAnagram = helperFunctions.removeSpCharAndSort(anagram)

const testAnagram = "brigade ab's abaft"
const sortedTrimmedTestAnagram = helperFunctions.removeSpCharAndSort(testAnagram)
console.log(sortedTrimmedTestAnagram)

// remaining word list

const wordExp = /\w*'*\w/g;

// var contents = fs.readFileSync('wordlist', 'utf8');
var contents = fs.readFileSync('test', 'utf8');
const wordList = helperFunctions.removeIncompatibleWords(sortedTrimmedTestAnagram, _.uniq(contents.match(wordExp)))
console.log(wordList.length);

// console.log(wordList)

// Usage of the reduceWordarrayByAlfa
// const cutWordList = helperFunctions.reduceWordArrayByAlfa(''.charAt(0), wordList)

getPossibleCombinations(sortedTrimmedTestAnagram, wordList)

function getPossibleCombinations(anagram, wordsArr) {
    wordsArr.forEach(word => {
        //get a word:
        // console.log(word)
        // add it to the possibleresults
        fs.appendFileSync("./possibleresults", word + " ");
        // remove it from anagram
        let newAnagram = helperFunctions.removeWordFromAnagram(anagram, word)
        // remove it from the wordList
        let newWordsArr = helperFunctions.removeWordFromArray(wordsArr, word)


        let remainingWords
        // trim the word array !!! what if the Anagram is false?
        if (newAnagram) {
            newWordsArr = helperFunctions.reduceWordArrayByAlfa(newAnagram.charAt(0), newWordsArr)
            remainingWords = helperFunctions.removeIncompatibleWords(newAnagram, newWordsArr)
        } else {
            remainingWords = newWordsArr
        }


        console.log(remainingWords.length)

        
        if (typeof newAnagram === "string" && newAnagram.length === 0) {
            // the anagram is empty. It means that we have a match
            // Add this word to the file "possibleresults"
            // fs.appendFileSync("./possibleresults", word);
            // transfer possibleresults to file "results"
            let result = fs.readFileSync("./possibleresults");
            fs.appendFileSync("./results", result + "\n");
            // delete possibleresults file
            if (fs.existsSync("./possibleresults")) {
                fs.unlinkSync("./possibleresults")
            }
        } else if (typeof newAnagram === "string" && remainingWords.length > 0) {
            // continue
            getPossibleCombinations(newAnagram, remainingWords)
        } else if (!newAnagram || remainingWords.length === 0) {
            // simply delete the possibleresults file
            if (fs.existsSync("./possibleresults")) {
                fs.unlinkSync("./possibleresults")
            }
        } else {
            // the anagram test returned false, but there're still words in the array
            // continue without adding the word to the possibleresults
            getPossibleCombinations(newAnagram, remainingWords)
        }
    })
}