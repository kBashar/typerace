/*jshint esversion: 6 */

export default class Paragraph {
    constructor(paragraph_text) {
         this.wordArray = paragraph_text.split(" ");
         this.currentWordIndex = 0;
         let totalCharCount = [];
         this.wordArray = this.wordArray.map((val,i,array) => {
             return (i===array.length-1) ? val : val + " ";
            });
         this.wordArray.forEach(function (str, index, array) {
             let previousCount = (index === 0) ? 0 : totalCharCount[index - 1];
             totalCharCount.push(previousCount + str.length);
        });
        this.totalCharCountArray = totalCharCount; 
    }
    getTotalCharCountAtIndex(index) {
        console.log("requested for: " + index);
        return index < 0 ? 0 : this.totalCharCountArray[index];
    }
    getArray() {
        return this.wordArray;
    }
    getCurrentIndex() {
        return this.currentWordIndex;
    }
    getCurrentWord() {
        return this.wordArray[this.currentWordIndex];
    }
    hasWords() {
        return this.getCurrentIndex() !== -1;
    }
    updateCurrentWordIndex() {
        let hasWords = this.wordArray.length -1 > this.currentWordIndex;
        this.currentWordIndex = hasWords ? this.currentWordIndex + 1 : -1
    }
}