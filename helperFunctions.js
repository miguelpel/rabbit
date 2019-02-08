const sortString = (str) => {
    return str.split('').sort().join('');
}

const removeSpecialChars = (str) => {
    return str.replace(/\s+/g, '').replace(/'/g, '')
}

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

module.exports.removeSpCharAndSort = (str) => {
    return sortString(removeSpecialChars(str))
}

// allows to reduce the word list using the first letter of remaining anagram
module.exports.reduceWordArrayByAlfa = (char, arr) => {
    if (char === '') return arr
    const index = arr.findIndex(elm => elm.charAt(0) === char)
    // console.log(index)
    if (index < 0) return []
    return arr.slice(index)
}

module.exports.removeIncompatibleWords = (anagram, wordList) => {
    var resultArr = wordList.filter(word => checkIfWordInAnagram(word, anagram))
    if (resultArr.length > 0) return resultArr
    return []
}

//  Usage : removeWordFromArray(array, element1, [element2, [...]]);
module.exports.removeWordFromArray = (arr, word) => {
    var filtered = arr.filter(function(value){
        return value != word;
    });
    return filtered;
}

module.exports.removeWordFromAnagram = (anagram, word) => {
    if (!anagram) return false;
    if (!word) return false;
    if (word.length > anagram.length) return false
    var anagramCopy = (' ' + anagram).slice(1);
    // console.log(anagramCopy)
    var i = word.length;
    while (i--) {
      var character = word.charAt(i);
    //   console.log(character)
      if (anagramCopy.includes(character)) {
         anagramCopy = anagramCopy.replace(character,'');
      } else if (character === "'") {
        continue
      } else {
          return false
      }
    }
    return anagramCopy
}

// do we need this ?
module.exports.getNextWord = (remainingAnagram, wordsArr) => {
    // returns next word and array
}
