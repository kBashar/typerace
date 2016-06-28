import React from "react";
import KeyboardInput from "./keyboardinput"

export default class TypeRace extends React.Component {
    constructor() {
        super();
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.state = {
            "currentWord": "hello",
            "isAccurate": true
        };
    }
    
    
    inputChangeHandler(event) {
        let userInput = event.target.value;
        if (this.state.currentWord.startsWith(userInput) && !this.state.isAccurate) {
            this.setState({isAccurate:true});
        }
        else if(!this.state.currentWord.startsWith(userInput) && this.state.isAccurate) {
            this.setState({isAccurate:false});
        }
    }
    
    render() {
        return(
            <KeyboardInput 
             isAccurate = {this.state.isAccurate}
             onChange = {this.inputChangeHandler} />
        );
    }
}