import React, { Component, Fragment } from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import Work from "./Work";
import Message from "./Message";
import About from "./About";
import Home from "./Home";
import "../../scss/index.scss"
import Preloader from "./Preloader";
import Canvas from "./Canvas";

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

    render() {
        return (
            <Fragment>
                <Canvas onProgress={this.progressListener.bind(this)} />
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