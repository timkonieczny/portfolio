import Wrapper from "./components/Wrapper.jsx"
import ReactDOM from "react-dom"
import React from "react"
import "../scss/index.scss"
import ReactGA from "react-ga"
import secret from "../../secret"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
    faLongArrowAltLeft, faLongArrowAltRight, faPaperPlane,
    faRobot, faRedoAlt, faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons"
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons"



ReactGA.initialize(secret.analytics.google);
ReactGA.pageview(window.location.pathname + window.location.search);

library.add(faLongArrowAltLeft, faLongArrowAltRight, faLinkedinIn,
    faPaperPlane, faExclamationTriangle, faRobot, faRedoAlt)

window.addEventListener("load", (_) => {
    const app = document.querySelector("#app")
    app ? ReactDOM.render(<Wrapper />, app) : false
})
