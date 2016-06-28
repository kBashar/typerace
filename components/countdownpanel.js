import React from "react";

export default class CountDownPanel extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let time = this.props.time < 10 ? '0' + this.props.time : this.props.time
        return (
            <div>
                <h2>Time left {time} seconds</h2>
            </div>
        );
    }
}