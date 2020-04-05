import React, { Component } from "react";

class Home extends Component {
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
                    <button className="message-button animated" data-animation="message" tabIndex="1">
                        get in touch
                    </button>
                    <button className="linkedin-button animated" data-animation="linkedin" tabIndex="2">
                        <i className="fab fa-linkedin-in"></i>connect on LinkedIn
                    </button>
                </div>
                <a className="animated link-with-icon" id="about-button" data-animation="about" tabIndex="3" href="#"><i
                    className="fas fa-long-arrow-alt-right"></i><span>learn more</span></a>
                <a className="animated link-with-icon" id="work-button" data-animation="work" tabIndex="4" href="#"><i
                    className="fas fa-long-arrow-alt-right"></i><span>work</span></a>
            </div>
        );
    }
}

export default Home;