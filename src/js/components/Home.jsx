import React, { Component } from "react"
import { home } from "../strings"
import ReactGA from "react-ga"
import ArrowLink from "./ArrowLink"
import MessageButtons from "./MessageButtons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class Home extends Component {

    componentDidMount() {
        ReactGA.pageview(window.location.pathname + window.location.search)
    }

    render() {
        return (
            <div id="home-wrapper" className="section-wrapper">
                <h1>
                    Tim Konieczny,<br />
                    <span>Freelance Software Engineer.</span><br />
                </h1>
                <p id="subtitle">
                    <span className="tag"><FontAwesomeIcon icon="map-marker-alt" />{home.location}</span>
                    <span className="tag">3D</span>
                    <span className="tag">front-end</span>
                </p>
                <MessageButtons />
                <ArrowLink to="/work" id="work-button" text={home.work} />
                <ArrowLink to="/services" id="services-button" text={home.services} />
                <ArrowLink to="/about" id="about-button" text={home.about} />
                <br />
                <ArrowLink to="/privacy" id="privacy-policy-button" text={home.privacy} />
            </div>
        )
    }
}

export default Home