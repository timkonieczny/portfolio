import React, { Component } from "react"

class Preloader extends Component {
    render() {
        const isComplete = this.props.progress === 100
        return (
            <div id="preloader" style={isComplete ? { visibility: "hidden", top: "100%", height: 0 } : {}}>
                <p>{String(Math.round(this.props.progress)).padStart(3, '0')}</p>
                <div className="track">
                    <div className="bar" style={{ width: this.props.progress + "%" }}></div>
                </div>

            </div>
        )
    }
}

export default Preloader