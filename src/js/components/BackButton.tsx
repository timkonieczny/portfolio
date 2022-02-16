import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class BackButton extends Component<any> {

    render() {

        return (<Link to="/" className="back-arrow" data-animation="home" onClick={this.props.clickListener}>
            <FontAwesomeIcon icon="long-arrow-alt-left" />
        </Link>)
    }
}

export default BackButton;