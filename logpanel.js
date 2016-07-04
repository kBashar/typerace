import React from "react";

export default class LogPanel extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h2>{this.props.log}</h2>
            </div>
        );
    }
}