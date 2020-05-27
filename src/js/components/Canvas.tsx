import React, { Component } from "react";
import Scene from "../Scene"

type Props = {
    onProgress: (...args: any[]) => void
}

type State = {
    isRendering: boolean
}

class Canvas extends Component<Props, State> {
    scene: Scene;
    canvas: HTMLCanvasElement;

    constructor(props: Props) {
        super(props)
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
            await this.scene.initialize(this.canvas)
            this.scene.render()
        }
    }

    render() {
        return <canvas id="canvas" ref={element => { this.canvas = element }}></canvas>
    }
}

export default Canvas;