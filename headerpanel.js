import React from "react";

export default class HeaderPanel extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let panel;
        if (!this.props.headertype.localeCompare("countdown")) {
            panel = <CountDownPanel
                log  = "Race starts in "
                time = {this.props.countdowntime}/>
        }
        else {
            var that = this;
            panel = (function () {
                var array = [];
                array.push(<CountDownPanel
                    log  = "Race time left "
                    time = {that.props.racetime}
                    key = "countdown"/>);
                array.push(<ScoreBoard
                    key = "self"
                    player = "self"
                    wpm = {that.props.selfScore.wpm}
                    updated_at = {that.props.selfScore.last_updated_at}/>);
                for (let player in that.props.oponentsScore) {
                    array.push(<ScoreBoard
                        key = {player}
                        player = {player}
                        wpm = {that.props.oponentsScore[player].wpm}
                        updated_at = {that.props.oponentsScore[player].last_updated_at}/>);
                }
                return array;
            })();
        }
        return (
            <div id="headerpanel">
                {panel}
            </div>
        );
    }
}

class CountDownPanel extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let time = this.props.time < 10 ? '0' + this.props.time : this.props.time
        return (
            <div>
                <h2>{this.props.log} {time} seconds</h2>
            </div>
        );
    }
}

class ScoreBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let wpm = this.props.wpm < 10 ? "0" + this.props.wpm : this.props.wpm
        return (
            <div>
                <h2>{this.props.player}: WPM is {wpm}</h2>
            </div>
        );
    }
}