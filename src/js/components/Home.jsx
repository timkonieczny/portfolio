import React, { Component } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import strings from "../strings"
import ReactGA from "react-ga"

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
                <Link to="/work" className="animated link-with-icon" id="work-button" data-animation="work" tabIndex="4"
                    onClick={this.props.clickListener}>
                    <FontAwesomeIcon icon="long-arrow-alt-right" /><span>{strings.work}</span>
                </Link>
                <Link to="/about" className="animated link-with-icon" id="about-button" data-animation="about"
                    tabIndex="3" onClick={this.props.clickListener}>
                    <FontAwesomeIcon icon="long-arrow-alt-right" /><span>{strings.services}</span>
                </Link>
                <br />
                <Link to="/privacypolicy" id="privacy-policy-button" className="animated link-with-icon"
                    data-animation="privacypolicy" tabIndex="4" onClick={this.props.clickListener}>
                    <FontAwesomeIcon icon="long-arrow-alt-right" />
                    <span>{strings.privacy}</span>
                </Link>
            </div>
        )
    }
}

export default Home