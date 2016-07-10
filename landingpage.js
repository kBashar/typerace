import React from "react";
import RaceSession from "./racesession"
import { Router, Route, Link, browserHistory } from 'react-router'

export default class Landingpage extends React.Component {
    render() {
        return (<div>
            <div>
                <Link to='/practice'>
                    <button >
                        <h2>Practice</h2>
                    </button>
                </Link>
            </div>
            <div>
                <Link to='race'>
                    <button >
                        <h2>Race</h2>
                    </button>
                </Link>
            </div>
        </div>);
    }
}