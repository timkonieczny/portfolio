import React, { Component } from "react";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faPaperPlane, faRobot, faRedoAlt, faLongArrowAltLeft, faLongArrowAltRight, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { Link } from "react-router-dom";

class Home extends Component {

    componentDidMount() {
        library.add(
            faLongArrowAltRight,
            faLinkedinIn
        )
        dom.i2svg()
    }

    render() {
        return (
            <div id="headline-wrapper" className="section-wrapper">
                <h1>
                    Hello,<br />
                    I'm Tim,<br />
                    <span>Freelance Developer.</span><br />
                </h1>
                <p id="subtitle">
                    <span>3D</span><span className="separator">|</span><span>digital experiences</span><span
                        className="separator">|</span><span>front-end development</span>
                </p>
                <div className="message-buttons">
                    <Link to="/message" className="button message-button animated" data-animation="message"
                        tabIndex="1" onMouseEnter={this.props.mouseEnterListener}
                        onMouseLeave={this.props.mouseLeaveListener} onFocus={this.props.mouseEnterListener}
                        onBlur={this.props.mouseLeaveListener} onClick={this.props.clickListener}>
                        get in touch
                    </Link>
                    <a className="button linkedin-button animated" data-animation="linkedin" tabIndex="2"
                        onMouseEnter={this.props.mouseEnterListener} onMouseLeave={this.props.mouseLeaveListener}
                        onFocus={this.props.mouseEnterListener} onBlur={this.props.onMouseLeaveListener}
                        onClick={this.props.clickListener}>
                        <i className="fab fa-linkedin-in"></i>connect on LinkedIn
                    </a>
                </div>
                <Link to="/about" className="animated link-with-icon" id="about-button" data-animation="about"
                    tabIndex="3" onMouseEnter={this.props.mouseEnterListener}
                    onMouseLeave={this.props.mouseLeaveListener} onFocus={this.props.mouseEnterListener}
                    onBlur={this.props.mouseLeaveListener} onClick={this.props.clickListener}>
                    <i className="fas fa-long-arrow-alt-right"></i><span>learn more</span>
                </Link>
                <Link to="/work" className="animated link-with-icon" id="work-button" data-animation="work" tabIndex="4"
                    onMouseEnter={this.props.mouseEnterListener} onMouseLeave={this.props.mouseLeaveListener}
                    onFocus={this.props.mouseEnterListener} onBlur={this.props.mouseLeaveListener}
                    onClick={this.props.clickListener}>
                    <i className="fas fa-long-arrow-alt-right"></i><span>work</span>
                </Link>
            </div>
        );
    }
}

export default Home;