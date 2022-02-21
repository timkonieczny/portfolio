import Wrapper from "./components/Wrapper.jsx"
import ReactDOM from "react-dom"
import React from "react"
import "../scss/index.scss"
import ReactGA from "react-ga"
import * as Secret from "../../secret"
import { IconDefinition, library } from "@fortawesome/fontawesome-svg-core"
import {
    faLongArrowAltLeft, faLongArrowAltRight, faPaperPlane,
    faRobot, faRedoAlt, faExclamationTriangle, faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons"
import { faXing, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { home } from "./strings"

import { createStore } from "redux"
import { Provider } from "react-redux"
import { composeWithDevTools } from '@redux-devtools/extension';
import { combinedReducer } from "./reducers/index.js"


ReactGA.initialize(Secret.analytics.google);

library.add(
    faLongArrowAltLeft as IconDefinition,
    faLongArrowAltRight as IconDefinition,
    faLinkedin as IconDefinition,
    faXing as IconDefinition,
    faPaperPlane as IconDefinition,
    faExclamationTriangle as IconDefinition,
    faRobot as IconDefinition,
    faRedoAlt as IconDefinition,
    faMapMarkerAlt as IconDefinition
)

const store = createStore(combinedReducer, composeWithDevTools())

window.addEventListener("load", (_) => {
    const app: HTMLElement = document.querySelector("#app")
    app.lang = home.getLanguage()
    app ? ReactDOM.render(
        <Provider store={store}>
            <Wrapper />
        </Provider>, app) : false
})
