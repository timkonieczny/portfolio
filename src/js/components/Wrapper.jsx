import React, { Fragment, useRef, useState } from "react"
import Preloader from "./Preloader"
import Canvas from "./Canvas"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Services from "./Services"
import Message from "./Message"
import Privacy from "./Privacy"
import Work from "./Work"
import About from "./About"
import Home from "./Home"

const Wrapper = () => {

    const [progress, setProgress] = useState(0)
    const [animations, setAnimations] = useState(["home"])

    const inputEl = useRef(null)

    // const componentDidMount = () => {
    //     window.onpopstate = () => {
    //         const animation = this.getAnimationByLocation()
    //         if (animations.length > 1 &&
    //             animation === animations[animations.length - 2])
    //             this.popAnimation()
    //         else
    //             this.pushAnimation(animation)
    //     }
    // }

    // const getAnimationByLocation = () => {
    //     switch (window.location.pathname.toLowerCase()) {
    //         case "/":
    //             return "home"
    //         case "/message":
    //             return "message"
    //         case "/services":
    //             return "services"
    //         case "/privacy":
    //             return "privacy"
    //         case "/work":
    //             return "work"
    //         case "/about":
    //             return "about"
    //         default:
    //             return "home"
    //     }
    // }

    const pushAnimation = (animation) => {
        setAnimations([...animations, animation])
        inputEl.current.scene.startAnimation(animation)
    }

    // const popAnimation = () => {
    //     const updatedAnimations = [...animations]
    //     updatedAnimations.pop()
    //     const animation = updatedAnimations[updatedAnimations.length - 1]
    //     setAnimations(updatedAnimations)
    //     inputEl.scene.startAnimation(animation)
    // }

    const onButtonClick = (event) => {
        pushAnimation(event.currentTarget.dataset.animation)
    }

    const progressListener = (event) => {
        let progress2
        switch (event.task) {
            case "generate":
                progress2 = event.progress * .85
                break
            case "merge":
                progress2 = 85 + event.progress * .15
                break
            case "complete":
                progress2 = event.progress
                break
        }
        setProgress(progress2)
    }

    return (
        <Fragment>
            <Canvas onProgress={progressListener} ref={inputEl} />
            <Preloader progress={progress} />
            <div id="wrapper" style={{ opacity: 1 }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/services" element={<Services clickListener={onButtonClick} />} />
                        <Route path="/message" element={<Message clickListener={onButtonClick} />} />
                        <Route path="/privacy" element={<Privacy clickListener={onButtonClick} />} />
                        <Route path="/work" element={<Work clickListener={onButtonClick} />} />
                        <Route path="/about" element={<About clickListener={onButtonClick} />} />
                        <Route path="/" element={<Home clickListener={onButtonClick} />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </Fragment >
    )
}

export default Wrapper