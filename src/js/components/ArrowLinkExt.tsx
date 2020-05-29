import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type Props = {
    to: string,
    text: string,
}

class ArrowLinkExt extends Component<Props> {
    render() {
        return (
            <a href={this.props.to} className="animated link-with-icon" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon="long-arrow-alt-right" />
                <span>{this.props.text}</span>
            </a>)
    }
}

export default ArrowLinkExt