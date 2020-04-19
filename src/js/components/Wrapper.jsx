import React, { Component, Fragment } from "react";
import Preloader from "./Preloader";
import Canvas from "./Canvas";
import { BrowserRouter, Route } from "react-router-dom";
import AnimatedSwitch from "./AnimatedSwitch";

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
                break
        }
        this.setState({ progress: progress })
    }

    onHoverableMouseEnter(event) {
        this.canvas.scene.startAnimation(event.currentTarget.dataset.animation, "hover")
    }

    onHoverableMouseLeave(event) {
        if (!this.canvas.scene.hasAnimation(event.currentTarget.dataset.animation, "click"))
            this.canvas.scene.endAnimation(event.currentTarget.dataset.animation, "hover")
    }

    onButtonClick(event) {

        // TODO: hook up external links
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
                <Canvas onProgress={this.progressListener.bind(this)} ref={element => { this.canvas = element }} />
                <Preloader progress={this.state.progress} />
                {/* TODO: What's the difference between the different routers? */}
                <BrowserRouter>
                    <Route render={({ location }) => (
                        <AnimatedSwitch onHoverableMouseEnter={this.onHoverableMouseEnter.bind(this)}
                            onHoverableMouseLeave={this.onHoverableMouseLeave.bind(this)}
                            onButtonClick={this.onButtonClick.bind(this)} location={location}
                            show={this.state.progress === 100} />
                    )} />
                </BrowserRouter>
            </Fragment>
        );
    }
}

export default Wrapper;