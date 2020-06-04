import React, { Component } from "react"
import BackButton from "./BackButton"
import WorkItem from "./WorkItem"

import gbf1 from "../../../assets/gbf1.webp"
import gbf1Jpg from "../../../assets/gbf1.jpg"
import gbf2 from "../../../assets/gbf3.webp"
import gbf2Jpg from "../../../assets/gbf3.jpg"

import lfw1 from "../../../assets/lfw4.webp"
import lfw1Jpg from "../../../assets/lfw4.jpg"
import lfw2 from "../../../assets/lfw6.webp"
import lfw2Jpg from "../../../assets/lfw6.jpg"

import ReactGA from "react-ga"
import { work } from "../strings"
import MessageButtons from "./MessageButtons"
import WorkItemMeta from "./WorkItemMeta"

class Work extends Component {

    onScroll(event) {
        if (event.deltaX === 0)
            event.currentTarget.scrollLeft += event.deltaY
    }

    componentDidMount() {
        ReactGA.pageview(window.location.pathname + window.location.search)
        this.grid.addEventListener("wheel", this.onScroll)
    }

    componentWillUnmount() {
        this.grid.removeEventListener("wheel", this.onScroll)
    }

    render() {
        return (
            <div id="work-wrapper" className="section-wrapper">
                <div>
                    <BackButton hasHistory={!this.props.isAppearing} clickListener={this.props.clickListener} />
                </div>
                <div id="work-content">
                    <h2>{work.headline}.</h2>
                    <div id="grid" ref={element => this.grid = element}>
                        <WorkItem title="Gumboot Friday" description="Throw your gumboot as far as you can in the name
                            of raising money for youth mental health counselling."
                            tags={["Three.js", "GLTF", "React", "SASS", "Webpack", "Babel"]} large={true} webp={gbf1}
                            jpg={gbf1Jpg} jpgHover={gbf2Jpg} webpHover={gbf2} link="https://www.gumbootfriday.nz/" />
                        <WorkItem title="Living Flowerwall" description="Remembering the victims of the Christchurch
                            terror attacks, 15 March 2019. Explore stories of unity, then add your own message to this
                            interactive memorial" tags={["Three.js", "GLTF", "React", "SASS", "Webpack", "Babel"]}
                            large={true} webp={lfw1} jpg={lfw1Jpg} jpgHover={lfw2Jpg} webpHover={lfw2}
                            link="https://livingflowerwall.rnz.co.nz/" />
                        <WorkItemMeta />
                        <div className="cell large">
                            <MessageButtons clickListener={this.props.clickListener} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Work