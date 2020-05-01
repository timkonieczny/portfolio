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
            isAppearing: true,
            enableWebGLAnimations: false
        }
    }

    // FIXME: during history forward history.action === "POP" -> wrong animation
    // FIXME: back button click when there is no history triggers wrong animation
    // FIXME: WebGL animation doesn't consider initial route
    render() {
        const onMouseEnter = event => { if (this.state.enableWebGLAnimations) this.props.onHoverableMouseEnter(event) }
        const onMouseLeave = event => { if (this.state.enableWebGLAnimations) this.props.onHoverableMouseLeave(event) }
        return (
            <TransitionGroup id="wrapper" ref={element => { this.wrapper = element }}
                style={this.props.show ? { opacity: 1 } : {}}
                childFactory={child => React.cloneElement(child,
                    { classNames: `${this.props.history.action === "POP" ? "pop" : "push"}` })}>
                <CSSTransition
                    key={this.props.location.key}
                    timeout={500}
                    classNames={`${this.props.immutableLocation.action === "POP" ? "pop" : "push"}`}
                    appear={true}
                    onEnter={(_, isAppearing) => {
                        console.log(isAppearing)
                        this.setState({ isAppearing: isAppearing })
                    }}
                    onEntered={_ => {
                        this.setState({ enableWebGLAnimations: true })
                    }}
                    onExit={_ => {
                        this.setState({ enableWebGLAnimations: false })
                    }}>
                    <Switch location={this.props.location}>
                        <Route path="/about">
                            <About mouseEnterListener={onMouseEnter}
                                mouseLeaveListener={onMouseLeave}
                                clickListener={this.props.onButtonClick}
                                isAppearing={this.state.isAppearing} />
                        </Route>
                        <Route path="/message">
                            <Message mouseEnterListener={onMouseEnter}
                                mouseLeaveListener={onMouseLeave}
                                clickListener={this.props.onButtonClick}
                                isAppearing={this.state.isAppearing} />
                        </Route>
                        <Route path="/privacypolicy">
                            <PrivacyPolicy mouseEnterListener={onMouseEnter}
                                mouseLeaveListener={onMouseLeave}
                                clickListener={this.props.onButtonClick}
                                isAppearing={this.state.isAppearing} />
                        </Route>
                        <Route path="/work">
                            <Work mouseEnterListener={onMouseEnter}
                                mouseLeaveListener={onMouseLeave}
                                clickListener={this.props.onButtonClick}
                                isAppearing={this.state.isAppearing} />
                        </Route>
                        <Route path="/">
                            <Home mouseEnterListener={onMouseEnter}
                                mouseLeaveListener={onMouseLeave}
                                clickListener={this.props.onButtonClick} />
                        </Route>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        )
    }
}

export default withRouter(AnimatedSwitch)