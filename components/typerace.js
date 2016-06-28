import React from "react";
import KeyboardInput from "./keyboardinput"

export default class TypeRace extends React.Component {
    constructor() {
        super();
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.currentWord = "hello "
        this.paragraph = this.props.paragraph;
        this.state = {
            "isUserInputAccurate": true
        };
    }
    
    
    inputChangeHandler(event) {
        let userInput = event.target.value;
        
        if ((this.currentWord.startsWith(userInput) && !this.state.isUserInputAccurate) ||
           (!this.currentWord.startsWith(userInput) &&  this.state.isUserInputAccurate)) {
             this.setState({isUserInputAccurate: !this.state.isUserInputAccurate});
        }
        
    }
    
    render() {
        return(
            <KeyboardInput 
             isAccurate = {this.state.isUserInputAccurate}
             onChange = {this.inputChangeHandler} />
        );
    }
}