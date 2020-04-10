import React, { Component } from "react";
import MessageForm from "./MessageForm";

class Message extends Component {

    constructor() {
        super()
        this.state = {
            status: null,
            showConfirmation: false,
            isAnimationRunning: false
        }
    }

    onMessageSent(requestStatus) {
        this.setState({ status: requestStatus, showConfirmation: true })
    }

    onAnimationStarted() {
        this.setState({ isAnimationRunning: true })
    }

    render() {
        return (
            <div id="message-wrapper" className="section-wrapper">
                <div>
                    <a className="back-arrow" data-animation="headline" tabIndex="1" href="#"><i
                        className="fas fa-long-arrow-alt-left"></i></a>
                </div>
                <div id="message-form-wrapper"
                    style={!this.state.showConfirmation && this.state.isAnimationRunning ? { overflow: "visible" } : {}}>
                    <h2>Let's have a chat.</h2>
                    <MessageForm onMessageSent={this.onMessageSent.bind(this)}
                        onAnimationStarted={this.onAnimationStarted.bind(this)} />
                    <div id="message-confirmation" className={`${this.state.showConfirmation ? "show" : ""}`}>
                        <div id="message-success" className={`${this.state.status === 200 ? "show" : ""}`}>
                            <i className="fas fa-paper-plane"></i>
                            <h3>Thank you for your message.</h3>
                            <p>I'll get back to you as soon as possible!</p>
                        </div>
                        <div id="message-client-error" className={`${this.state.status === 400 ? "show" : ""}`}>
                            <i className="fas fa-robot"></i>
                            <h3>400 (Bad Request)</h3>
                            <p>
                                The server has rejected the data you entered.<br />Please try again
                                later.<br />Sorry for the inconvenience.
                            </p>
                        </div>
                        <div id="message-server-error" className={`${this.state.status === 500 ? "show" : ""}`}>
                            <i className="fas fa-redo-alt"></i>
                            <h3>500 (Internal Server Error)</h3>
                            <p>
                                Uh. Oh. Something went wrong.<br />Please try again later.<br />Sorry
                                for the inconvenience.
                            </p>
                        </div>
                        <div id="message-unknown-error"
                            className={`${this.state.status !== null && this.state.status !== 200
                                && this.state.status !== 400 && this.state.status !== 500 ? "show" : ""}`}>
                            <i className="fas fa-redo-alt"></i>
                            <h3>Uh. Oh. Something went wrong.</h3>
                            <p>Please try again later.<br />Sorry for the inconvenience.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Message;