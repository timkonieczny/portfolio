import React, { Component } from "react";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faPaperPlane, faRobot, faRedoAlt, faLongArrowAltLeft, faLongArrowAltRight, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import MessageForm from "./MessageForm";
import MessageConfirmation from "./MessageConfirmation";
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";

class Message extends Component {

    constructor() {
        super()
        this.state = {
            status: null,
            showConfirmation: false,
            isAnimationRunning: false
        }
    }

    componentDidMount() {
        library.add(
            faPaperPlane,
            faRobot,
            faRedoAlt,
            faLongArrowAltLeft,
            faLongArrowAltRight,
            faLinkedinIn,
            faExclamationTriangle
        )
        dom.i2svg()
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
                    <Link to="/" className="back-arrow" data-animation="headline" tabIndex="1"
                        onMouseEnter={this.props.mouseEnterListener} onMouseLeave={this.props.mouseLeaveListener}
                        onFocus={this.props.mouseEnterListener} onBlur={this.props.mouseLeaveListener}
                        onClick={this.props.clickListener}>
                        <i className="fas fa-long-arrow-alt-left"></i>
                    </Link>
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