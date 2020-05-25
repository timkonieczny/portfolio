import React, { Component } from "react"
import ArrowLinkExt from "./ArrowLinkExt"

type Props = {
    large: boolean,
    webp: string,
    jpg: string,
    tags: string[],
    title: string,
    description: string
}

class WorkItem extends Component<Props> {
    render() {
        return <div className={`cell ${this.props.large ? "large" : ""}`}>
            <picture>
                <source srcSet={this.props.webp} type="image/webp" />
                <img src={this.props.jpg} />
            </picture>
            <div className="content">
                <h3>{this.props.title}</h3>
                <p>{this.props.description}</p>
                <ArrowLinkExt to="#" text="browse" />
                <p className="tags">
                    {this.props.tags.map((tag, i) => {
                        return <span key={i} className="tag">{tag}</span>
                    })}
                </p>
            </div>
        </div>
    }
}

export default WorkItem