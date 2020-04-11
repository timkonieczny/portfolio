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

class Wrapper extends Component {
    constructor() {
        super();

        this.state = {
            progress: 0
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

        library.add(
            faPaperPlane,
            faRobot,
            faRedoAlt,
            faLongArrowAltLeft,
            faLongArrowAltRight,
            faLinkedinIn,
            faExclamationTriangle
        )
        dom.i2svg()

        let distanceToLeft, width;

        const onButtonClick = event => {

            // init
            const wrapper = wrappers[event.currentTarget.dataset.animation]
            const goHome = wrapper === wrappers.headline


            // old wrapper

            // remove listeners
            if (wrappers.active) {
                wrappers.active.buttons.forEach(button => {
                    button.listeners.forEach(listener => {
                        button.element.removeEventListener(listener.type, listener.callback)
                    })
                })
            }

            // move UI
            if (goHome)
                wrappers.active.element.style.left = (distanceToLeft + width) + "px"
            else
                wrappers.active.element.style.left = (distanceToLeft - width) + "px"
            wrappers.active.element.style.opacity = 0
            wrappers.active.element.style.visibility = "hidden"

            wrappers.active.animations.forEach(animation => {
                this.scene.endAnimation(animation.name, animation.type)
            })

            // new wrapper

            // add listeners
            wrappers.active = wrapper
            wrappers.active.buttons.forEach(button => {
                button.listeners.forEach(listener => {
                    button.element.addEventListener(listener.type, listener.callback)
                })
            })

            // move UI
            wrappers.active.element.style.left = distanceToLeft + "px"
            wrappers.active.element.style.opacity = 1
            wrappers.active.element.style.visibility = "visible"
            if (goHome)
                wrappers.about.element.style.left = (distanceToLeft + width) + "px"

            // 3D animations
            if (goHome)
                this.canvas.scene.endAllAnimations()
            else
                this.canvas.scene.startAnimations(wrappers.active.animations)
        }



        const onButtonClickExternal = event => {
            event.currentTarget.blur()
            const url = "https://www.linkedin.com/in/tim-konieczny"
            if (!window.open(url, '_blank'))
                window.location.href = url
        }

        const onHoverableMouseEnter = event => {
            this.canvas.scene.startAnimation(event.currentTarget.dataset.animation, "hover")
        }

        const onHoverableMousleave = event => {
            this.canvas.scene.endAnimation(event.currentTarget.dataset.animation, "hover")
        }

        const wrappers = {
            headline: {
                element: document.querySelector("#headline-wrapper"),
                animations: [],
                buttons: [
                    {
                        element: document.querySelector("#headline-wrapper .message-button"),
                        listeners: [
                            { type: "click", callback: onButtonClick },
                            { type: "mouseenter", callback: onHoverableMouseEnter },
                            { type: "focus", callback: onHoverableMouseEnter },
                            { type: "mouseleave", callback: onHoverableMousleave },
                            { type: "blur", callback: onHoverableMousleave }
                        ]
                    },
                    {
                        element: document.querySelector("#headline-wrapper .linkedin-button"),
                        listeners: [
                            { type: "click", callback: onButtonClickExternal },
                            { type: "mouseenter", callback: onHoverableMouseEnter },
                            { type: "focus", callback: onHoverableMouseEnter },
                            { type: "mouseleave", callback: onHoverableMousleave },
                            { type: "blur", callback: onHoverableMousleave }
                        ]
                    },
                    {
                        element: document.querySelector("#headline-wrapper #about-button"),
                        listeners: [
                            { type: "click", callback: onButtonClick },
                            { type: "mouseenter", callback: onHoverableMouseEnter },
                            { type: "focus", callback: onHoverableMouseEnter },
                            { type: "mouseleave", callback: onHoverableMousleave },
                            { type: "blur", callback: onHoverableMousleave }
                        ]
                    },
                    {
                        element: document.querySelector("#headline-wrapper #work-button"),
                        listeners: [
                            { type: "click", callback: onButtonClick },
                            { type: "mouseenter", callback: onHoverableMouseEnter },
                            { type: "focus", callback: onHoverableMouseEnter },
                            { type: "mouseleave", callback: onHoverableMousleave },
                            { type: "blur", callback: onHoverableMousleave }
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
                            { type: "mouseenter", callback: onHoverableMouseEnter },
                            { type: "focus", callback: onHoverableMouseEnter },
                            { type: "mouseleave", callback: onHoverableMousleave },
                            { type: "blur", callback: onHoverableMousleave },
                            { type: "click", callback: onButtonClick }
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
                            { type: "mouseenter", callback: onHoverableMouseEnter },
                            { type: "focus", callback: onHoverableMouseEnter },
                            { type: "mouseleave", callback: onHoverableMousleave },
                            { type: "blur", callback: onHoverableMousleave },
                            { type: "click", callback: onButtonClick }
                        ]
                    },
                    {
                        element: document.querySelector("#about-wrapper .message-button"),
                        listeners: [
                            { type: "click", callback: onButtonClick }
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
                            { type: "click", callback: onButtonClick }
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
                            { type: "mouseenter", callback: onHoverableMouseEnter },
                            { type: "focus", callback: onHoverableMouseEnter },
                            { type: "mouseleave", callback: onHoverableMousleave },
                            { type: "blur", callback: onHoverableMousleave },
                            { type: "click", callback: onButtonClick }
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
                            { type: "mouseenter", callback: onHoverableMouseEnter },
                            { type: "focus", callback: onHoverableMouseEnter },
                            { type: "mouseleave", callback: onHoverableMousleave },
                            { type: "blur", callback: onHoverableMousleave },
                            { type: "click", callback: onButtonClick }
                        ]
                    }
                ]
            },
            active: null
        }

        wrappers.active = wrappers.headline
        wrappers.active.buttons.forEach(button => {
            button.listeners.forEach(listener => {
                button.element.addEventListener(listener.type, listener.callback)
            })
        })

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

        window.addEventListener("resize", onResize)

        distanceToLeft = wrappers.headline.element.getBoundingClientRect().left
        width = wrappers.headline.element.clientWidth
    }

    render() {
        return (
            <Fragment>
                <Canvas onProgress={this.progressListener.bind(this)} ref={(element) => { this.canvas = element }} />
                <Preloader progress={this.state.progress} />
                <div id="wrapper">
                    <Home />
                    <Message />
                    <About />
                    <PrivacyPolicy />
                    <Work />
                </div>
            </Fragment>
        );
    }
}

export default Wrapper;