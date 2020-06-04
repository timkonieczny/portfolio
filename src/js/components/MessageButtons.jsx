import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { home } from "../strings"

class MessageButtons extends Component {
    render() {
        return (
            <div className="message-buttons">
                <Link to="/message" className="button message-button animated" data-animation="message"
                    onClick={this.props.clickListener}>
                    {home.message}
                </Link>
                <span>
                    <a className="icon-button animated" href="https://www.linkedin.com/in/tim-konieczny/"
                        target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={["fab", "linkedin"]} />
                    </a>
                    <a className="icon-button animated" href="https://www.xing.com/profile/Tim_Konieczny/"
                        target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={["fab", "xing"]} />
                    </a>
                </span>
            </div>
        )
    }
}

export default MessageButtons