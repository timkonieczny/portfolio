import Wrapper from "./components/Wrapper.jsx"
import ReactDOM from "react-dom"
import React from "react"
import "../scss/index.scss"
import initIcons from "./icons"

initIcons()

window.addEventListener("load", (_) => {
    const app = document.querySelector("#app")
    app ? ReactDOM.render(<Wrapper />, app) : false
})
