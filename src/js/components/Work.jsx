import React, { Component } from "react";

class Work extends Component {
    render() {
        // TODO: add hyphens
        // TODO: add horizontal wheel scrolling
        // TODO: create component for tile

        return (
            <div id="work-wrapper" className="section-wrapper">
                <div>
                    <a className="back-arrow" data-animation="headline" tabIndex="1" href="#"><i
                        className="fas fa-long-arrow-alt-left"></i></a>
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