/*jshint esversion: 6 */

import React from "react";


export default class ScoreBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let time = this.props.time < 10 ? '0' + this.props.time : this.props.time
        let wpm = this.props.wpm < 10 ? "0"+this.props.wpm : this.props.wpm
        return (
            <div>
                <h2>Time left {time} seconds</h2>
                <h2>WPM is {wpm}</h2>
            </div>
        );
    }
}