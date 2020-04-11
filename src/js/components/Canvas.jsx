import React, { Component } from "react";
import { Scene } from "../Scene.js"

class Canvas extends Component {

    async componentDidMount() {
        // TODO: Best place to to init canvas?

        this.scene = new Scene()
        this.scene.addEventListener("progress", this.props.onProgress)
        this.scene.addEventListener("initComplete", this.props.onProgress)
        await this.scene.initialize(canvas)
        this.scene.render()
    }

    render() {
        return <canvas id="canvas"></canvas>
    }
}

export default Canvas;