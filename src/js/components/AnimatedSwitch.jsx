import React, { Component } from "react"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { Switch, Route, withRouter } from "react-router-dom"
import Services from "./Services"
import Message from "./Message"
import Privacy from "./Privacy"
import Work from "./Work"
import Home from "./Home"
import About from "./About"

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

    render() {
        return (
            <TransitionGroup id="wrapper" ref={element => { this.wrapper = element }}
                style={this.props.show ? { opacity: 1 } : {}}
                childFactory={child => React.cloneElement(child,
                    { classNames: `${this.props.history.action === "POP" ? "pop" : "push"}` })}>
                <CSSTransition
                    key={this.props.location.key}
                    timeout={4000}
                    classNames={`${this.props.immutableLocation.action === "POP" ? "pop" : "push"}`}
                    appear={true}
                    onEnter={(_, isAppearing) => {
                        this.setState({ isAppearing: isAppearing })
                    }}
                    onEntered={_ => {
                        this.setState({ enableWebGLAnimations: true })
                    }}
                    onExit={_ => {
                        this.setState({ enableWebGLAnimations: false })
                    }}>
                    <Switch location={this.props.location}>
                        <Route path="/services">
                            <Services clickListener={this.props.onButtonClick}
                                isAppearing={this.state.isAppearing} />
                        </Route>
                        <Route path="/message">
                            <Message clickListener={this.props.onButtonClick}
                                isAppearing={this.state.isAppearing} />
                        </Route>
                        <Route path="/privacy">
                            <Privacy clickListener={this.props.onButtonClick}
                                isAppearing={this.state.isAppearing} />
                        </Route>
                        <Route path="/work">
                            <Work clickListener={this.props.onButtonClick}
                                isAppearing={this.state.isAppearing} />
                        </Route>
                        <Route path="/about">
                            <About clickListener={this.props.onButtonClick}
                                isAppearing={this.state.isAppearing} />
                        </Route>
                        <Route path="/">
                            <Home clickListener={this.props.onButtonClick} />
                        </Route>
                        <Route >
                            <Home clickListener={this.props.onButtonClick} />
                        </Route>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        )
    }
}

export default withRouter(AnimatedSwitch)