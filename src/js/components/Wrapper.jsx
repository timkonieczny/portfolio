import React, { Component, Fragment } from "react"
import Preloader from "./Preloader"
import Canvas from "./Canvas"
import { BrowserRouter, Route } from "react-router-dom"
import AnimatedSwitch from "./AnimatedSwitch"

class Wrapper extends Component {
    constructor() {
        super()

        this.state = {
            progress: 0,
            animations: ["home"]
        }
    }

    componentDidMount() {
        window.onpopstate = () => {
            const animation = this.getAnimationByLocation()
            if (this.state.animations.length > 1 &&
                animation === this.state.animations[this.state.animations.length - 2])
                this.popAnimation()
            else
                this.pushAnimation(animation)
        }
    }

    getAnimationByLocation() {
        switch (window.location.pathname.toLowerCase()) {
            case "/":
                return "home"
            case "/message":
                return "message"
            case "/services":
                return "services"
            case "/privacy":
                return "privacy"
            case "/work":
                return "work"
            case "/about":
                return "about"
            default:
                return "home"
        }
    }

    pushAnimation(animation) {
        this.setState({
            animations: [...this.state.animations, animation]
        })
        this.canvas.scene.startAnimation(animation)
    }

    popAnimation() {
        this.state.animations.pop()
        const animation = this.state.animations[this.state.animations.length - 1]
        this.setState({
            animations: this.state.animations
        })
        this.canvas.scene.startAnimation(animation)
    }

    onButtonClick(event) {
        this.pushAnimation(event.currentTarget.dataset.animation)
    }

    progressListener(event) {
        let progress
        switch (event.task) {
            case "generate":
                progress = event.progress * .85
                break
            case "merge":
                progress = 85 + event.progress * .15
                break
            case "complete":
                progress = event.progress
                break
        }
        this.setState({ progress: progress })
    }

    render() {
        return (
            <Fragment>
                <Canvas onProgress={this.progressListener.bind(this)} ref={element => { this.canvas = element }} />
                <Preloader progress={this.state.progress} />
                <BrowserRouter>
                    <Route render={({ location }) => (
                        <AnimatedSwitch onButtonClick={this.onButtonClick.bind(this)} immutableLocation={location}
                            show={this.state.progress === 100} />
                    )} />
                </BrowserRouter>
            </Fragment>
        )
    }
}

export default Wrapper