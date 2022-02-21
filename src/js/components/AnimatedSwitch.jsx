import React, { useState } from "react"
import { Route, Routes as Switch, useLocation } from "react-router-dom"
import Services from "./Services"
import Message from "./Message"
import Privacy from "./Privacy"
import Work from "./Work"
import About from "./About"
import Home from "./Home"
import { useAppSelector } from "../hooks"
import { TransitionGroup, CSSTransition } from "react-transition-group"

const AnimatedSwitch = () => {
    const historyAction = useAppSelector(state => state.historyReducer.historyAction)
    const location = useLocation()
    // TODO: what is this used for?
    const [_isAppearing, setIsAppearing] = useState(true)

    // TODO: how is this handled in old implementation? When is show set to true?
    const show = true

    // TODO: OVERALL
    // Click on about has no webgl transition?
    // History (back, forward) is (probably) not working
    // Fix CSS animations (above comments)

    return (
        <TransitionGroup id="wrapper"
            style={show ? { opacity: 1 } : {}}
            childFactory={child => React.cloneElement(child,
                { classNames: historyAction })}>
            <CSSTransition
                key={location.key}
                timeout={4000}
                classNames={historyAction}
                appear={true}
                onEnter={(_, isAppearing) => { setIsAppearing(isAppearing) }}>
                <Switch location={location}>
                    <Route path="/services" element={<Services />} />
                    <Route path="/message" element={<Message />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/" element={<Home />} />
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default AnimatedSwitch