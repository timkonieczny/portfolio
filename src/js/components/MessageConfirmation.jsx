import React, { Component } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import strings from "../strings"

class MessageConfirmation extends Component {

    render() {
        return (
            <div id="message-confirmation" className={`${this.props.show ? "show" : ""}`}>
                <div id="message-success" className={`${this.props.status === 200 ? "show" : ""}`}>
                    <FontAwesomeIcon icon="paper-plane" />
                    <h3>{strings.messageThankYou}</h3>
                    <p>{strings.messageReply}</p>
                </div>
                <div id="message-client-error" className={`${this.props.status === 400 ? "show" : ""}`}>
                    <FontAwesomeIcon icon="robot" />
                    <h3>400 (Bad Request)</h3>
                    <p>{strings.messageError400}<br />{strings.messageErrorTryAgain}<br />{strings.messageSorry}</p>
                </div>
                <div id="message-server-error" className={`${this.props.status === 500 ? "show" : ""}`}>
                    <FontAwesomeIcon icon="redo-alt" />
                    <h3>500 (Internal Server Error)</h3>
                    <p>{strings.messageErrorUnknown}<br />{strings.messageErrorTryAgain}<br />{strings.messageSorry}</p>
                </div>
                <div id="message-unknown-error"
                    className={`${this.props.status !== null && this.props.status !== 200
                        && this.props.status !== 400 && this.props.status !== 500 ? "show" : ""}`}>
                    <FontAwesomeIcon icon="redo-alt" />
                    <h3>{strings.messageErrorUnknown}</h3>
                    <p>{strings.messageErrorTryAgain}<br />{strings.messageSorry}</p>
                </div>
            </div>
        )
    }
}

export default MessageConfirmation