/*jshint esversion: 6 */

import React from "react";
import ReactDOM from "react-dom";
import TypeRace from "./components/typerace";
import Paragraph from "./paragraph";


var paragraph = new Paragraph("The difference is scoping. var is scoped to the nearest function block and let is scoped to the nearest enclosing block");
ReactDOM.render(<TypeRace paragraph = {paragraph} />, document.getElementById("root"));

