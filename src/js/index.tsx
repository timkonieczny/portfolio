import Wrapper from "./components/Wrapper.jsx"
import ReactDOM from "react-dom"
import React from "react"
import "../scss/index.scss"
import ReactGA from "react-ga"
import * as Secret from "../../secret"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
    faLongArrowAltLeft, faLongArrowAltRight, faPaperPlane,
    faRobot, faRedoAlt, faExclamationTriangle, faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons"
import { faXing, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { home } from "./strings"



ReactGA.initialize(Secret.analytics.google);

library.add(faLongArrowAltLeft, faLongArrowAltRight, faLinkedin, faXing,
    faPaperPlane, faExclamationTriangle, faRobot, faRedoAlt, faMapMarkerAlt)

window.addEventListener("load", (_) => {
    const app: HTMLElement = document.querySelector("#app")
    app.lang = home.getLanguage()
    app ? ReactDOM.render(<Wrapper />, app) : false
})
