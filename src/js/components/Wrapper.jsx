import React, { Fragment } from "react"
import Preloader from "./Preloader"
import Canvas from "./Canvas"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Services from "./Services"
import Message from "./Message"
import Privacy from "./Privacy"
import Work from "./Work"
import About from "./About"
import Home from "./Home"
import { useAppSelector } from "../hooks"

const Wrapper = () => {
    const progress = useAppSelector(state => state.progressReducer.progress)

    return (
        <Fragment>
            <Canvas />
            <Preloader progress={progress} />
            <div id="wrapper" style={{ opacity: 1 }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/services" element={<Services />} />
                        <Route path="/message" element={<Message />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/work" element={<Work />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </Fragment >
    )
}

export default Wrapper