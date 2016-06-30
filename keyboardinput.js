/*jshint esversion: 6 */

import React from "react"

export default class KeyboardInput extends React.Component {
    constructor(props) {
        super(props);
        //this.inputChangeHandler = this.inputChangeHandler.bind(this);
    }

    render() {
        const notAccurateStyle = {
            backgroundColor: 'red',
        };
        let isDisabled = !this.props.isActive;        
        return(
            <input
            style = {this.props.isAccurate ? {}:notAccurateStyle}
            type = "text"
            autoComplete = {false}
            disabled = {isDisabled}
            ref ={(input) => {
                if(input != null) {
                    input.value = this.props.isComplete ? "":input.value;
                    if(this.props.isActive) {
                        input.focus();
                    }
                }
            }}
            onChange = {this.props.onChange}>
            </input>
        );
    }
}
