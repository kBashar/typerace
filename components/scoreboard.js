import React from "react";


export default class ScoreBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {time: props.time, wpm: props.wpm};
    }
    render() {
        return (
            <div>
                score is {this.props.score}
            </div>
        );
    }
}