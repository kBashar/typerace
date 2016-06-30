import React from "react";
import PracticeSession from "./practicesession"
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
            return <PracticeSession />
        }
        else if (!this.state.page.localeCompare("race")) {
            return <RaceSession />;
        }
        else {
            return (<div>
                <div onClick = {this.practiceClicked}>
                    <h2>Practice</h2>
                </div>
                <div onClick={this.raceClicked}>
                    <h2>Race</h2>
                </div>
            </div>);
        }
    }
}