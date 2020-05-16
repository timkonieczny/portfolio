import React, { Component } from "react";
import BackButton from "./BackButton";
import WorkItem from "./WorkItem";
import image1 from "../../../assets/sample1.webp"
import image2 from "../../../assets/sample2.webp"
import image3 from "../../../assets/sample3.webp"
import image4 from "../../../assets/sample4.webp"
import image5 from "../../../assets/sample5.webp"
import image6 from "../../../assets/sample6.webp"

class Work extends Component {

    render() {
        // TODO: add hyphens
        // TODO: add horizontal wheel scrolling

        return (
            <div id="work-wrapper" className="section-wrapper">
                <div>
                    <BackButton hasHistory={!this.props.isAppearing} clickListener={this.props.clickListener} />
                </div>
                <div id="work-content">
                    <h2>Work.</h2>
                    <div id="grid">
                        <WorkItem title="Project 1" description="Lorem ipsum dolor sit amet, consetetur sadipscing 
                            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"
                            tags={["tag1", "tag2", "tag3"]} large={true} image={image1} />
                        <WorkItem title="Project 2" description="Lorem ipsum dolor sit amet, consetetur sadipscing 
                            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"
                            tags={["tag1", "tag2", "tag3"]} large={false} image={image2} />
                        <WorkItem title="Project 3" description="Lorem ipsum dolor sit amet, consetetur sadipscing 
                            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"
                            tags={["tag1", "tag2", "tag3"]} large={false} image={image3} />
                        <WorkItem title="Project 4" description="Lorem ipsum dolor sit amet, consetetur sadipscing 
                            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"
                            tags={["tag1", "tag2", "tag3"]} large={false} image={image4} />
                        <WorkItem title="Project 5" description="Lorem ipsum dolor sit amet, consetetur sadipscing 
                            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"
                            tags={["tag1", "tag2", "tag3"]} large={false} image={image5} />
                        <WorkItem title="Project 6" description="Lorem ipsum dolor sit amet, consetetur sadipscing 
                            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam"
                            tags={["tag1", "tag2", "tag3"]} large={true} image={image6} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Work;