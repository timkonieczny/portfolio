import React, { Component } from "react";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = RouteComponentProps & {
    hasHistory: boolean,
    clickListener: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
    history: History,
}

class BackButton extends Component<Props> {

    render() {
        if (this.props.hasHistory)
            return (
                <a className="back-arrow" data-animation="back" onClick={this.props.history.goBack}>
                    <FontAwesomeIcon icon="long-arrow-alt-left" />
                </a>)
        else return (
            <Link to="/" className="back-arrow" data-animation="home" onClick={this.props.clickListener}>
                <FontAwesomeIcon icon="long-arrow-alt-left" />
            </Link>)
    }
}

export default withRouter(BackButton);