/*jshint esversion: 6 */

import React from "react";
import ReactDOM from "react-dom";
import TypeRace from "./components/typerace";
import Paragraph from "./paragraph";


var paragraph = new Paragraph("The difference is scoping. var is scoped to me");
ReactDOM.render(<TypeRace paragraph = {paragraph} />, document.getElementById("root"));

