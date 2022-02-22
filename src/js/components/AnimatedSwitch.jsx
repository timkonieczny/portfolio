import React from "react"
import { Route, Routes as Switch, useLocation } from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import Services from "./Services"
import Message from "./Message"
import Privacy from "./Privacy"
import Work from "./Work"
import About from "./About"
import Home from "./Home"
import { useAppSelector } from "../hooks"

const AnimatedSwitch = () => {
    const historyAction = useAppSelector(state => state.history.historyAction)
    const progress = useAppSelector(state => state.progress.progress)
    const location = useLocation()

    // TODO: OVERALL
    // Click on about has no webgl transition?

    return (
        <TransitionGroup id="wrapper"
            style={progress === 100 ? { opacity: 1 } : {}}
            childFactory={child => React.cloneElement(child,
                { classNames: historyAction ?? "PUSH" })}>
            <CSSTransition
                key={location.key}
                timeout={4000}
                classNames={historyAction ?? "PUSH"}
                appear={true}>
                <Switch location={location}>
                    <Route path="/services" element={<Services />} />
                    <Route path="/message" element={<Message />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/about" element={<About />} />
                    <Route exact path="/" element={<Home />} />
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default AnimatedSwitch