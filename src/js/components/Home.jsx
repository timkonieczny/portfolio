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
                <MessageButtons clickListener={this.props.clickListener} startTabIndex={1} />
                <ArrowLink to="/work" id="work-button" animation="work" tabIndex="4"
                    clickListener={this.props.clickListener} text={home.work} />
                <ArrowLink to="/services" id="services-button" animation="services"
                    tabIndex="5" clickListener={this.props.clickListener} text={home.services} />
                <ArrowLink to="/about" id="about-button" animation="about"
                    tabIndex="6" clickListener={this.props.clickListener} text={home.about} />
                <br />
                <ArrowLink to="/privacy" id="privacy-policy-button" animation="privacy" tabIndex="7"
                    clickListener={this.props.clickListener} text={home.privacy} />
            </div>
        )
    }
}

export default Home