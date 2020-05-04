import React, { Component } from "react";
import Scene from "../Scene"

class Canvas extends Component {

    constructor() {
        super()
        this.state = {
            isRendering: false
        }
    }

    async componentDidMount() {
        if (!this.state.isRendering) {
            this.setState({ isRendering: true })

            this.scene = new Scene()
            this.scene.addEventListener("progress", this.props.onProgress)
            this.scene.addEventListener("initComplete", this.props.onProgress)
            await this.scene.initialize(canvas)
            this.scene.render()
        }
    }

    render() {
        return <canvas id="canvas"></canvas>
    }
}

export default Canvas;