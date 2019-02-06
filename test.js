var fs = require('fs');
var functions = require('./functions')

var wordList;
var wordExp = /\w*'*\w/g;

var contents = fs.readFileSync('wordlist', 'utf8');
// var contents = fs.readFileSync('test', 'utf8');
wordList = contents.match(wordExp);
console.log(wordList.length);

// const anagram = "abaft ab saback"
const anagram = "poultry outwits ants"

const trimmedAnagram = anagram.replace(/\s+/g, '')

const filteredWordList = functions.removeIncompatibleWords(trimmedAnagram, wordList)

console.log(filteredWordList.length)

// remove all words that have zero results AND anagram !== ''

// function test1()

function sieve1(wordList) {
    var emptyAnagram = 0
    var wordswithFollowUp = []
    wordList.forEach(word => {
        var wordlist = functions.removeWordFromArray(wordList, word)
        var anagr = functions.removeWordFromAnagram(trimmedAnagram, word)
        if (anagr) {
            if (anagr.length === 0) {
                return word
                // emptyAnagram++
            } else {
                wordlist = functions.removeIncompatibleWords(anagr, wordlist)
                if (wordlist) {
                    wordswithFollowUp.push(word)
                    // console.log(wordlist.length)
                }
            }
        }
    })
    return wordswithFollowUp
}

var wordswithFollowUp = sieve1(filteredWordList)
console.log("words with follow Up:")
console.log(wordswithFollowUp.length)



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
