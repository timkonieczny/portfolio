import React, { Component } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import strings from "../strings"
import ReactGA from "react-ga"
import ArrowLink from "./ArrowLink"

class Home extends Component {

    componentDidMount() {
        ReactGA.pageview(window.location.pathname + window.location.search)
    }

    render() {
        return (
            <div id="home-wrapper" className="section-wrapper">
                <h1>
                    Tim Konieczny,<br />
                    Freelance<br />
                    <span>Software Engineer.</span><br />
                </h1>
                <p id="subtitle">
                    <span>3D</span><span className="separator">/</span><span>front-end</span><span
                        className="separator">/</span><span>experiential</span>
                </p>
                <div className="message-buttons">
                    <Link to="/message" className="button message-button animated" data-animation="message"
                        tabIndex="1" onClick={this.props.clickListener}>
                        {strings.message}
                    </Link>
                    <a className="button linkedin-button animated" data-animation="linkedin" tabIndex="2"
                        onClick={this.props.clickListener} href="https://www.linkedin.com/in/tim-konieczny/">
                        <FontAwesomeIcon icon={["fab", "linkedin-in"]} />{strings.linkedin}
                    </a>
                </div>
                <ArrowLink to="/work" id="work-button" animation="work" tabIndex="3"
                    clickListener={this.props.clickListener} text={strings.work} />
                <ArrowLink to="/about" id="about-button" animation="about"
                    tabIndex="4" clickListener={this.props.clickListener} text={strings.services} />
                <br />
                <ArrowLink to="/privacypolicy" id="privacy-policy-button" animation="privacypolicy" tabIndex="5"
                    clickListener={this.props.clickListener} text={strings.privacy} />
            </div>
        )
    }
}

export default Home