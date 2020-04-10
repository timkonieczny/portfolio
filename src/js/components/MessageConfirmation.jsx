import React, { Component } from "react";

class MessageConfirmation extends Component {
    render() {
        return (
            <div id="message-confirmation" className={`${this.props.show ? "show" : ""}`}>
                <div id="message-success" className={`${this.props.status === 200 ? "show" : ""}`}>
                    <i className="fas fa-paper-plane"></i>
                    <h3>Thank you for your message.</h3>
                    <p>I'll get back to you as soon as possible!</p>
                </div>
                <div id="message-client-error" className={`${this.props.status === 400 ? "show" : ""}`}>
                    <i className="fas fa-robot"></i>
                    <h3>400 (Bad Request)</h3>
                    <p>
                        The server has rejected the data you entered.<br />Please try again
                                later.<br />Sorry for the inconvenience.
                            </p>
                </div>
                <div id="message-server-error" className={`${this.props.status === 500 ? "show" : ""}`}>
                    <i className="fas fa-redo-alt"></i>
                    <h3>500 (Internal Server Error)</h3>
                    <p>
                        Uh. Oh. Something went wrong.<br />Please try again later.<br />Sorry
                                for the inconvenience.
                            </p>
                </div>
                <div id="message-unknown-error"
                    className={`${this.props.status !== null && this.props.status !== 200
                        && this.props.status !== 400 && this.props.status !== 500 ? "show" : ""}`}>
                    <i className="fas fa-redo-alt"></i>
                    <h3>Uh. Oh. Something went wrong.</h3>
                    <p>Please try again later.<br />Sorry for the inconvenience.</p>
                </div>
            </div>
        );
    }
}

export default MessageConfirmation;