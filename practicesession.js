import React from "react";
import CountDownTimer from "./countdowntimer";
import Paragraph from "./paragraph";
import HeaderPanel from "./headerpanel";
import TextPane from "./textpane";


export default class PracticeSession extends React.Component {
    constructor(props) {
        super(props);
        this.onAccurateCharacterTyped = this.onAccurateCharacterTyped.bind(this);
        this.countdownhandler = this.countdownhandler.bind(this);
        this.racetimehandler = this.racetimehandler.bind(this);
        this.paragraph = new Paragraph("The difference is scoping. var is scoped to me");
        this.totalAccurateCharacterTyped = 0;
        this.racetimeObj = new CountDownTimer(60, 1000);;
        this.state = {
            "headertype": "countdown",
            "countdowntime": 5,
            "isInputActive": false,
            "racetime": 60,
            "scoreObj": {
                'self': {
                    wpm: 0
                }
            }
        };
    }

    countdownhandler(obj) {
        this.setState({ countdowntime: obj.seconds })
        // Time is up
        if (obj.minutes === 0 && obj.seconds === 0) {
            //userInput.disabled = false;
            //userInput.focus();
            this.startRace();
        }
    }

    racetimehandler(obj) {
        /**
         * Calculate wpm only if there are words yet to typed.
         */
        if (this.paragraph.hasWords()) {
            let wpm = this.wpmCalculator(obj.timePassed)
            this.setState({
                "scoreObj": {
                    self: {
                        'wpm': wpm,
                        'last_updated_at': Date.now()
                    }
                }, 'racetime': obj.seconds
            })
        }
        else {
            this.setState({ 'racetime': obj.seconds })
        }
    }

    /**
         * Race will start in given seconds
         */
    startRaceIn(timeSeconds) {
        var cdTimer = new CountDownTimer(timeSeconds, 1000);
        cdTimer.onTick(this.countdownhandler);
        cdTimer.start();
    }

    startRace() {
        this.setState({ 'headertype': 'scoreboard' })
        this.racetimeObj.onTick(this.racetimehandler);
        this.racetimeObj.start();
        this.setState({ "isInputActive": true })
    }

    componentDidMount() {
        this.startRaceIn(this.state.countdowntime)
    }

    wpmCalculator(timePassedInSeconds) {
        if (this.totalAccurateCharacterTyped > 0) {
            var totalWord = this.totalAccurateCharacterTyped / 5;
            var WPS = totalWord / timePassedInSeconds;
            var WPM = Math.round(WPS * 60);
            return WPM;
        }
        return 0;
    }

    onAccurateCharacterTyped(totalCharacterTyped) {
        this.totalAccurateCharacterTyped = totalCharacterTyped;
        let timePassed = this.racetimeObj.timePassed();
        let wpm = this.wpmCalculator(this.racetimeObj.timePassed());
        this.setState(
            {
                "scoreObj": {
                    "self": {
                        'wpm': wpm,
                        'last_updated_at': Date.now()
                    }
                }
            }
        );
    }

    render() {
        return (
            <div>
                <HeaderPanel
                    headertype = {this.state.headertype}
                    countdowntime = {this.state.countdowntime}
                    racetime = {this.state.racetime}
                    scoreObj = {this.state.scoreObj}
                    />
                <TextPane
                    isActive = {this.state.isInputActive}
                    paragraph = {this.paragraph}
                    onAccurateCharacterTyped = {this.onAccurateCharacterTyped} />
            </div>
        );
    }
}