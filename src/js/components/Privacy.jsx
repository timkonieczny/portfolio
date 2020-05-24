import React, { Component } from "react"
import * as Secret from "../../../secret"
import BackButton from "./BackButton"
import ReactGA from "react-ga"
import { privacy } from "../strings"

class Privacy extends Component {

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
                    <h2>{privacy.headline}</h2>
                    <h3>{privacy.privacyStatement}</h3>
                    <p lang="en">{privacy.privacyStatementText}</p>
                    <h3>{privacy.legalInfo}</h3>
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

export default Privacy