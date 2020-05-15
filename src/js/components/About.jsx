import React, { Component } from "react";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class About extends Component {

    render() {
        return (
            <div id="about-wrapper" className="section-wrapper">
                <div>
                    <BackButton hasHistory={!this.props.isAppearing} mouseEnterListener={this.props.mouseEnterListener}
                        mouseLeaveListener={this.props.mouseLeaveListener} clickListener={this.props.clickListener} />
                </div>
                <div id="about-content">
                    <h2>Tim Konieczny.</h2>
                    <p lang="en">
                        My main areas of expertise are <b>computer graphics</b>,
                        <b>digital experiences</b> and <b>front-end development</b>.
                    </p>
                    <p lang="en">
                        I specialize in <b>all things 3D</b> and love creating
                        <b>compelling user experiences</b> through <b>animations</b> and
                        <b>transitions</b>.
                    </p>
                    <p lang="en">
                        I focus on <b>small and medium web applications</b>. My experience ranges
                        from 3D technologies like <b className="no-hyphenation">WebGL</b>,
                        <b className="no-hyphenation">three.js</b>, <b>shaders</b> and
                        <b className="no-hyphenation">WebXR</b>, to front-end technologies like
                        <b className="no-hyphenation">React</b>, <b className="no-hyphenation">Redux</b>,
                        <b className="no-hyphenation">HTML</b>, <b className="no-hyphenation">CSS</b> and
                        <b className="no-hyphenation">JavaScript</b>.
                    </p>
                    <p lang="en">
                        I can also help you with
                        <b>native <span className="no-hyphenation">Android</span> development</b>,
                        including both <b>UI-driven apps</b> and
                        <b>computer graphics projects</b> using
                        <b className="no-hyphenation">OpenGL ES</b>.
                    </p>
                    <p lang="en">
                        <b>I’m always excited to tackle interesting projects and collaborate with
                        great people. Sounds good? Let’s have a chat!</b>
                    </p>
                    <div className="message-buttons">
                        <Link to="/message" className="button message-button" data-animation="message" tabIndex="2"
                            onClick={this.props.clickListener}>
                            get in touch
                        </Link>
                        <a className="button linkedin-button" data-animation="linkedin" tabIndex="3"
                            href="https://www.linkedin.com/in/tim-konieczny/">
                            <FontAwesomeIcon icon={["fab", "linkedin-in"]} />connect on LinkedIn
                        </a>
                    </div>
                    <Link to="/privacypolicy" id="privacy-policy-button" className="animated link-with-icon"
                        data-animation="privacypolicy" tabIndex="4" onClick={this.props.clickListener}>
                        <FontAwesomeIcon icon="long-arrow-alt-right" />
                        <span>privacy policy and legal information</span>
                    </Link>
                </div>
            </div>
        );
    }
}

export default About;