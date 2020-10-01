import React, { Component } from "react"

type Props = {
    to: string,
    text: string,
}

class InlineLinkExt extends Component<Props> {
    render() {
        return (
            <a href={this.props.to} className="animated inline" target="_blank" rel="noopener noreferrer">
                {this.props.text}
            </a>)
    }
}

export default InlineLinkExt