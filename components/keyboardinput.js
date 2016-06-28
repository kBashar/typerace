/*jshint esversion: 6 */

import React from "react"

export default class KeyboardInput extends React.Component {
    constructor(props) {
        super(props);
        //this.inputChangeHandler = this.inputChangeHandler.bind(this);
    }

    render() {
        const notAccurateStyle = {
            backgroundColor: 'red'
        };

        return(
            <input
            style = {this.props.isAccurate ? {}:notAccurateStyle}
            type = "text"
            ref ={(input) => {
                if(input != null) {
                    input.value = this.props.isComplete ? "":input.value;
                }
            }}
            onChange = {this.props.onChange}>
            </input>
        );
    }
}
