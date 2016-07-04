import React from "react";
import RaceSession from "./racesession"

export default class Landingpage extends React.Component {
    constructor(props) {
        super(props);
        this.practiceClicked = this.practiceClicked.bind(this);
        this.raceClicked = this.raceClicked.bind(this);
        this.state = { "page": "landing" };
    }

    raceClicked() {
        this.setState({ "page": "race" });
    }

    practiceClicked() {
        this.setState({ "page": "practice" });
    }


    render() {
        if (!this.state.page.localeCompare("practice")) {
            return <RaceSession matchType = "practice" />
        }
        else if (!this.state.page.localeCompare("race")) {
            return <RaceSession matchType = "race" />;
        }
        else {
            return (<div>
                <div>
                <button onClick = {this.practiceClicked}>
                    <h2>Practice</h2>
                </button>
                </div>
                <div>
                <button onClick={this.raceClicked}>
                    <h2>Race</h2> </button>
                    </div>
            </div>);
        }
    }
}