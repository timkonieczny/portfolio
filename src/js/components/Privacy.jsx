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
            <div id="privacy-policy-wrapper" className="section-wrapper" >
                <div>
                    <BackButton hasHistory={!this.props.isAppearing} clickListener={this.props.clickListener} />
                </div>
                <div id="privacy-policy-content">
                    <h2>{privacy.headline}</h2>
                    <h3>{privacy.privacyStatement}</h3>
                    <p>{privacy.privacyStatementText}</p>
                    <h3>{privacy.legalInfo}</h3>
                    <p>
                        Tim Konieczny<br />
                        <span>{Secret.street}</span><br />
                        <span>{Secret.city}</span><br />
                        <span>{Secret.country}</span><br />
                        Phone: <span><a className="inline" href={`tel:${Secret.phone}`}>{Secret.phone}</a></span><br />
                        Email: <span><a className="inline" href={`mailto:${Secret.email}`}>{Secret.email}</a></span>
                    </p>
                </div>
            </div>
        )
    }
}

export default Privacy