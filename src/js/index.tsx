import Wrapper from "./components/Wrapper.jsx"
import ReactDOM from "react-dom"
import React from "react"
import "../scss/index.scss"
import initIcons from "./icons"
import ReactGA from "react-ga"
import secret from "../../secret"

ReactGA.initialize(secret.analytics.google);
ReactGA.pageview(window.location.pathname + window.location.search);

initIcons()

window.addEventListener("load", (_) => {
    const app = document.querySelector("#app")
    app ? ReactDOM.render(<Wrapper />, app) : false
})
