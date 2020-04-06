import React, { Component } from "react";

class Preloader extends Component {
    render() {
        const isComplete = this.props.progress === 100
        return (
            <div id="preloader" style={isComplete ? { visibility: "hidden" } : {}}>
                <div className="half-placeholder" style={isComplete ? { flex: 1 } : {}}></div>
                <div id="upper-half" style={isComplete ? { flex: 0 } : {}}></div>
                <div id="progress-bar-wrapper" style={isComplete ? { width: 0 } : {}}>
                    <div className="progress-bar-placeholder"></div>
                    <div id="progress-bar" style={{ width: this.props.progress + "%" }}></div>
                    <div className="progress-bar-placeholder"></div>
                </div>
                <div id="lower-half" style={isComplete ? { flex: 0 } : {}}></div>
                <div className="half-placeholder" style={isComplete ? { flex: 1 } : {}}></div>
            </div>
        );
    }
}

export default Preloader;