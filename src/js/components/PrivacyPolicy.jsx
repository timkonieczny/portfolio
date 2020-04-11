import React, { Component } from "react";
import * as Secret from "../../../secret"
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faPaperPlane, faRobot, faRedoAlt, faLongArrowAltLeft, faLongArrowAltRight, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";

class PrivacyPolicy extends Component {

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

    render() {
        return (
            <div id="privacy-policy-wrapper" className="section-wrapper">
                <div>
                    <Link to="/" className="back-arrow" data-animation="headline" tabIndex="1"
                        onMouseEnter={this.props.mouseEnterListener} onMouseLeave={this.props.mouseLeaveListener}
                        onFocus={this.props.mouseEnterListener} onBlur={this.props.mouseLeaveListener}
                        onClick={this.props.clickListener}>
                        <i className="fas fa-long-arrow-alt-left"></i>
                    </Link>
                </div>
                <div id="privacy-policy-content">
                    <h2>About this website.</h2>
                    <h3>Privacy policy</h3>
                    <p lang="en">
                        This website uses Google Analytics, a service which transmits website
                        traffic data to Google servers. This instance of Google Analytics does not
                        identify individual users or associate your IP address with any other data
                        held by Google. Reports provided by Google Analytics are used to help
                        understand website traffic and webpage usage. You may opt out of this
                        tracking at any time by activating the “Do Not Track” setting in your
                        browser.
                    </p>
                    <h3>Legal information</h3>
                    <p lang="en">
                        Tim Konieczny<br />
                        <span className="reverse">{Secret.street}</span><br />
                        <span className="reverse">{Secret.city}</span><br />
                        <span className="reverse">{Secret.country}</span><br />
                        Phone: <span className="reverse">{Secret.phone}</span><br />
                        Email: <span className="reverse">{Secret.email}</span>
                    </p>
                </div>
            </div>
        );
    }
}

export default PrivacyPolicy;