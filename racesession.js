import React from "react";
import CountDownTimer from "./countdowntimer";
import Paragraph from "./paragraph";
import HeaderPanel from "./headerpanel";
import TextPane from "./textpane";




export default class RaceSession extends React.Component {
    constructor(props) {
        super(props);
        this.onRaceStatusUpdate = this.onRaceStatusUpdate.bind(this);
        this.onScoreUpdate = this.onScoreUpdate.bind(this);
        this.race = require("./racecontroller");
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
            'selfScore': {
                wpm: 0
            }
        };
    }

    componentDidMount() {
        this.race.startRace(this.onRaceStatusUpdate, this.onScoreUpdate);
    }

    onRaceStatusUpdate(raceObj) {
        console.log("On race status update: " + raceObj.race_state);
        // There is another participants in race and race is about to start.
        if (!raceObj.race_state.localeCompare("running")) {
            var raceStartsAt = raceObj.race_starts_At;
            var timeDifference = Math.ceil((raceStartsAt - Date.now()) / 1000);
            this.startRaceIn(timeDifference);
        }
    };

    countdownhandler(obj) {
        this.setState({ countdowntime: obj.seconds })
        console.log("@ startRaceIn: " + "Race starts in: " + obj.seconds);
        if (obj.minutes === 0 && obj.seconds === 0) {
            console.log("@ startRaceIn: " + "Count down time is over startRace() is called.")
            this.startRace();
        }
    }

    racetimehandler(obj) {
        /**
         * Calculate wpm only if there are words yet to typed.
         */
        if (this.paragraph.hasWords()) {
            console.log("Race time left : " + obj.seconds + " seconds");

            let wpm = this.wpmCalculator(obj.timePassed)

            if (this.race) {
                this.race.updateWPM(wpm, Date.now())
            }

            this.setState({
                selfScore: {
                    'wpm': wpm,
                    'last_updated_at': Date.now()
                }, 'racetime': obj.seconds
            })

        }
        else {
            this.setState({ 'racetime': obj.seconds })
        }

        if (obj.minutes === 0 && obj.seconds === 0) {
            console.log("@ startRace: " + "race is finished.");
        }
    }

    startRaceIn(timeDifference) {
        console.log("@ startRaceIn: " + "Race will start in " + timeDifference + "seconds");
        var countdowntimer = new CountDownTimer(timeDifference, 1000);
        countdowntimer.onTick(this.countdownhandler);
        countdowntimer.start();
    }

    startRace() {
        this.setState({ 'headertype': 'scoreboard' })
        this.racetimeObj.onTick(this.racetimehandler);
        this.racetimeObj.start();
        this.setState({ "isInputActive": true })

        console.log("@ startRace: " + "race count down started.")
    };

    onScoreUpdate(scoreObj) {
        for (let prop in scoreObj) {
            console.log(scoreObj[prop]);
        }
        this.setState(
            {
                "oponentsScore": scoreObj
            }
        );
    };

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
                "selfScore": {
                    'wpm': wpm,
                    'last_updated_at': Date.now()
                }
            }
        );

        if (this.race) {
            this.race.updateWPM(wpm, Date.now());
        }
    }

    render() {
        return (
            <div>
                <HeaderPanel
                    headertype = {this.state.headertype}
                    countdowntime = {this.state.countdowntime}
                    racetime = {this.state.racetime}
                    selfScore = {this.state.selfScore}
                    oponentsScore = {this.state.oponentsScore}
                    />
                <TextPane
                    isActive = {this.state.isInputActive}
                    paragraph = {this.paragraph}
                    onAccurateCharacterTyped = {this.onAccurateCharacterTyped} />
            </div>
        );
    }
}