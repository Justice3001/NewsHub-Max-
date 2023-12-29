//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "./layout";
import Top from "./pages/Top.jsx";

//render your react application
//ReactDOM.render(<Layout />, document.querySelector("#app"));
ReactDOM.render(<Top />, document.querySelector("#app"));
