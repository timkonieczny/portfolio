import React, { Component } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Switch, Route, withRouter } from "react-router-dom";
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

    // FIXME: during history forward history.action === "POP" -> wrong animation
    // FIXME: back button click when there is no history triggers wrong animation
    render() {
        return (
            <TransitionGroup id="wrapper" ref={element => { this.wrapper = element }}
                style={this.props.show ? { opacity: 1 } : {}}
                childFactory={child => React.cloneElement(child,
                    { classNames: `${this.props.history.action === "PUSH" ? "push" : "pop"}` })}>
                <CSSTransition
                    key={this.props.location.key}
                    timeout={500}
                    classNames={`${this.props.immutableLocation.action === "PUSH" ? "push" : "pop"}`}
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

export default withRouter(AnimatedSwitch)