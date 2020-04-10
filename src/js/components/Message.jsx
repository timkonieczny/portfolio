import React, { Component } from "react";
import { mailServerURL } from "../URLs"

class Message extends Component {

    constructor() {
        super()
        this.state = {
            errorMessage: "",
            errorType: null,
            status: null,
            showForm: true,
            showConfirmation: false
        }
        this.isFormDisabled = false
        this.isSendAnimationFinished = false
        this.hasRequestReadyState = false
        this.isAnimationPending = true
    }

    componentDidMount() {
        this.timetrapStart = Date.now()
    }

    onInvalidInputFocus(event) {
        event.currentTarget.classList.remove("invalid")
        this.setState({ errorType: null })
        event.currentTarget.removeEventListener("focus", event.currentTarget.onInvalidInputFocus)
    }

    validateInput(input, errorMessage) {
        if (!input.value) {
            this.setState({ errorMessage: errorMessage, errorType: input.name })
            input.onInvalidInputFocus = this.onInvalidInputFocus.bind(this)
            input.addEventListener("focus", input.onInvalidInputFocus)
            return false
        }
        return true
    }

    validateEmail(input, errorMessage) {
        const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!input.value || !regex.test(input.value)) {
            this.setState({ errorMessage: errorMessage, errorType: input.name })
            input.onInvalidInputFocus = this.onInvalidInputFocus.bind(this)
            input.addEventListener("focus", input.onInvalidInputFocus)
            return false
        }
        return true
    }

    onMessageFormSubmit(event) {
        event.preventDefault()

        if (this.validateInput(this.nameInput, "Please enter your name.") &&
            this.validateEmail(this.emailInput, "Please enter a valid email address.") &&
            this.validateInput(this.subjectInput, "Please enter a subject.") &&
            this.validateInput(this.messageInput, "Please enter a message.")) {

            // anti spam timetrap
            if (this.isFormDisabled || Date.now() - this.timetrapStart < 3000) {
                this.isFormDisabled = true
                return
            }

            const request = new XMLHttpRequest();
            request.addEventListener("readystatechange", event => {
                let requestStatus
                if (event.currentTarget.readyState == 4) {
                    if (this.isSendAnimationFinished)
                        this.setState({ status: event.currentTarget.status })
                    else {
                        requestStatus = event.currentTarget.status
                        this.hasRequestReadyState = true
                    }
                }
                if (this.isAnimationPending) {
                    this.isAnimationPending = false
                    this.setState({ showForm: false })
                    const onSentAnimationEnd = _ => {
                        this.setState({ showConfirmation: true })
                        if (this.hasRequestReadyState)
                            this.setState({ status: event.currentTarget.status })
                        else
                            this.isSendAnimationFinished = true
                        this.messageForm.removeEventListener("animationend", onSentAnimationEnd)
                    }
                    this.messageForm.addEventListener("animationend", onSentAnimationEnd)
                }
            })

            request.open("POST", mailServerURL);
            request.send(new FormData(this.messageForm));
        }
    }

    render() {
        return (
            <div id="message-wrapper" className="section-wrapper">
                <div>
                    <a className="back-arrow" data-animation="headline" tabIndex="1" href="#"><i
                        className="fas fa-long-arrow-alt-left"></i></a>
                </div>
                <div id="message-form-wrapper"
                    style={this.state.showForm && !this.state.showConfirmation ? {} : { overflow: "visible" }}>
                    <h2>Let's have a chat.</h2>
                    <form noValidate onSubmit={this.onMessageFormSubmit.bind(this)}
                        className={`${this.state.showForm ? "" : "sent"}`}
                        style={this.state.showConfirmation ? { display: "none" } : {}}
                        ref={(element) => { this.messageForm = element }}>
                        <div className="field-wrapper">
                            <span>
                                <input placeholder="Name" name="name" tabIndex="2" autoComplete="on" id="name-input"
                                    className={`${this.state.errorType === "name" ? "invalid" : ""}`}
                                    ref={(element) => { this.nameInput = element }} />
                                <span></span>
                                <input placeholder="Email" name="emailaddress" type="email" tabIndex="3"
                                    autoComplete="on" id="emailaddress-input"
                                    className={`${this.state.errorType === "emailaddress" ? "invalid" : ""}`}
                                    ref={(element) => { this.emailInput = element }} />
                            </span>
                        </div>
                        <div className="field-wrapper">
                            <input placeholder="Subject" name="subject" autoComplete="off" tabIndex="4"
                                id="subject-input" className={`${this.state.errorType === "subject" ? "invalid" : ""}`}
                                ref={(element) => { this.subjectInput = element }} />
                        </div>
                        <div className="field-wrapper" id="textarea-wrapper">
                            <textarea placeholder="Message" name="message" autoComplete="off" tabIndex="5"
                                id="message-input" className={`${this.state.errorType === "message" ? "invalid" : ""}`}
                                ref={(element) => { this.messageInput = element }}></textarea>
                        </div>
                        <div className={`field-wrapper ${this.state.errorType ? "hide" : ""}`} id="submit-button-wrapper">
                            <button id="send-button" type="submit" tabIndex="6">
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                        <div className={`field-wrapper ${this.state.errorType ? "" : "hide"}`} id="invalid-input-wrapper">
                            <i className="fas fa-exclamation-triangle"></i>
                            <p>{this.state.errorMessage}</p>
                        </div>
                        <input className="honey" placeholder="Phone" name="phone" tabIndex="-1" autoComplete="no" type="tel" />
                        <input className="honey" placeholder="Website" name="website" tabIndex="-1" autoComplete="no" type="url" />
                        <input className="honey" placeholder="Email" name="email" tabIndex="-1" autoComplete="no" type="email" />
                    </form>
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