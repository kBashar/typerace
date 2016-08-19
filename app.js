/*jshint esversion: 6 */

import React from "react";
import ReactDOM from "react-dom";
import RaceSession from "./racesession"
import LandingPage from "./landingpage";
import { Router, Route, Redirect, Link, browserHistory } from 'react-router'

ReactDOM.render( <Router history = {browserHistory}>
                <Route path = "/" component = {LandingPage} />
                <Route path = "typerace" component = {LandingPage} />
                <Route path = "practice" component = {RaceSession} matchType = 'practice'/>
                <Route path = "race" component = {RaceSession} matchType = 'race' />
        </Router>, document.getElementById("root"));