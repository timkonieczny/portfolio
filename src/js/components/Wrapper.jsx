import React, { Component, Fragment } from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import Work from "./Work";
import Message from "./Message";
import About from "./About";
import Home from "./Home";
import "../../scss/index.scss"
import Preloader from "./Preloader";
import Canvas from "./Canvas";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faPaperPlane, faRobot, faRedoAlt, faLongArrowAltLeft, faLongArrowAltRight, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";

class Wrapper extends Component {
    constructor() {
        super();

        this.state = {
            progress: 0,
            animation: "headline"
        }
    }

    progressListener(event) {
        let progress;
        switch (event.task) {
            case "generate":
                progress = event.progress * .85
                break
            case "merge":
                progress = 85 + event.progress * .15
                break
            case "complete":
                progress = event.progress
                document.querySelector("#wrapper").style.opacity = 1;
                break
        }
        this.setState({ progress: progress })
    }

    async componentDidMount() {
        // TODO: use React click handlers

        let distanceToLeft, width;

        // const onButtonClick = event => {

        //     // // init
        //     // const wrapper = wrappers[event.currentTarget.dataset.animation]
        //     // const goHome = wrapper === wrappers.headline


        //     // // old wrapper

        //     // // remove listeners
        //     // if (wrappers.active) {
        //     //     wrappers.active.buttons.forEach(button => {
        //     //         button.listeners.forEach(listener => {
        //     //             button.element.removeEventListener(listener.type, listener.callback)
        //     //         })
        //     //     })
        //     // }

        //     // // move UI
        //     // if (goHome)
        //     //     wrappers.active.element.style.left = (distanceToLeft + width) + "px"
        //     // else
        //     //     wrappers.active.element.style.left = (distanceToLeft - width) + "px"
        //     // wrappers.active.element.style.opacity = 0
        //     // wrappers.active.element.style.visibility = "hidden"

        //     // wrappers.active.animations.forEach(animation => {
        //     //     this.scene.endAnimation(animation.name, animation.type)
        //     // })

        //     // // new wrapper

        //     // // add listeners
        //     // wrappers.active = wrapper
        //     // wrappers.active.buttons.forEach(button => {
        //     //     button.listeners.forEach(listener => {
        //     //         button.element.addEventListener(listener.type, listener.callback)
        //     //     })
        //     // })

        //     // // move UI
        //     // wrappers.active.element.style.left = distanceToLeft + "px"
        //     // wrappers.active.element.style.opacity = 1
        //     // wrappers.active.element.style.visibility = "visible"
        //     // if (goHome)
        //     //     wrappers.about.element.style.left = (distanceToLeft + width) + "px"

        //     // // 3D animations
        //     // if (goHome)
        //     //     this.canvas.scene.endAllAnimations()
        //     // else
        //     //     this.canvas.scene.startAnimations(wrappers.active.animations)
        // }



        const onButtonClickExternal = event => {
            event.currentTarget.blur()
            const url = "https://www.linkedin.com/in/tim-konieczny"
            if (!window.open(url, '_blank'))
                window.location.href = url
        }

        // const onHoverableMouseEnter = event => {
        //     this.canvas.scene.startAnimation(event.currentTarget.dataset.animation, "hover")
        // }

        // const onHoverableMousleave = event => {
        //     this.canvas.scene.endAnimation(event.currentTarget.dataset.animation, "hover")
        // }

        const wrappers = {
            headline: {
                element: document.querySelector("#headline-wrapper"),
                animations: [],
                buttons: [
                    {
                        element: document.querySelector("#headline-wrapper .message-button"),
                        listeners: [
                            { type: "click", callback: this.onButtonClick },
                            { type: "mouseenter", callback: this.onHoverableMouseEnter },
                            { type: "focus", callback: this.onHoverableMouseEnter },
                            { type: "mouseleave", callback: this.onHoverableMouseLeave },
                            { type: "blur", callback: this.onHoverableMouseLeave }
                        ]
                    },
                    {
                        element: document.querySelector("#headline-wrapper .linkedin-button"),
                        listeners: [
                            { type: "click", callback: onButtonClickExternal },
                            { type: "mouseenter", callback: this.onHoverableMouseEnter },
                            { type: "focus", callback: this.onHoverableMouseEnter },
                            { type: "mouseleave", callback: this.onHoverableMouseLeave },
                            { type: "blur", callback: this.onHoverableMouseLeave }
                        ]
                    },
                    {
                        element: document.querySelector("#headline-wrapper #about-button"),
                        listeners: [
                            { type: "click", callback: this.onButtonClick },
                            { type: "mouseenter", callback: this.onHoverableMouseEnter },
                            { type: "focus", callback: this.onHoverableMouseEnter },
                            { type: "mouseleave", callback: this.onHoverableMouseLeave },
                            { type: "blur", callback: this.onHoverableMouseLeave }
                        ]
                    },
                    {
                        element: document.querySelector("#headline-wrapper #work-button"),
                        listeners: [
                            { type: "click", callback: this.onButtonClick },
                            { type: "mouseenter", callback: this.onHoverableMouseEnter },
                            { type: "focus", callback: this.onHoverableMouseEnter },
                            { type: "mouseleave", callback: this.onHoverableMouseLeave },
                            { type: "blur", callback: this.onHoverableMouseLeave }
                        ]
                    }
                ]
            },
            message: {
                element: document.querySelector("#message-wrapper"),
                animations: [
                    { name: "message", type: "hover" },
                    { name: "message", type: "click" },
                ],
                buttons: [
                    {
                        element: document.querySelector("#message-wrapper .back-arrow"),
                        listeners: [
                            { type: "mouseenter", callback: this.onHoverableMouseEnter },
                            { type: "focus", callback: this.onHoverableMouseEnter },
                            { type: "mouseleave", callback: this.onHoverableMouseLeave },
                            { type: "blur", callback: this.onHoverableMouseLeave },
                            { type: "click", callback: this.onButtonClick }
                        ]
                    }
                ]
            },
            about: {
                element: document.querySelector("#about-wrapper"),
                animations: [
                    { name: "about", type: "hover" },
                    { name: "about", type: "click" }
                ],
                buttons: [
                    {
                        element: document.querySelector("#about-wrapper .back-arrow"),
                        listeners: [
                            { type: "mouseenter", callback: this.onHoverableMouseEnter },
                            { type: "focus", callback: this.onHoverableMouseEnter },
                            { type: "mouseleave", callback: this.onHoverableMouseLeave },
                            { type: "blur", callback: this.onHoverableMouseLeave },
                            { type: "click", callback: this.onButtonClick }
                        ]
                    },
                    {
                        element: document.querySelector("#about-wrapper .message-button"),
                        listeners: [
                            { type: "click", callback: this.onButtonClick }
                        ]
                    },
                    {
                        element: document.querySelector("#about-wrapper .linkedin-button"),
                        listeners: [
                            { type: "click", callback: onButtonClickExternal }
                        ]
                    },
                    {
                        element: document.querySelector("#about-wrapper #privacy-policy-button"),
                        listeners: [
                            { type: "click", callback: this.onButtonClick }
                        ]
                    }
                ]
            },
            privacyPolicy: {
                element: document.querySelector("#privacy-policy-wrapper"),
                animations: [
                    { name: "privacyPolicy", type: "hover" },
                    { name: "privacyPolicy", type: "click" }
                ],
                buttons: [
                    {
                        element: document.querySelector("#privacy-policy-wrapper .back-arrow"),
                        listeners: [
                            { type: "mouseenter", callback: this.onHoverableMouseEnter },
                            { type: "focus", callback: this.onHoverableMouseEnter },
                            { type: "mouseleave", callback: this.onHoverableMouseLeave },
                            { type: "blur", callback: this.onHoverableMouseLeave },
                            { type: "click", callback: this.onButtonClick }
                        ]
                    }
                ]
            },
            work: {
                element: document.querySelector("#work-wrapper"),
                animations: [
                    { name: "work", type: "hover" },
                    { name: "work", type: "click" }
                ],
                buttons: [
                    {
                        element: document.querySelector("#work-wrapper .back-arrow"),
                        listeners: [
                            { type: "mouseenter", callback: this.onHoverableMouseEnter },
                            { type: "focus", callback: this.onHoverableMouseEnter },
                            { type: "mouseleave", callback: this.onHoverableMouseLeave },
                            { type: "blur", callback: this.onHoverableMouseLeave },
                            { type: "click", callback: this.onButtonClick }
                        ]
                    }
                ]
            },
            active: null
        }

        wrappers.active = wrappers.headline
        // wrappers.active.buttons.forEach(button => {
        //     button.listeners.forEach(listener => {
        //         button.element.addEventListener(listener.type, listener.callback)
        //     })
        // })

        let hasResizeAnimationEndListener = false

        const onResize = _ => {
            wrappers.headline.element.style.left = ""

            if (!hasResizeAnimationEndListener) {
                wrappers.headline.element.addEventListener("transitionend", onResizeAnimationEnd);
                hasResizeAnimationEndListener = true
            }
        }

        const onResizeAnimationEnd = _ => {
            wrappers.headline.element.removeEventListener("transitionend", onResizeAnimationEnd)
            hasResizeAnimationEndListener = false

            distanceToLeft = wrappers.headline.element.getBoundingClientRect().left
            width = wrappers.headline.element.clientWidth
            wrappers.active.element.style.left = distanceToLeft + "px"

            if (wrappers.active !== wrappers.headline)
                wrappers.headline.element.style.left = (distanceToLeft - width) + "px"
        }

        // window.addEventListener("resize", onResize)

        // distanceToLeft = wrappers.headline.element.getBoundingClientRect().left
        width = wrappers.headline.element.clientWidth
    }

