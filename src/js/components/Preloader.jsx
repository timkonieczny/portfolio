import React, { Component } from "react";

class Preloader extends Component {
    render() {
        return (
            <div id="preloader">
                <div className="half-placeholder"></div>
                <div id="upper-half"></div>
                <div id="progress-bar-wrapper">
                    <div className="progress-bar-placeholder"></div>
                    <div id="progress-bar"></div>
                    <div className="progress-bar-placeholder"></div>
                </div>
                <div id="lower-half"></div>
                <div className="half-placeholder"></div>
            </div>
        );
    }
}

export default Preloader;