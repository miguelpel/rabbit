module.exports.deepLook = (arrOfArr, arr) => {
    var length = arr.length
    var count = 0
    var result = false
    arrOfArr.forEach(elm => {
        elm.forEach((item, i) => {
            if (item === arr[i]) {
                count++
            }
            if (count === length) result = true
        })
    })
    return result
}

module.exports.removeWordFromAnagram = (anagram, word) => {
    var anagramCopy = (' ' + anagram).slice(1);
    var i = word.length;
    while (i--) {
      var character = word.charAt(i);
      if (anagramCopy.includes(character)) {
         anagramCopy = anagramCopy.replace(character,'');
      } else {
          return false
      }
    }
    return anagramCopy
}

module.exports.removeWordFromArray = (arr, word) => { //  Usage : removeWordFromArray(array, element1, [element2, [...]]);
    var filtered = arr.filter(function(value, index, arr){
        return value != word;
    });
    return filtered;
}

module.exports.removeIncompatibleWords = (anagram, wordList) => {
    var resultArr = wordList.filter(word => checkIfWordInAnagram(word, anagram))
    if (resultArr.length > 0) return resultArr
    return false
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