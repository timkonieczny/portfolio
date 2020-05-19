import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import strings from "../strings"

class MessageButtons extends Component {
    render() {
        console.log(this.props.startTabIndex)
        return (
            <div className="message-buttons">
                <Link to="/message" className="button message-button animated" data-animation="message"
                    tabIndex={this.props.startTabIndex} onClick={this.props.clickListener}>
                    {strings.message}
                </Link>
                <a className="icon-button animated" tabIndex={this.props.startTabIndex + 1}
                    href="https://www.linkedin.com/in/tim-konieczny/">
                    <FontAwesomeIcon icon={["fab", "linkedin"]} />
                </a>
                <a className="icon-button animated" tabIndex={this.props.startTabIndex + 2}
                    href="https://www.xing.com/profile/Tim_Konieczny/">
                    <FontAwesomeIcon icon={["fab", "xing"]} />
                </a>
            </div>
        )
    }
}

export default MessageButtons