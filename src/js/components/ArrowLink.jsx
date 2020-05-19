import React, { Component } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class ArrowLink extends Component {
    render() {
        return (
            <Link to={this.props.to} className="animated link-with-icon"
                data-animation={this.props.animation} onClick={this.props.clickListener}>
                <FontAwesomeIcon icon="long-arrow-alt-right" />
                <span>{this.props.text}</span>
            </Link>)
    }
}

export default (ArrowLink)