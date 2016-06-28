import React from "react";
import KeyboardInput from "./keyboardinput"

export default class TypeRace extends React.Component {
    constructor() {
        super()
        this.inputChangeHandler = this.inputChangeHandler.bind(this)
    }
    
    
    inputChangeHandler(event) {
        console.log("hello")
        console.log(event)
    }
    
    render() {
        return(
            <KeyboardInput word = "hello" onInputChange = {this.inputChangeHandler} />
        );
    }
}