    onHoverableMouseEnter(event) {
        this.canvas.scene.startAnimation(event.currentTarget.dataset.animation, "hover")
    }

    onHoverableMouseLeave(event) {
        this.canvas.scene.endAnimation(event.currentTarget.dataset.animation, "hover")
    }

    onMouseEnter() {
        console.log("mouseEnter")
    }
    onMouseLeave() {
        console.log("mouseLeave")
    }

    onButtonClick(event) {

        // TODO: review how animation system works
        this.canvas.scene.endAnimation(this.state.animation, "hover")
        this.canvas.scene.endAnimation(this.state.animation, "click")

        this.setState({ animation: event.currentTarget.dataset.animation })

        // 3D animations
        if (event.currentTarget.dataset.animation === "headline")
            this.canvas.scene.endAllAnimations()
        else {
            this.canvas.scene.startAnimation(event.currentTarget.dataset.animation, "click")
            this.canvas.scene.startAnimation(event.currentTarget.dataset.animation, "hover")
        }
    }

    render() {
        return (
            <Fragment>
                <Canvas onProgress={this.progressListener.bind(this)} ref={(element) => { this.canvas = element }} />
                <Preloader progress={this.state.progress} />
                <div id="wrapper">
                    <BrowserRouter>
                        <Switch>
                            <Route path="/about">
                                <About mouseEnterListener={this.onHoverableMouseEnter.bind(this)}
                                    mouseLeaveListener={this.onHoverableMouseLeave.bind(this)}
                                    clickListener={this.onButtonClick.bind(this)} />
                            </Route>
                            <Route path="/message">
                                <Message mouseEnterListener={this.onHoverableMouseEnter.bind(this)}
                                    mouseLeaveListener={this.onHoverableMouseLeave.bind(this)}
                                    clickListener={this.onButtonClick.bind(this)} />
                            </Route>
                            <Route path="/privacypolicy">
                                <PrivacyPolicy mouseEnterListener={this.onHoverableMouseEnter.bind(this)}
                                    mouseLeaveListener={this.onHoverableMouseLeave.bind(this)}
                                    clickListener={this.onButtonClick.bind(this)} />
                            </Route>
                            <Route path="/work">
                                <Work mouseEnterListener={this.onHoverableMouseEnter.bind(this)}
                                    mouseLeaveListener={this.onHoverableMouseLeave.bind(this)}
                                    clickListener={this.onButtonClick.bind(this)} />
                            </Route>
                            <Route path="/">
                                <Home mouseEnterListener={this.onHoverableMouseEnter.bind(this)}
                                    mouseLeaveListener={this.onHoverableMouseLeave.bind(this)}
                                    clickListener={this.onButtonClick.bind(this)} />
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </div>
            </Fragment>
        );
    }
}

export default Wrapper;