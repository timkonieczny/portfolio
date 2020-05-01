import React, { Component } from "react";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { withRouter, Link } from "react-router-dom";

class BackButton extends Component {

    constructor() {
        super()
        library.add(faLongArrowAltLeft)
    }

    componentDidMount() {
        dom.i2svg()
    }

    componentDidUpdate() {
        dom.i2svg()
    }

    render() {
        if (this.props.hasHistory)
            return (
                <a className="back-arrow" data-animation="headline" tabIndex="1"
                    onMouseEnter={this.props.mouseEnterListener} onMouseLeave={this.props.mouseLeaveListener}
                    onFocus={this.props.mouseEnterListener} onBlur={this.props.mouseLeaveListener}
                    onClick={event => { this.props.clickListener(event); this.props.history.goBack() }}>
                    <i className="fas fa-long-arrow-alt-left"></i>
                </a>)
        else return (
            <Link to="/" className="back-arrow" data-animation="headline" tabIndex="1"
                onMouseEnter={this.props.mouseEnterListener} onMouseLeave={this.props.mouseLeaveListener}
                onFocus={this.props.mouseEnterListener} onBlur={this.props.mouseLeaveListener}
                onClick={this.props.clickListener}>
                <i className="fas fa-long-arrow-alt-left"></i>
            </Link>)
    }
}

export default withRouter(BackButton);