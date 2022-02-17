import React, { Component } from "react"
import BackButton from "./BackButton"
import ReactGA from "react-ga"
import { services } from "../strings"
import MessageButtons from "./MessageButtons"

class Services extends Component {

    componentDidMount() {
        ReactGA.pageview(window.location.pathname + window.location.search)
    }

    render() {
        return (
            <div id="services-wrapper" className="section-wrapper">
                <div>
                    <BackButton hasHistory={!this.props.isAppearing} mouseEnterListener={this.props.mouseEnterListener}
                        mouseLeaveListener={this.props.mouseLeaveListener} clickListener={this.props.clickListener} />
                </div>
                <div id="services-content">
                    <h2>{services.headline}.</h2>
                    <p>{services.intro}</p>
                    <MessageButtons clickListener={this.props.clickListener} from="/services" />
                    <h3>{services.section1.headline}</h3>
                    <p>{services.section1.intro}</p>
                    <ul>
                        <li>{services.section1.ul.li1}</li>
                        <li>{services.section1.ul.li2}</li>
                        <li>{services.section1.ul.li3}</li>
                        <li>{services.section1.ul.li4}</li>
                        <li>{services.section1.ul.li5}</li>
                        <li>{services.section1.ul.li6}</li>
                        <li>{services.section1.ul.li7}</li>
                        <li>{services.section1.ul.li8}</li>
                    </ul>
                    <p>{services.technologies}</p>
                    <span className="tag">Three.js</span>
                    <span className="tag">WebGL</span>
                    <span className="tag">GLSL / Shaders</span>
                    <span className="tag">GLTF</span>
                    <span className="tag">gl-matrix</span>
                    <h3>{services.section2.headline}</h3>
                    <p>{services.section2.intro}</p>
                    <ul>
                        <li>{services.section2.ul.li1}</li>
                        <li>{services.section2.ul.li2}</li>
                        <li>{services.section2.ul.li3}</li>
                        <li>{services.section2.ul.li4}</li>
                        <li>{services.section2.ul.li5}</li>
                        <li>{services.section2.ul.li6}</li>
                        <li>{services.section2.ul.li7}</li>
                    </ul>
                    <p>{services.technologies}</p>
                    <span className="tag">React</span>
                    <span className="tag">CSS / SASS</span>
                    <span className="tag">TypeScript</span>
                    <span className="tag">Webpack</span>
                    <span className="tag">Babel</span>
                    <span className="tag">NPM</span>
                    <span className="tag">Git / GitHub</span>
                </div>
            </div>
        )
    }
}

export default Services