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
                <MessageButtons clickListener={this.props.clickListener} from="/" />
                <ArrowLink from="/" to="/work" id="work-button" animation="work" clickListener={this.props.clickListener}
                    text={home.work} />
                <ArrowLink from="/" to="/services" id="services-button" animation="services"
                    clickListener={this.props.clickListener} text={home.services} />
                <ArrowLink from="/" to="/about" id="about-button" animation="about" clickListener={this.props.clickListener}
                    text={home.about} />
                <br />
                <ArrowLink from="/" to="/privacy" id="privacy-policy-button" animation="privacy"
                    clickListener={this.props.clickListener} text={home.privacy} />
                <ArrowLink from="/" to="/message" id="privacy-policy-button2" animation="message"
                    clickListener={this.props.clickListener} text={home.message} />
            </div>
        )
    }
}

export default Home