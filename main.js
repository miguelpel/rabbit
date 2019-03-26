const fs = require('fs');
const helperFunctions = require('./helperFunctions')
const md5 = require('md5');

const anagram = "poultry outwits ants"

const sortedTrimmedAnagram = helperFunctions.removeSpCharAndSort(anagram)

const wholeLineExp = /\w+('\w*)*\n/g;
const newLinesExp = /\r?\n|\r/g;

var contents = fs.readFileSync('./data/wordlist', 'utf8');

const brutWordList = contents.match(wholeLineExp)

let refinedWordList = []
brutWordList.forEach(word => {
    refinedWordList.push(word.replace(newLinesExp, ''))
})

const wordList = helperFunctions.removeIncompatibleWords(sortedTrimmedAnagram, refinedWordList)

const wordListWoutDoubles = helperFunctions.removeDoubles(wordList)

let possibleWords = []
let removedWords = []

getPossibleCombinations(sortedTrimmedAnagram, wordListWoutDoubles)

function getPossibleCombinations(anagram, wordsArr) {
    wordsArr.forEach(word => {
        possibleWords.push(word)
        findFirstWord(anagram, helperFunctions.removeWordFromArray(wordsArr, word))
        .then(responseObj => {
            if (!responseObj) {
                possibleWords = []
                return
            } else {
                possibleWords.push(responseObj.word)
                if (responseObj.anagramRest.length === 0) {
                    recordWordCombination()
                } else {
                    getPossibleCombinations(responseObj.anagramRest, responseObj.listRest)
                }
            }           
        })
    })
    
}



function recordWordCombination() {
    fs.appendFileSync("./possibleresults", possibleWords + "\n");
    possibleWords = [];
    console.log("recorded")
    return true;
}

async function findFirstWord(anagram, wordsList) {
    let returnObject = {word: '', anagramRest: '', listRest: []}
    while (returnObject.word === '' && wordsList.length > 0) {
        let word = wordsList[0]
        let anag = helperFunctions.removeWordFromAnagram(anagram, word)
        if (anag) {
            returnObject.word = word;
            returnObject.anagramRest = anag;
            returnObject.listRest = helperFunctions.removeIncompatibleWords(anag, helperFunctions.removeWordFromArray(wordsList, word));
            console.log(returnObject.anagramRest)
            console.log(returnObject.word)
            console.log(returnObject.listRest.length)
            return returnObject
        } else {
            wordsList = helperFunctions.removeWordFromArray(wordsList, word)
        }
    }
    return false
}





process.on('unhandledRejection', (err) => {
    console.error(err)
    process.exit(1)
})