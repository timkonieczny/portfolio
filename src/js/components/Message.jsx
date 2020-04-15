import React, { Component } from "react";
import MessageForm from "./MessageForm";
import MessageConfirmation from "./MessageConfirmation";
import BackButton from "./BackButton";

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
                    <BackButton hasHistory={!this.props.isAppearing} mouseEnterListener={this.props.mouseEnterListener}
                        mouseLeaveListener={this.props.mouseLeaveListener} clickListener={this.props.clickListener} />
                </div>
                <div id="message-form-wrapper"
                    style={!this.state.showConfirmation && this.state.isAnimationRunning ? { overflow: "visible" } : {}}>
                    <h2>Let's have a chat.</h2>
                    <MessageForm onMessageSent={this.onMessageSent.bind(this)}
                        onAnimationStarted={this.onAnimationStarted.bind(this)} />
                    <MessageConfirmation show={this.state.showConfirmation} status={this.state.status} />
                </div>
            </div>
        );
    }
}

export default Message;