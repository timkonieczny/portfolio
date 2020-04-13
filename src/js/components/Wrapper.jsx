import React, { Component, Fragment } from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import Work from "./Work";
import Message from "./Message";
import About from "./About";
import Home from "./Home";
import Preloader from "./Preloader";
import Canvas from "./Canvas";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class Wrapper extends Component {
    constructor() {
        super();

        this.state = {
            progress: 0,
            animation: "headline",
            isAppearing: true
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
                document.querySelector("#wrapper").style.opacity = 1;   // TODO: use ref
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
        // FIXME: animations aren't working properly
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

    // TODO: Trigger appropriate animation based on browser history
    // https://stackoverflow.com/questions/30915173/react-router-go-back-a-page-how-do-you-configure-history
    // https://github.com/ReactTraining/react-router/issues/1498

    render() {
        return (
            <Fragment>
                <Canvas onProgress={this.progressListener.bind(this)} ref={(element) => { this.canvas = element }} />
                <Preloader progress={this.state.progress} />
                {/* TODO: What's the difference between the different routers? */}
                <BrowserRouter>
                    <Route render={({ location }) => (
                        <TransitionGroup id="wrapper">
                            <CSSTransition
                                key={location.key}
                                timeout={3000}
                                classNames="fade"
                                appear={true}
                                onEnter={(_, isAppearing) => {
                                    this.setState({ isAppearing: isAppearing })
                                }}>
                                <Switch location={location}>
                                    <Route path="/about">
                                        <About mouseEnterListener={this.onHoverableMouseEnter.bind(this)}
                                            mouseLeaveListener={this.onHoverableMouseLeave.bind(this)}
                                            clickListener={this.onButtonClick.bind(this)}
                                            isAppearing={this.state.isAppearing} />
                                    </Route>
                                    <Route path="/message">
                                        <Message mouseEnterListener={this.onHoverableMouseEnter.bind(this)}
                                            mouseLeaveListener={this.onHoverableMouseLeave.bind(this)}
                                            clickListener={this.onButtonClick.bind(this)}
                                            isAppearing={this.state.isAppearing} />
                                    </Route>
                                    <Route path="/privacypolicy">
                                        <PrivacyPolicy mouseEnterListener={this.onHoverableMouseEnter.bind(this)}
                                            mouseLeaveListener={this.onHoverableMouseLeave.bind(this)}
                                            clickListener={this.onButtonClick.bind(this)}
                                            isAppearing={this.state.isAppearing} />
                                    </Route>
                                    <Route path="/work">
                                        <Work mouseEnterListener={this.onHoverableMouseEnter.bind(this)}
                                            mouseLeaveListener={this.onHoverableMouseLeave.bind(this)}
                                            clickListener={this.onButtonClick.bind(this)}
                                            isAppearing={this.state.isAppearing} />
                                    </Route>
                                    <Route path="/">
                                        <Home mouseEnterListener={this.onHoverableMouseEnter.bind(this)}
                                            mouseLeaveListener={this.onHoverableMouseLeave.bind(this)}
                                            clickListener={this.onButtonClick.bind(this)} />
                                    </Route>
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    )} />
                </BrowserRouter>
            </Fragment>
        );
    }
}

export default Wrapper;