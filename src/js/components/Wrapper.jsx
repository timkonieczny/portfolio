import React, { Component, Fragment } from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import Work from "./Work";
import Message from "./Message";
import About from "./About";
import Home from "./Home";
import "../../scss/index.scss"
import Preloader from "./Preloader";
import Canvas from "./Canvas";
import { BrowserRouter, Switch, Route } from "react-router-dom";

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