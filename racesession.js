import React from "react";
import CountDownTimer from "./countdowntimer";
import Race from "./race";


export default class RaceSession extends React.Component {
    constructor(props) {
        super(props);
        this.onRaceStatusUpdate = this.onRaceStatusUpdate.bind(this);
        this.onScoreUpdate = this.onScoreUpdate.bind(this);
        var race = new Race(this.onRaceStatusUpdate, this.onScoreUpdate);
    }

    componentDidMount() {
        this.race.connectForRace();
    }
    onRaceStatusUpdate(raceObj) {
        console.log("On race status update: " + raceObj.race_state);
        // There is another participants in race and race is about to start.
        if (!raceObj.race_state.localeCompare("running")) {
            var raceStartsAt = raceObj.race_starts_At;
            startRaceIn(raceStartsAt);
        }
    };

    startRaceIn(raceStartsAt) {
        var timeDifference = Math.ceil((raceStartsAt - Date.now()) / 1000);
        console.log("@ startRaceIn: " + "Race will start in " + timeDifference + "seconds");
        var countdowntimer = new CountDownTimer(timeDifference, 1000);
        countdowntimer.onTick(function (obj) {
            console.log("@ startRaceIn: " + "Race starts in: " + obj.seconds);
            if (obj.minutes === 0 && obj.seconds === 0) {
                console.log("@ startRaceIn: " + "Count down time is over startRace() is called.")
                startRace();
            }
        });
        countdowntimer.start();
    }

    startRace() {
        var countdowntimer = new CountDownTimer(5, 1000);
        countdowntimer.onTick(function (obj) {
            updateWPM(race_id, randomWPMGenarator(), Date.now())
            console.log("Race time left : " + obj.seconds + " seconds");
            if (obj.minutes === 0 && obj.seconds === 0) {
                console.log("@ startRace: " + "race is finished.");
            }
        });
        countdowntimer.start();
        console.log("@ startRace: " + "race count down started.")
    };

    onScoreUpdate(scoreObj) {
        for(var pid in scoreObj) {
            console.log("Score changed of " + this.race.participants[pid] + "to "
                 + pid.wpm +" @ " + pid.last_updated_at);
        }
    };

    render() {
        return (
            <div>race</div>
        );
    }
}