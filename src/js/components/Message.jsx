import React, { Component } from "react";
import { mailServerURL } from "../URLs"

class Message extends Component {

    componentDidMount() {

        const invalidInputText = document.querySelector("#invalid-input-wrapper p")
        const invalidInputWrapper = document.querySelector("#invalid-input-wrapper")
        const submitButtonWrapper = document.querySelector("#submit-button-wrapper")
        const nameField = document.querySelector("#name-input")
        const emailField = document.querySelector("#emailaddress-input")
        const subjectField = document.querySelector("#subject-input")
        const messageField = document.querySelector("#message-input")

        const messageForm = document.querySelector("#message-wrapper form")

        const messageFormWrapper = document.querySelector("#message-form-wrapper")


        let isAnimationPending = true


        const timetrapStart = Date.now()
        let isFormDisabled = false

        let isSendAnimationFinished = false
        let hasRequestReadyState = false
        let requestStatus;


        const onInvalidInputFocus = event => {
            event.currentTarget.classList.remove("invalid")
            invalidInputWrapper.classList.add("hide")
            submitButtonWrapper.classList.remove("hide")
            event.currentTarget.removeEventListener("focus", onInvalidInputFocus)
        }

        const showMessageConfirmation = requestStatus => {
            switch (requestStatus) {
                case 200:
                    document.querySelector("#message-success").classList.add("show")
                    break
                case 400:
                    document.querySelector("#message-client-error").classList.add("show")
                    break
                case 500:
                    document.querySelector("#message-server-error").classList.add("show")
                    break
                default:
                    document.querySelector("#message-unknown-error").classList.add("show")
                    break
            }
        }

        const validateInput = (input, errorMessage) => {
            if (!input.value) {
                invalidInputText.innerText = errorMessage
                input.classList.add("invalid")
                invalidInputWrapper.classList.remove("hide")
                submitButtonWrapper.classList.add("hide")
                input.addEventListener("focus", onInvalidInputFocus)
                return false
            }
            return true
        }

        const validateEmail = (input, errorMessage) => {
            const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            if (!input.value || !regex.test(input.value)) {
                invalidInputText.innerText = errorMessage
                input.classList.add("invalid")
                invalidInputWrapper.classList.remove("hide")
                submitButtonWrapper.classList.add("hide")
                input.addEventListener("focus", onInvalidInputFocus)
                return false
            }
            return true
        }

        const onMessageFormSubmit = event => {
            event.preventDefault()

            if (validateInput(nameField, "Please enter your name.") &&
                validateEmail(emailField, "Please enter a valid email address.") &&
                validateInput(subjectField, "Please enter a subject.") &&
                validateInput(messageField, "Please enter a message.")) {

                // anti spam timetrap
                if (isFormDisabled || Date.now() - timetrapStart < 3000) {
                    isFormDisabled = true
                    return
                }

                const request = new XMLHttpRequest();
                request.addEventListener("readystatechange", event => {
                    if (event.currentTarget.readyState == 4) {
                        if (isSendAnimationFinished) {
                            showMessageConfirmation(event.currentTarget.status)
                        } else {
                            requestStatus = event.currentTarget.status
                            hasRequestReadyState = true
                        }
                    }
                    if (isAnimationPending) {
                        isAnimationPending = false
                        messageForm.classList.add("sent")
                        messageFormWrapper.style.overflow = "visible"
                        const onSentAnimationEnd = _ => {
                            messageFormWrapper.style.overflow = ""
                            document.querySelector("#message-confirmation").classList.add("show")
                            messageForm.style.display = "none"
                            if (hasRequestReadyState)
                                showMessageConfirmation(requestStatus)
                            else
                                isSendAnimationFinished = true
                            messageForm.removeEventListener("animationend", onSentAnimationEnd)
                        }
                        messageForm.addEventListener("animationend", onSentAnimationEnd)
                    }
                })

                request.open("POST", mailServerURL);

                request.send(new FormData(document.querySelector("#message-wrapper form")));
            }
        }


        messageForm.addEventListener("submit", onMessageFormSubmit)

    }


    render() {
        return (
            <div id="message-wrapper" className="section-wrapper">
                <div>
                    <a className="back-arrow" data-animation="headline" tabIndex="1" href="#"><i
                        className="fas fa-long-arrow-alt-left"></i></a>
                </div>
                <div id="message-form-wrapper">
                    <h2>Let's have a chat.</h2>
                    <form noValidate>
                        <div className="field-wrapper">
                            <span>
                                <input placeholder="Name" name="name" tabIndex="2" autoComplete="on" id="name-input" />
                                <span></span>
                                <input placeholder="Email" name="emailaddress" type="email" tabIndex="3" autoComplete="on"
                                    id="emailaddress-input" />
                            </span>
                        </div>
                        <div className="field-wrapper">
                            <input placeholder="Subject" name="subject" autoComplete="off" tabIndex="4" id="subject-input" />
                        </div>
                        <div className="field-wrapper" id="textarea-wrapper">
                            <textarea placeholder="Message" name="message" autoComplete="off" tabIndex="5"
                                id="message-input"></textarea>
                        </div>
                        <div className="field-wrapper" id="submit-button-wrapper">
                            <button id="send-button" type="submit" tabIndex="6">
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                        <div className="field-wrapper hide" id="invalid-input-wrapper">
                            <i className="fas fa-exclamation-triangle"></i>
                            <p>Please fill out all the fields.</p>
                        </div>
                        <input className="honey" placeholder="Phone" name="phone" tabIndex="-1" autoComplete="no" type="tel" />
                        <input className="honey" placeholder="Website" name="website" tabIndex="-1" autoComplete="no" type="url" />
                        <input className="honey" placeholder="Email" name="email" tabIndex="-1" autoComplete="no" type="email" />
                    </form>
                    <div id="message-confirmation">
                        <div id="message-success">
                            <i className="fas fa-paper-plane"></i>
                            <h3>Thank you for your message.</h3>
                            <p>I'll get back to you as soon as possible!</p>
                        </div>
                        <div id="message-client-error">
                            <i className="fas fa-robot"></i>
                            <h3>400 (Bad Request)</h3>
                            <p>
                                The server has rejected the data you entered.<br />Please try again
                                later.<br />Sorry for the inconvenience.
                            </p>
                        </div>
                        <div id="message-server-error">
                            <i className="fas fa-redo-alt"></i>
                            <h3>400 (Internal Server Error)</h3>
                            <p>
                                Uh. Oh. Something went wrong.<br />Please try again later.<br />Sorry
                                for the inconvenience.
                            </p>
                        </div>
                        <div id="message-unknown-error">
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