import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import strings from "../strings"

class MessageButtons extends Component {
    render() {
        return (
            <div className="message-buttons">
                <Link to="/message" className="button message-button animated" data-animation="message"
                    tabIndex={this.startTabIndex} onClick={this.props.clickListener}>
                    {strings.message}
                </Link>
                <a className="icon-button animated" tabIndex={this.startTabIndex + 1}
                    href="https://www.linkedin.com/in/tim-konieczny/">
                    <FontAwesomeIcon icon={["fab", "linkedin"]} />
                </a>
                <a className="icon-button animated" tabIndex={this.startTabIndex + 2}
                    href="https://www.xing.com/profile/Tim_Konieczny/">
                    <FontAwesomeIcon icon={["fab", "xing"]} />
                </a>
            </div>
        )
    }
}

export default MessageButtons