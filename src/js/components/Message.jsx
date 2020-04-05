import React, { Component } from "react";

class Message extends Component {
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