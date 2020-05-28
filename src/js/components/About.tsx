import React, { Component } from "react"
import BackButton from "./BackButton"
import ReactGA from "react-ga"
import { about } from "../strings"
import webp from "../../../assets/profile.webp"
import jpg from "../../../assets/profile.jpg"
import MessageButtons from "./MessageButtons"

type Props = {
    isAppearing: boolean,
    clickListener: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

class About extends Component<Props> {

    componentDidMount() {
        ReactGA.pageview(window.location.pathname + window.location.search)
    }

    render() {
        return (
            <div id="about-wrapper" className="section-wrapper">
                <div>
                    <BackButton hasHistory={!this.props.isAppearing} clickListener={this.props.clickListener} />
                </div>
                <div id="about-content">
                    <h2>{about.headline}.</h2>
                    {/* TODO: switch lang tag based on language */}
                    <p lang="en">{about.aboutText1}</p>
                    <div className="picture-buttons">
                        <picture>
                            <source srcSet={webp} type="image/webp" />
                            <img src={jpg} />
                        </picture>
                        <MessageButtons clickListener={this.props.clickListener} startTabIndex={1} />
                    </div>
                    <p lang="en">{about.aboutText2}</p>
                    <p lang="en">{about.aboutText3}</p>
                    <p lang="en">{about.aboutText4}</p>
                </div>
            </div>
        )
    }
}

export default About