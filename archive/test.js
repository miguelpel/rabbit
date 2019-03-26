var fs = require('fs');
var functions = require('./functions')
var _ = require('lodash')

var wordList;
var wordExp = /\w*'*\w/g;

var contents = fs.readFileSync('wordlist', 'utf8');
// var contents = fs.readFileSync('test', 'utf8');
wordList = _.uniq(contents.match(wordExp));
console.log(wordList.length);

// const anagram = "abaft ab saback"
const anagram = "poultry outwits ants"

const trimmedAnagram = anagram.replace(/\s+/g, '')

// const orderedTrimmedanagram = trimmedAnagram.sort()

console.log(trimmedAnagram)
const filteredWordList = functions.removeIncompatibleWords(trimmedAnagram, wordList);

console.log(filteredWordList.length)

// remove all words that have zero results

// function test1()

var firstSifterResults = sifter1(filteredWordList, trimmedAnagram)
console.log(firstSifterResults.length)
var wordsWithMatches = []

if (!fs.existsSync("./resultstest")) {
    console.log("file doesn't exists")
    firstSifterResults.forEach(word => {
        sifter2(word, firstSifterResults, trimmedAnagram)
    })

    console.log('words with matches:')
    console.log(wordsWithMatches)
    var wordsMatchedWithoutDoubles = functions.removeDoubles(wordsWithMatches)
    console.log('filtered words with matches:')
    console.log(wordsMatchedWithoutDoubles)
    wordsMatchedWithoutDoubles.forEach(word => {
        try {
            fs.appendFileSync("./resultstest", word + '\n');
          } catch (err) {
            console.log(err.message)
          }
    })
} else {
    console.log("file exists")
    var contents = fs.readFileSync("./resultstest", 'utf8');
    // var contents = fs.readFileSync('test', 'utf8');
    reducedWordList = contents.match(wordExp);
    // console.log(reducedWordList)
    reducedWordList.forEach(word => {
        console.log(word)
        getAllMatches(word)
    })
}


function sifter1(wordList, anagram) {
    var wordswithFollowUp = []
    wordList.forEach(word => {
        var wordlist = functions.removeWordFromArray(wordList, word)
        var anagr = functions.removeWordFromAnagram(anagram, word)
        if (typeof anagr === "string") {
            if (anagr.length === 0) {
                return word
            } else {
                wordlist = functions.removeIncompatibleWords(anagr, wordlist)
                if (wordlist) {
                    wordswithFollowUp.push(word)
                } else {
                    return false
                }
            }
        }
    })
    // console.log("words with follow Up:")
    console.log(wordswithFollowUp.length)
    return wordswithFollowUp
}

// DON'T WORK
// function sifter2(word, wordList, anagram) {
//     var restOfTheWordList = functions.removeWordFromArray(wordList, word)
//     var restOfAnagram = functions.removeWordFromAnagram(anagram, word)
//     var restWithFollowUp = sifter1(restOfTheWordList, restOfAnagram)
//     if (typeof restWithFollowUp === "string") {
//         wordsWithMatches.push(word)
//     }
//     if (restWithFollowUp && restWithFollowUp.length > 0) {
//         sifter2(restWithFollowUp[0], restWithFollowUp, restOfAnagram)
//     } else {
//         return
//     }
// }



// may return false, or an array of arrays of words
function getAllMatches(word, anagram, wordList) {
    }

    // sifter1 takes an array of words and an anagram, and returns:
    // either an array of words, => add the current word to combination
    // either a word => add the combination to combinations
    // either false => reset the combination