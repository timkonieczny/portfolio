import React, { Fragment } from "react"
import Preloader from "./Preloader"
import Canvas from "./Canvas"
import { BrowserRouter } from "react-router-dom"
import { useAppSelector } from "../hooks"
import AnimatedSwitch2 from "./AnimatedSwitch"

const Wrapper = () => {
    const progress = useAppSelector(state => state.progressReducer.progress)

    return (
        <Fragment>
            <Canvas />
            <Preloader progress={progress} />
            <BrowserRouter>
                <AnimatedSwitch2 />
            </BrowserRouter>
        </Fragment >
    )
}

export default Wrapper