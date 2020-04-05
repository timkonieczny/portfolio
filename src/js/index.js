import Wrapper from "./components/Wrapper.jsx";
import ReactDOM from "react-dom";
import React from "react";

// TODO: Use React Router

window.addEventListener("load", _ => {
    const app = document.querySelector("#app");
    app ? ReactDOM.render(<Wrapper />, app) : false;
})