/*jshint esversion: 6 */

import React from "react";
import KeyboardInput from "./keyboardinput";
import TextContainer from "./textcontainer";
import HeaderPanel from "./headerpanel";
import CountDownTimer from "./countdowntimer";

export default class TypeRace extends React.Component {
    constructor(props) {
        super(props);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.countdownhandler = this.countdownhandler.bind(this);
        this.racetimehandler = this.racetimehandler.bind(this);
        this.totalAccurateCharacterTyped = 0;
        this.paragraph = this.props.paragraph;
        this.racetimeObj;
        this.state = {
            "isUserInputAccurate": true,
            "isInputComplete": false,
            "currentWordIndex": 0,
            "headertype": "countdown",
            "countdowntime": 5,
            "racetime": 60,
            "wpm": 0,
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
            this.setState({ 'wpm': wpm, 'racetime': obj.seconds })
        }
        else {
            this.setState({'racetime': obj.seconds })
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
        this.racetimeObj = new CountDownTimer(60, 1000);
        this.racetimeObj.onTick(this.racetimehandler);
        this.racetimeObj.start();
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

    inputChangeHandler(event) {
        if (!this.paragraph.hasWords()) {
            return;
        }
        let userInput = event.target.value;

        /**
         * If an accurate character is typed change the total accurate character typed
         * count and set new wpm. 
         */
        if (this.paragraph.getCurrentWord().startsWith(userInput)) {
            this.totalAccurateCharacterTyped = this.paragraph.getTotalCharCountAtIndex(
                this.paragraph.getCurrentIndex()) + userInput.length;
            this.setState({"wpm": this.wpmCalculator(this.racetimeObj.timePassed())});
        }

        /** A temp object is used to track the change of state and execute
         setState() only once per iteration */

        let isStateChanging = false;
        let state_temp = {};

        if (this.state.isInputComplete) {
            isStateChanging = true;
            state_temp.isInputComplete = false;

        }
        if ((this.paragraph.getCurrentWord().startsWith(userInput) && !this.state.isUserInputAccurate) ||
            (!this.paragraph.getCurrentWord().startsWith(userInput) && this.state.isUserInputAccurate)) {
            isStateChanging = true;
            state_temp.isUserInputAccurate = !this.state.isUserInputAccurate;
        }
        if (!this.paragraph.getCurrentWord().localeCompare(userInput)) {

            /**
             * When user input match desiered word we have to change states for new word.
             */
            isStateChanging = true;
            this.paragraph.updateCurrentWordIndex();
            state_temp.isInputComplete = true;
            state_temp.currentWordIndex = this.paragraph.getCurrentIndex();
        }
        if (isStateChanging) {
            this.setState(state_temp);
        }
    }

    render() {
        return (
            <div>
                <HeaderPanel
                    headertype = {this.state.headertype}
                    countdowntime = {this.state.countdowntime}
                    racetime = {this.state.racetime}
                    wpm = {this.state.wpm}
                    />
                <TextContainer
                    wordArray = {this.paragraph.getArray() }
                    currentWordIndex = {this.state.currentWordIndex}
                    />
                <KeyboardInput
                    isAccurate = {this.state.isUserInputAccurate}
                    isComplete = {this.state.isInputComplete}
                    onChange = {this.inputChangeHandler} />
            </div>
        );
    }
}
