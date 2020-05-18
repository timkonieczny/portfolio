import React, { Component } from "react"
import * as Secret from "../../../secret"
import BackButton from "./BackButton"
import ReactGA from "react-ga"
import strings from "../strings"

class PrivacyPolicy extends Component {

    componentDidMount() {
        ReactGA.pageview(window.location.pathname + window.location.search)
    }

    render() {
        return (
            <div id="privacy-policy-wrapper" className="section-wrapper">
                <div>
                    <BackButton hasHistory={!this.props.isAppearing} clickListener={this.props.clickListener} />
                </div>
                <div id="privacy-policy-content">
                    <h2>{strings.privacy}</h2>
                    <h3>{strings.privacyStatement}</h3>
                    <p lang="en">
                        This website uses Google Analytics, a service which transmits website
                        traffic data to Google servers. This instance of Google Analytics does not
                        identify individual users or associate your IP address with any other data
                        held by Google. Reports provided by Google Analytics are used to help
                        understand website traffic and webpage usage. You may opt out of this
                        tracking at any time by activating the “Do Not Track” setting in your
                        browser.
                    </p>
                    <h3>{strings.legalInfo}</h3>
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
        )
    }
}

export default PrivacyPolicy