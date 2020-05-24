import React, { Component } from "react"
import { mailServerURL } from "../URLs"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { message } from "../strings"

class MessageForm extends Component {

    constructor() {
        super()
        this.state = {
            errorMessage: "",
            errorType: null,
            showForm: true,
            done: false
        }
        this.isFormDisabled = false
        this.isSendAnimationFinished = false
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
        const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
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

            const request = new XMLHttpRequest()
            let requestStatus = null
            request.addEventListener("readystatechange", event => {
                const done = _ => {
                    if (requestStatus && this.isSendAnimationFinished)
                        this.props.onMessageSent(requestStatus)
                }
                if (event.currentTarget.readyState == 4) {
                    requestStatus = event.currentTarget.status
                    done()
                }
                if (this.isAnimationPending) {
                    this.isAnimationPending = false
                    this.setState({ showForm: false })
                    this.props.onAnimationStarted()
                    const onSentAnimationEnd = _ => {
                        this.isSendAnimationFinished = true
                        this.setState({ done: true })
                        done()
                        this.messageForm.removeEventListener("animationend", onSentAnimationEnd)
                    }
                    this.messageForm.addEventListener("animationend", onSentAnimationEnd)
                }
            })

            request.open("POST", mailServerURL)
            request.send(new FormData(this.messageForm))
        }
    }

    render() {
        return (
            <form noValidate onSubmit={this.onMessageFormSubmit.bind(this)}
                className={`${this.state.showForm ? "" : "sent"}`}
                style={this.state.done ? { display: "none" } : {}}
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
                    <input placeholder={message.subject} name="subject" autoComplete="off" tabIndex="4"
                        id="subject-input" className={`${this.state.errorType === "subject" ? "invalid" : ""}`}
                        ref={(element) => { this.subjectInput = element }} />
                </div>
                <div className="field-wrapper" id="textarea-wrapper">
                    <textarea placeholder={message.messageText} name="message" autoComplete="off" tabIndex="5"
                        id="message-input" className={`${this.state.errorType === "message" ? "invalid" : ""}`}
                        ref={(element) => { this.messageInput = element }}></textarea>
                </div>
                <div className={`field-wrapper ${this.state.errorType ? "hide" : ""}`} id="submit-button-wrapper">
                    <button className="button" id="send-button" type="submit" tabIndex="6">
                        <FontAwesomeIcon icon="paper-plane" />
                    </button>
                </div>
                <div className={`field-wrapper ${this.state.errorType ? "" : "hide"}`} id="invalid-input-wrapper">
                    <FontAwesomeIcon icon="exclamation-triangle" />
                    <p>{this.state.errorMessage}</p>
                </div>
                <input className="honey" placeholder="Phone" name="phone" tabIndex="-1" autoComplete="no" type="tel" />
                <input className="honey" placeholder="Website" name="website" tabIndex="-1" autoComplete="no" type="url" />
                <input className="honey" placeholder="Email" name="email" tabIndex="-1" autoComplete="no" type="email" />
            </form>
        )
    }
}

export default MessageForm