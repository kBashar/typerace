/*jshint esversion: 6 */

import React from "react";
import ReactDOM from "react-dom";
//import Paragraph from "./paragraph";
import LandingPage from "./landingpage";


//var paragraph = new Paragraph("The difference is scoping. var is scoped to me");
//ReactDOM.render(<TypeRace paragraph = {paragraph} />, document.getElementById("root"));
ReactDOM.render(<LandingPage />, document.getElementById("root"));

u1 = {
    type : "race",
    id: "race1",
    body:{
        doc: {
            pid1:{
                wpm: 12,
                accuracy: 89
            }
        }
    }
}