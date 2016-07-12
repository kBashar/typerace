import React from 'react'
import {Link} from 'react-router'
import Landingpage from './landingpage'
import RaceSession from './racesession'


export default class ResultPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let str;
        let path = "/" + this.props.matchType;
        var arr = this.props.score.map((value, i) => {
            if (!value.name.localeCompare("self")) {
                return (<li key = {i}> Your WPM is <strong className="wpm_value">{value.wpm} </strong></li>)
            }
            else {
                return (<li key = {i}> {value.name} WPM is <strong className="wpm_value">{value.wpm}</strong> </li>)
            }
        })
        if (!this.props.matchType.localeCompare("race")) {
            str = "Race ";

        }
        if (!this.props.matchType.localeCompare("practice")) {
            str = "Practice "
        }

        return (
            <div id="result_container">
                <div id="result">
                    <ul>
                        {arr}
                    </ul>
                </div>
                <div id="footer">
                    <div>Go back to <Link to="/" component={Landingpage}>home</Link></div>
                    //<div>{str} <Link to={path} component = {RaceSession}>more</Link></div>
                </div>
            </div>
        );
    }
}