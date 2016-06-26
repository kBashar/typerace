function Paragraph(paragraph_text) {
            var wordArray = paragraph_text.split(" ");
            var currentWordIndex = 0;
            var prevTotalCharCount = 0;
            var totalCharCountArray = [];
            wordArray.forEach(function(str, index, array) {
                    var previousCount = (index === 0) ? 0 : totalCharCountArray[index-1];
                    var spaceCount = (index === (array.length-1)) ? 0: 1;
                    totalCharCountArray.push(previousCount + str.length + spaceCount);
                });
            
            this.getTotalCharCountAtIndex = function(index) {
                console.log("requested for: " + index);
                return index < 0 ? 0 : totalCharCountArray[index];
            }
            this.getArray = function() {
                return wordArray;
            }
            this.getCurrentIndex = function() {
                return currentWordIndex;
            }
            this.getText = function() {
                return paragraph_text;
            }
            this.getCurrentWord = function() {
                return wordArray[currentWordIndex];
            } 
            this.hasWords = function() {
                return wordArray.length - 1 > currentWordIndex
            }
            this.updateCurrentWordIndex = function() {
                currentWordIndex = this.hasWords() ? currentWordIndex+1 : -1
                
            }
        };