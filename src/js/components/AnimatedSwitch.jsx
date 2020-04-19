import React, { Component } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Switch, Route } from "react-router-dom";
import About from "./About";
import Message from "./Message";
import PrivacyPolicy from "./PrivacyPolicy";
import Work from "./Work";
import Home from "./Home";

class AnimatedSwitch extends Component {

    constructor() {
        super()

        this.state = {
            isAppearing: true
        }
    }

    render() {

        // TODO: Trigger appropriate animation based on browser history
        // https://stackoverflow.com/questions/30915173/react-router-go-back-a-page-how-do-you-configure-history
        // https://github.com/ReactTraining/react-router/issues/1498

        return (
            <TransitionGroup id="wrapper" ref={element => { this.wrapper = element }}
                style={this.props.show ? { opacity: 1 } : {}}>
                <CSSTransition
                    key={this.props.location.key}
                    timeout={3000}
                    classNames="fade"
                    appear={true}
                    onEnter={(_, isAppearing) => {
                        this.setState({ isAppearing: isAppearing })
                    }}>
                    <Switch location={this.props.location}>
                        <Route path="/about">
                            <About mouseEnterListener={this.props.onHoverableMouseEnter}
                                mouseLeaveListener={this.props.onHoverableMouseLeave}
                                clickListener={this.props.onButtonClick}
                                isAppearing={this.state.isAppearing} />
                        </Route>
                        <Route path="/message">
                            <Message mouseEnterListener={this.props.onHoverableMouseEnter}
                                mouseLeaveListener={this.props.onHoverableMouseLeave}
                                clickListener={this.props.onButtonClick}
                                isAppearing={this.state.isAppearing} />
                        </Route>
                        <Route path="/privacypolicy">
                            <PrivacyPolicy mouseEnterListener={this.props.onHoverableMouseEnter}
                                mouseLeaveListener={this.props.onHoverableMouseLeave}
                                clickListener={this.props.onButtonClick}
                                isAppearing={this.state.isAppearing} />
                        </Route>
                        <Route path="/work">
                            <Work mouseEnterListener={this.props.onHoverableMouseEnter}
                                mouseLeaveListener={this.props.onHoverableMouseLeave}
                                clickListener={this.props.onButtonClick}
                                isAppearing={this.state.isAppearing} />
                        </Route>
                        <Route path="/">
                            <Home mouseEnterListener={this.props.onHoverableMouseEnter}
                                mouseLeaveListener={this.props.onHoverableMouseLeave}
                                clickListener={this.props.onButtonClick} />
                        </Route>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        )
    }
}

export default AnimatedSwitch