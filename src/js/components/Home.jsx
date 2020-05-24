import React, { Component } from "react"
import strings from "../strings"
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
                    Freelance <span>Software Engineer.</span><br />
                </h1>
                <p id="subtitle">
                    <span className="tag"><FontAwesomeIcon icon="map-marker-alt" />{strings.location}</span>
                    <span className="tag">3D</span>
                    <span className="tag">front-end</span>
                </p>
                <MessageButtons clickListener={this.props.clickListener} startTabIndex={1} />
                <ArrowLink to="/work" id="work-button" animation="work" tabIndex="4"
                    clickListener={this.props.clickListener} text={strings.work} />
                <ArrowLink to="/services" id="services-button" animation="services"
                    tabIndex="5" clickListener={this.props.clickListener} text={strings.services} />
                <ArrowLink to="/about" id="about-button" animation="about"
                    tabIndex="6" clickListener={this.props.clickListener} text={strings.about} />
                <br />
                <ArrowLink to="/privacypolicy" id="privacy-policy-button" animation="privacypolicy" tabIndex="7"
                    clickListener={this.props.clickListener} text={strings.privacy} />
            </div>
        )
    }
}

export default Home