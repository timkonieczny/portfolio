import React, { Component } from "react"
import BackButton from "./BackButton"
import WorkItem from "./WorkItem"
import gbf1 from "../../../assets/gbf1.webp"
import lfw1 from "../../../assets/lfw4.webp"
import gbf2 from "../../../assets/gbf3.webp"
import lfw2 from "../../../assets/lfw6.webp"
import webp3 from "../../../assets/sample3.webp"
import webp4 from "../../../assets/sample4.webp"
import webp5 from "../../../assets/sample5.webp"
import webp6 from "../../../assets/sample6.webp"
import gbf1Jpg from "../../../assets/gbf1.jpg"
import lfw1Jpg from "../../../assets/lfw4.jpg"
import gbf2Jpg from "../../../assets/gbf3.jpg"
import lfw2Jpg from "../../../assets/lfw6.jpg"
import jpg3 from "../../../assets/sample3.jpg"
import jpg4 from "../../../assets/sample4.jpg"
import jpg5 from "../../../assets/sample5.jpg"
import jpg6 from "../../../assets/sample6.jpg"
import ReactGA from "react-ga"
import { work } from "../strings"

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
        // TODO: add hyphens

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
                            jpg={gbf1Jpg} jpgHover={gbf2Jpg} webpHover={gbf2} />
                        <WorkItem title="Living Flowerwall" description="Remembering the victims of the Christchurch
                            terror attacks, 15 March 2019. Explore stories of unity, then add your own message to this
                            interactive memorial" tags={["Three.js", "GLTF", "React", "SASS", "Webpack", "Babel"]}
                            large={true} webp={lfw1} jpg={lfw1Jpg} jpgHover={lfw2Jpg} webpHover={lfw2} />
                        <WorkItem title="Project 3" description="Lorem ipsum dolor sit amet, consetetur sadipscing 
                            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"
                            tags={["tag1", "tag2", "tag3"]} large={false} webp={webp3} jpg={jpg3} jpgHover={jpg3}
                            webpHover={webp3} />
                        <WorkItem title="Project 4" description="Lorem ipsum dolor sit amet, consetetur sadipscing 
                            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"
                            tags={["tag1", "tag2", "tag3"]} large={false} webp={webp4} jpg={jpg4} jpgHover={jpg4}
                            webpHover={webp4} />
                        <WorkItem title="Project 5" description="Lorem ipsum dolor sit amet, consetetur sadipscing 
                            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"
                            tags={["tag1", "tag2", "tag3"]} large={false} webp={webp5} jpg={jpg5} jpgHover={jpg5}
                            webpHover={webp5} />
                        <WorkItem title="Project 6" description="Lorem ipsum dolor sit amet, consetetur sadipscing 
                            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"
                            tags={["tag1", "tag2", "tag3"]} large={false} webp={webp6} jpg={jpg6} jpgHover={jpg6}
                            webpHover={webp6} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Work