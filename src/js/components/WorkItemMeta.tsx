import React, { Component } from "react"
import ArrowLinkExt from "./ArrowLinkExt"

class WorkItemMeta extends Component {
    render() {
        return <div className="cell large">
            <div className="main background meta">
                <p>{"</>"}</p>
            </div>
            <div className="background meta"></div>
            <div className="content">
                <h3>[meta]</h3>
                <p>Interested in how this site was built? Look at the project on GitHub!</p>
                <ArrowLinkExt to="https://github.com/timkonieczny/portfolio" text="GitHub" />
                <p className="tags">
                    <span className="tag">WebGL</span>
                    <span className="tag">GLSL / Shaders</span>
                    <span className="tag">React</span>
                    <span className="tag">React-Router</span>
                    <span className="tag">SASS</span>
                    <span className="tag">Webpack</span>
                    <span className="tag">TypeScript</span>
                    <span className="tag">gl-matrix</span>
                </p>
            </div>
        </div>
    }
}

export default WorkItemMeta