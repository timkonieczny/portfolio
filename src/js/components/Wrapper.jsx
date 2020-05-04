import React, { Component, Fragment } from "react";
import Preloader from "./Preloader";
import Canvas from "./Canvas";
import { BrowserRouter, Route } from "react-router-dom";
import AnimatedSwitch from "./AnimatedSwitch";

class Wrapper extends Component {
    constructor() {
        super()

        this.state = {
            progress: 0,
            animations: ["headline"]
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
                break
        }
        this.setState({ progress: progress })
    }

    onButtonClick(event) {
        let animation
        if (event.currentTarget.dataset.animation === "back") {
            this.state.animations.pop()
            animation = this.state.animations[this.state.animations.length - 1]
            this.setState({
                animations: this.state.animations
            })
        } else {
            this.setState({
                animations: [...this.state.animations, event.currentTarget.dataset.animation]
            })
            animation = event.currentTarget.dataset.animation
        }
        this.canvas.scene.startAnimation(animation)
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
        );
    }
}

export default Wrapper;