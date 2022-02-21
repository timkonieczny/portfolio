import React, { Component } from "react"
import BackButton from "./BackButton"
import ReactGA from "react-ga"
import { about, home } from "../strings"
import webp from "../../../assets/profile.webp"
import jpg from "../../../assets/profile.jpg"
import MessageButtons from "./MessageButtons"
import ArrowLink from "./ArrowLink"

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
                    <BackButton />
                </div>
                <div id="about-content">
                    <h2>{about.headline}.</h2>
                    <p>{about.aboutText1}</p>
                    <div className="picture-buttons">
                        <picture>
                            <source srcSet={webp} type="image/webp" />
                            <img src={jpg} />
                        </picture>
                        <MessageButtons from="/about" />
                    </div>
                    <p>{about.aboutText2}</p>
                    <p>{about.aboutText3}</p>
                    <ArrowLink from="/about" to="/services" animation="services" text={home.services} />
                    <p>{about.aboutText4}</p>
                </div>
            </div>
        )
    }
}

export default About