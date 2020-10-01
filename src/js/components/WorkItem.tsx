import React, { Component } from "react"
import ArrowLinkExt from "./ArrowLinkExt"
import { work } from "../strings"
import InlineLinkExt from "./InlineLinkExt"

type Props = {
    large: boolean,
    webp: string,
    jpg: string,
    webpHover: string,
    jpgHover: string,
    tags: string[],
    title: string,
    description: string,
    link: string,
    client: string,
    clientLink: string
}

class WorkItem extends Component<Props> {
    render() {
        return <div className={`cell ${this.props.large ? "large" : ""}`}>
            <picture className="main background">
                <source srcSet={this.props.webp} type="image/webp" />
                <img src={this.props.jpg} />
            </picture>
            <picture className="background">
                <source srcSet={this.props.webpHover} type="image/webp" />
                <img src={this.props.jpgHover} />
            </picture>
            <div className="content">
                <h3>{this.props.title}</h3>
                <p>{this.props.description}
                    <br />{work.collaboration} <InlineLinkExt to={this.props.clientLink} text={this.props.client} />.</p>
                <ArrowLinkExt to={this.props.link} text="browse" />
                <p className="tags">
                    {this.props.tags.map((tag, i) => {
                        return <span key={i} className="tag">{tag}</span>
                    })}
                </p>
            </div>
        </div >
    }
}

export default WorkItem