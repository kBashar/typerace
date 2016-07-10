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
        if (!this.props.matchType.localeCompare("race")) {
            str = "Race "
        }
        if (!this.props.matchType.localeCompare("practice")) {
            str = "Practice "
        }
        return (
            <div id="result_container">
                <div id="result">
                    <ul>
                        <li> Your WPM is <strong className="wpm_value">45 </strong></li>
                        <li> Opponent1 WPM is <strong className="wpm_value">55</strong> </li>
                    </ul>
                </div>
                <div id="footer">
                    <div>Go back to <Link to="/" component={Landingpage}>home</Link></div>
                    <div>{str} <Link to={path} component = {RaceSession} matchType = {this.props.matchType}>more</Link></div>
                </div>
            </div>
        );
    }
}