class Paragraph {
    constructor(paragraph_text) {
         let wordArray = paragraph_text.split(" ");
         let currentWordIndex = 0;
         let prevTotalCharCount = 0;
         let totalCharCountArray = [];
        wordArray.forEach(function (str, index, array) {
             let previousCount = (index === 0) ? 0 : totalCharCountArray[index - 1];
             let spaceCount = (index === (array.length - 1)) ? 0 : 1;
            totalCharCountArray.push(previousCount + str.length + spaceCount);
        });
    }
    getTotalCharCountAtIndex(index) {
        console.log("requested for: " + index);
        return index < 0 ? 0 : totalCharCountArray[index];
    }
    getArray() {
        return wordArray;
    }
    getCurrentIndex() {
        return currentWordIndex;
    }
    getCurrentWord() {
        return wordArray[currentWordIndex];
    }
    hasWords() {
        return wordArray.length - 1 > currentWordIndex
    }
    updateCurrentWordIndex() {
        currentWordIndex = this.hasWords() ? currentWordIndex + 1 : -1
    }
}