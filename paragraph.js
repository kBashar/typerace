/*jshint esversion: 6 */

export default class Paragraph {
    constructor(paragraph_text) {
         this.wordArray = paragraph_text.split(" ");
         this.currentWordIndex = 0;
         let totalCharCountArray = [];
         wordArray = wordArray.map((val,i) => {
             return (i===wordArray.length-1) ? val : val + " ";
            });
         wordArray.forEach(function (str, index, array) {
             let previousCount = (index === 0) ? 0 : totalCharCountArray[index - 1];
            totalCharCountArray.push(previousCount + str.length);
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