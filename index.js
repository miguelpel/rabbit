// import modules
var fs = require('fs');
var md5 = require('md5');

// create an array from the wordlist

var wordList;
var wordExp = /\w*'*\w/g;

var contents = fs.readFileSync('wordlist', 'utf8');
wordList = contents.match(wordExp);
console.log(wordList.length);

// filter and remove from his array every entry that is not contained in original anagram
// if EVERY letter from the entry is not in the original anagram (with exception of '), remove this entry

const testAnagram = "abacks draft"
const anagram = "poultry outwits ants"

const filteredWordList = wordList.filter(word => checkIfInAnagram(word));

function checkIfInAnagram(word) {
    var count = word.length
    var i = count;
    while (i--) {
      var character = word.charAt(i);
      if (anagram.includes(character) || character === "'") {
        count--
      }
    }
    return count === 0
}

console.log(filteredWordList.length);

// give the resulting array to an algorythm (three nested loops?) that returns complete anagrams.

// Hash those anagrams against the three hashes, and return the designated anagrams.

// console.log(`easiest secret phrase: '${sentence1}'`)
// console.log(`more difficult secret phrase: '${sentence2}'`)
// console.log(`hard secret phrase: '${sentence3}'`)