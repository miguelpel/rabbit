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

module.exports.removeDoubles = (arr) => {
    let x = (arr) => arr.filter((v,i) => arr.indexOf(v) === i)
    let result = x(arr);
    return result
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