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

import mm1 from "../../../assets/mm1.webp"
import mm1Jpg from "../../../assets/mm1.jpg"
import mm2 from "../../../assets/mm2.webp"
import mm2Jpg from "../../../assets/mm2.jpg"

import gcf1 from "../../../assets/gcf1.webp"
import gcf1Jpg from "../../../assets/gcf1.jpg"
import gcf2 from "../../../assets/gcf2.webp"
import gcf2Jpg from "../../../assets/gcf2.jpg"

import gcp1 from "../../../assets/gcp1.webp"
import gcp1Jpg from "../../../assets/gcp1.jpg"
import gcp2 from "../../../assets/gcp2.webp"
import gcp2Jpg from "../../../assets/gcp2.jpg"

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
        const vanishingPoint = "Vanishing Point Studio"
        const vanishingPointLink = "https://vanishingpoint.studio/"

        const manaMoanaAwards = [{
            name: "Best Awards Finalist",
            link: "https://bestawards.co.nz/digital/small-scale-websites/storybox/mana-moana-digital-ocean-1/"
        }]
        const gameChangeAwards = [{
            name: "Webby Awards Honoree",
            link: "https://winners.webbyawards.com/2020/websites/features-design/best-individual-editorial-feature-media-company/120146/game-change"
        }]
        const livingFlowerwallAwards = [{
            name: "Best Awards Finalist",
            link: "https://bestawards.co.nz/digital/small-scale-websites/vanishing-point/the-living-flowerwall/"
        }]

        return (
            <div id="work-wrapper" className="section-wrapper">
                <div>
                    <BackButton hasHistory={!this.props.isAppearing} clickListener={this.props.clickListener} />
                </div>
                <div id="work-content">
                    <h2>{work.headline}.</h2>
                    <p className="intro">{work.intro}</p>
                    <div id="grid" ref={element => this.grid = element}>
                        <WorkItem title="Mana Moana / Digital Ocean" description="3D digital experience, 2020."
                            tags={["Three.js", "GLTF", "React", "SASS", "Webpack", "Babel"]} large={true} webp={mm1}
                            jpg={mm1Jpg} jpgHover={mm2Jpg} webpHover={mm2}
                            link="https://digitalocean.manamoana.co.nz/" client={vanishingPoint}
                            clientLink={vanishingPointLink} awards={manaMoanaAwards} />
                        <WorkItem title="Gumboot Friday" description="3D game, 2020."
                            tags={["Game Development", "Three.js", "GLTF", "React", "SASS", "Webpack", "Babel"]}
                            large={true} webp={gbf1} jpg={gbf1Jpg} jpgHover={gbf2Jpg} webpHover={gbf2}
                            link="https://www.gumbootfriday.nz/" client={vanishingPoint}
                            clientLink={vanishingPointLink} awards={[]} />
                        <WorkItem title="Football Game / Game Change" description="3D game, 2020."
                            tags={["Game Development", "Three.js", "GLTF", "React", "SASS", "Webpack", "Babel"]}
                            large={true} webp={gcf1} jpg={gcf1Jpg} jpgHover={gcf2Jpg} webpHover={gcf2}
                            link="https://gamechange.rnz.co.nz/gameplan/game/scene/3-1" client={vanishingPoint}
                            clientLink={vanishingPointLink} awards={gameChangeAwards} />
                        <WorkItem title="Puzzle Game / Game Change" description="3D game, 2020."
                            tags={["Game Development", "Three.js", "GLTF", "React", "SASS", "Webpack", "Babel"]}
                            large={true} webp={gcp1} jpg={gcp1Jpg} jpgHover={gcp2Jpg} webpHover={gcp2}
                            link="https://gamechange.rnz.co.nz/gameplan/game/scene/4" client={vanishingPoint}
                            clientLink={vanishingPointLink} awards={gameChangeAwards} />
                        <WorkItem title="Living Flowerwall"
                            description="3D digital experience / 3D landing page animation, 2020."
                            tags={["Three.js", "GLTF", "React", "SASS", "Webpack", "Babel"]}
                            large={true} webp={lfw1} jpg={lfw1Jpg} jpgHover={lfw2Jpg} webpHover={lfw2}
                            link="https://livingflowerwall.rnz.co.nz/" client={vanishingPoint}
                            clientLink={vanishingPointLink} awards={livingFlowerwallAwards} />
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