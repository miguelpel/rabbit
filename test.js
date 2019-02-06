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

// console.log(orderedTrimmedanagram)
const filteredWordList = functions.removeIncompatibleWords(trimmedAnagram, wordList);

console.log(filteredWordList.length)

// remove all words that have zero results AND anagram !== ''

// function test1()

function sifter1(wordList, anagram) {
    var emptyArray = 0
    var wordswithFollowUp = []
    wordList.forEach(word => {
        var wordlist = functions.removeWordFromArray(wordList, word)
        var anagr = functions.removeWordFromAnagram(anagram, word)
        if (anagr) {
            if (anagr.length === 0) {
                emptyArray ++
                // return word
            } else {
                wordlist = functions.removeIncompatibleWords(anagr, wordlist)
                if (wordlist) {
                    wordswithFollowUp.push(word)
                }
            }
        }
    })
    console.log("emptyArray:")
    console.log(emptyArray)
    console.log("words with follow Up:")
    console.log(wordswithFollowUp.length)
    return wordswithFollowUp
}

var firstSifterResults = sifter1(filteredWordList, trimmedAnagram)
console.log(firstSifterResults[0])
console.log(firstSifterResults[1])
// firstSifterResults.forEach(word => {
//     sifter2(word, firstSifterResults, trimmedAnagram)
// })
// var secondSifterResults = sifter2(firstSifterResults, trimmedAnagram)
// console.log('second stifer results :')
// console.log(secondSifterResults.length)

// function sifter2(word, wordList, anagram) {
//     // var words = []
//     var word1 = word
//     console.log(word1)
//     // words.push(word1)
//     var restOfTheWordList = functions.removeWordFromArray(wordList, word1)
//     var restOfAnagram = functions.removeWordFromAnagram(anagram, word1)
//     var restWithFollowUp = sifter1(restOfTheWordList, restOfAnagram)
//     return restWithFollowUp

// }


// test1(filteredWordList)

// const word = 'poultryoutwitsants'

// console.log(word)


// var anagr = functions.removeWordFromAnagram(trimmedAnagram, word)
// console.log(anagr.length)

// console.log(trimmedAnagram)

// var wordlist = functions.removeWordFromArray(filteredWordList, word)
// console.log(wordlist.length)
// var anagr = functions.removeWordFromAnagram(trimmedAnagram, word)
// console.log(anagr)
// if anagr empty, anagr.length === 0
// if (anagr) {
//     wordlist = functions.removeIncompatibleWords(anagr, wordlist)
//     if (wordlist) {
//         console.log(wordlist.length)
//     }
// }


// remove all words that have zero results

// var result = Array.from(new Set(arr.map(JSON.stringify)), JSON.parse)
