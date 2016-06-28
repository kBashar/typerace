/*jshint esversion: 6 */

import React from "react";
import KeyboardInput from "./keyboardinput";
import TextContainer from "./textcontainer";

export default class TypeRace extends React.Component {
    constructor(props) {
        super(props);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.totalAccurateCharacterTyped = 0;
        this.paragraph = this.props.paragraph;
        this.state = {
            "isUserInputAccurate": true,
            "isInputComplete": false,
            "currentWordIndex":0
        };
    }




    inputChangeHandler(event) {
        let userInput = event.target.value;

        if (this.paragraph.getCurrentWord().startsWith(userInput)) {
            this.totalAccurateCharacterTyped = this.paragraph.getTotalCharCountAtIndex(
                                    this.paragraph.getCurrentIndex()) + userInput.length;
        }

        /** A temp object is used to track the change of state and execute
         setState() only once per iteration */

        let isStateChanging = false;
        let state_temp = {};
        
        if (this.state.isInputComplete) {
            isStateChanging = true;
            state_temp.isInputComplete = false;

        }
        if (( this.paragraph.getCurrentWord().startsWith(userInput) && !this.state.isUserInputAccurate) ||
           (! this.paragraph.getCurrentWord().startsWith(userInput) &&  this.state.isUserInputAccurate)) {
             isStateChanging = true;
             state_temp.isUserInputAccurate = !this.state.isUserInputAccurate;
        }
        if(!this.paragraph.getCurrentWord().localeCompare(userInput)) {
            isStateChanging = true;
            this.paragraph.updateCurrentWordIndex();
            state_temp.isInputComplete = true;
            state_temp.currentWordIndex = this.paragraph.getCurrentIndex();
        }
        if (isStateChanging) {
           this.setState(state_temp);
        }
    }

    render() {
        return(
            <div>
            <TextContainer
            wordArray = {this.paragraph.getArray()}
            currentWordIndex = {this.state.currentWordIndex}
            />
            <KeyboardInput
             isAccurate = {this.state.isUserInputAccurate}
             isComplete = {this.state.isInputComplete}
             onChange = {this.inputChangeHandler} />
             </div>
        );
    }
}
