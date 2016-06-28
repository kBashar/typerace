/*jshint esversion: 6 */

import React from "react";
import KeyboardInput from "./keyboardinput"

export default class TypeRace extends React.Component {
    constructor(props) {
        super(props);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.paragraph = this.props.paragraph;
        this.state = {
            "isUserInputAccurate": true,
            "isInputComplete": false
        };
    }


    inputChangeHandler(event) {
        let userInput = event.target.value;

        /** extra variables are used to track the change of state and execute
         setState() only once per iteration */

        let isStateChanging = false;
        let isInputComplete_temp = this.state.isInputComplete;
        let isUserInputAccurate_temp = this.state.isUserInputAccurate;

        if (this.state.isInputComplete) {
          isInputComplete_temp = false;
          isStateChanging = true;

        }
        if (( this.paragraph.getCurrentWord().startsWith(userInput) && !this.state.isUserInputAccurate) ||
           (! this.paragraph.getCurrentWord().startsWith(userInput) &&  this.state.isUserInputAccurate)) {
             isStateChanging = true;
             isUserInputAccurate_temp = !this.state.isUserInputAccurate;
        }
        if(!this.paragraph.getCurrentWord().localeCompare(userInput)) {
            console.log("10 points to griffindor");
            isStateChanging = true;
            this.paragraph.updateCurrentWordIndex();
            isInputComplete_temp = true;
        }

        if (isStateChanging) {
           this.setState({
             "isUserInputAccurate": isUserInputAccurate_temp,
             "isInputComplete": isInputComplete_temp
           });
        }
    }

    render() {
        return(
            <KeyboardInput
             isAccurate = {this.state.isUserInputAccurate}
             isComplete = {this.state.isInputComplete}
             onChange = {this.inputChangeHandler} />
        );
    }
}
