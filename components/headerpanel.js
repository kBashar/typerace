import React from "react";
import ScoreBoard from "./scoreboard";
import CountDownPanel from "./countdownpanel"

export default class HeaderPanel extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        let panel;
        if (!this.props.headertype.localeCompare("countdown")) {
            panel = <CountDownPanel 
                    time = {this.props.countdowntime}/>
        }
        else {
            panel = <ScoreBoard 
                    time = {this.props.racetime} 
                    wpm = {this.props.wpm}/>
        }

        return (
        <div id="headerpanel">
            {panel}
        </div>
        );
    }
}
