import React, { Component } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type Props = {
    to: string,
    animation: string,
    text: string,
    clickListener: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

class ArrowLink extends Component<Props> {
    render() {
        return (
            <Link to={this.props.to} className="animated link-with-icon"
                data-animation={this.props.animation} onClick={this.props.clickListener}>
                <FontAwesomeIcon icon="long-arrow-alt-right" />
                <span>{this.props.text}</span>
            </Link>)
    }
}

export default ArrowLink