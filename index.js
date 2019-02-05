// import modules
var fs = require('fs');
var md5 = require('md5');

// create an array from the wordlist

var wordList;
var wordExp = /\w*'*\w/g;

var contents = fs.readFileSync('test', 'utf8');
wordList = contents.match(wordExp);
console.log(wordList);

// filter and remove from his array every entry that is not contained in original anagram

// give the resulting array to an algorythm (three nested loops?) that returns complete anagrams.

// Hash those anagrams against the three hashes, and return the designated anagrams.

// console.log(`easiest secret phrase: '${sentence1}'`)
// console.log(`more difficult secret phrase: '${sentence2}'`)
// console.log(`hard secret phrase: '${sentence3}'`)