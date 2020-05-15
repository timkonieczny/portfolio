import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class BackButton extends Component {

    render() {
        if (this.props.hasHistory)
            return (
                <a className="back-arrow" data-animation="back" tabIndex="1"
                    onClick={event => { this.props.clickListener(event); this.props.history.goBack() }}>
                    <FontAwesomeIcon icon="long-arrow-alt-left" />
                </a>)
        else return (
            <Link to="/" className="back-arrow" data-animation="headline" tabIndex="1"
                onClick={this.props.clickListener}>
                <FontAwesomeIcon icon="long-arrow-alt-left" />
            </Link>)
    }
}

export default withRouter(BackButton);