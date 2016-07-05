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
                    totalCharCount = {that.props.totalCharCount}
                    currentCharCount = {that.props.selfScore.currentCharCount}
                    updated_at = {that.props.selfScore.last_updated_at}/>);
                for (let player in that.props.oponentsScore) {
                    array.push(<ScoreBoard
                        key = {player}
                        player = {player}
                        totalCharCount = {that.props.totalCharCount}
                        currentCharCount = {that.props.oponentsScore[player].currentCharCount}
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
            <div id="countdown">
                <h2>{this.props.log} <span className="time">{time}</span> seconds</h2>
            </div>
        );
    }
}

class ScoreBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let wpm = this.props.wpm < 10 ? "0"+this.props.wpm : this.props.wpm
        return (
            <div className = "scoreboard">
                <h3 className = "header_element player">{this.props.player}</h3>
                <progress className = "header_element progress" 
                          value = {this.props.currentCharCount? this.props.currentCharCount:1} 
                          max = {this.props.totalCharCount}></progress>
                <h3 className = "header_element wpm">{wpm} WPM</h3>
            </div>
        );
    }
}