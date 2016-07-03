/*jshint esversion: 6 */

import React from "react";


export default class ScoreBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let wpm = this.props.wpm < 10 ? "0"+this.props.wpm : this.props.wpm
        return (
            <div>
                <h2>Player {this.props.player}</h2>
                <h2>WPM is {wpm}</h2>
            </div>
        );
    }
}