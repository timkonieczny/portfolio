import React, { Component } from "react"
import BackButton from "./BackButton"
import WorkItem from "./WorkItem"
import webp1 from "../../../assets/sample1.webp"
import webp2 from "../../../assets/sample2.webp"
import webp3 from "../../../assets/sample3.webp"
import webp4 from "../../../assets/sample4.webp"
import webp5 from "../../../assets/sample5.webp"
import webp6 from "../../../assets/sample6.webp"
import jpg1 from "../../../assets/sample1.jpg"
import jpg2 from "../../../assets/sample2.jpg"
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
                        <WorkItem title="Project 1" description="Lorem ipsum dolor sit amet, consetetur sadipscing 
                            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"
                            tags={["tag1", "tag2", "tag3"]} large={true} webp={webp1} jpg={jpg1} />
                        <WorkItem title="Project 2" description="Lorem ipsum dolor sit amet, consetetur sadipscing 
                            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"
                            tags={["tag1", "tag2", "tag3"]} large={false} webp={webp2} jpg={jpg2} />
                        <WorkItem title="Project 3" description="Lorem ipsum dolor sit amet, consetetur sadipscing 
                            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"
                            tags={["tag1", "tag2", "tag3"]} large={false} webp={webp3} jpg={jpg3} />
                        <WorkItem title="Project 4" description="Lorem ipsum dolor sit amet, consetetur sadipscing 
                            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"
                            tags={["tag1", "tag2", "tag3"]} large={false} webp={webp4} jpg={jpg4} />
                        <WorkItem title="Project 5" description="Lorem ipsum dolor sit amet, consetetur sadipscing 
                            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"
                            tags={["tag1", "tag2", "tag3"]} large={false} webp={webp5} jpg={jpg5} />
                        <WorkItem title="Project 6" description="Lorem ipsum dolor sit amet, consetetur sadipscing 
                            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"
                            tags={["tag1", "tag2", "tag3"]} large={true} webp={webp6} jpg={jpg6} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Work