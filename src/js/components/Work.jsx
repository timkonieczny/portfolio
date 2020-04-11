import React, { Component } from "react";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faPaperPlane, faRobot, faRedoAlt, faLongArrowAltLeft, faLongArrowAltRight, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";

class Work extends Component {

    componentDidMount() {
        library.add(
            faPaperPlane,
            faRobot,
            faRedoAlt,
            faLongArrowAltLeft,
            faLongArrowAltRight,
            faLinkedinIn,
            faExclamationTriangle
        )
        dom.i2svg()
    }

    render() {
        // TODO: add hyphens
        // TODO: add horizontal wheel scrolling
        // TODO: create component for tile

        return (
            <div id="work-wrapper" className="section-wrapper">
                <div>
                    <Link to="/" className="back-arrow" data-animation="headline" tabIndex="1"
                        onMouseEnter={this.props.mouseEnterListener} onMouseLeave={this.props.mouseLeaveListener}
                        onFocus={this.props.mouseEnterListener} onBlur={this.props.mouseLeaveListener}
                        onClick={this.props.clickListener}>
                        <i className="fas fa-long-arrow-alt-left"></i>
                    </Link>
                </div>
                <div id="work-content">
                    <h2>Work.</h2>
                    <div id="grid">
                        <div id="project1" className="cell">
                            <div className="image"></div>
                            <div className="content">
                                <h3>Project 1</h3>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                                    ut labore et dolore magna aliquyam</p>
                                <a className="animated link-with-icon" href="#"><i
                                    className="fas fa-long-arrow-alt-right"></i><span>browse</span></a>
                                <p className="tags">
                                    <span className="tag">tag1</span>
                                    <span className="tag">tag2</span>
                                    <span className="tag">tag3</span>
                                </p>
                            </div>
                        </div>
                        <div id="project2" className="cell">
                            <div className="image"></div>
                            <div className="content">
                                <h3>Project 2</h3>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                                    ut labore et dolore magna aliquyam</p>
                                <p className="tags">
                                    <span className="tag">tag1</span>
                                    <span className="tag">tag2</span>
                                    <span className="tag">tag3</span>
                                </p>
                            </div>
                        </div>
                        <div id="project3" className="cell">
                            <div className="image"></div>
                            <div className="content">
                                <h3>Project 3</h3>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                                    ut labore et dolore magna aliquyam</p>
                                <p className="tags">
                                    <span className="tag">tag1</span>
                                    <span className="tag">tag2</span>
                                    <span className="tag">tag3</span>
                                </p>
                            </div>
                        </div>
                        <div id="project4" className="cell">
                            <div className="image"></div>
                            <div className="content">
                                <h3>Project 4</h3>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                                    ut labore et dolore magna aliquyam</p>
                                <p className="tags">
                                    <span className="tag">tag1</span>
                                    <span className="tag">tag2</span>
                                    <span className="tag">tag3</span>
                                </p>
                            </div>
                        </div>
                        <div id="project5" className="cell">
                            <div className="image"></div>
                            <div className="content">
                                <h3>Project 5</h3>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                                    ut labore et dolore magna aliquyam</p>
                                <p className="tags">
                                    <span className="tag">tag1</span>
                                    <span className="tag">tag2</span>
                                    <span className="tag">tag3</span>
                                </p>
                            </div>
                        </div>
                        <div id="project6" className="cell">
                            <div className="image"></div>
                            <div className="content">
                                <h3>Project 6</h3>
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                                    ut labore et dolore magna aliquyam</p>
                                <p className="tags">
                                    <span className="tag">tag1</span>
                                    <span className="tag">tag2</span>
                                    <span className="tag">tag3</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Work;