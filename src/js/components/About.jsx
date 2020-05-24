import React, { Component } from "react"
import BackButton from "./BackButton"
import ReactGA from "react-ga"
import strings from "../strings"
import MessageButtons from "./MessageButtons"

class About extends Component {

    componentDidMount() {
        ReactGA.pageview(window.location.pathname + window.location.search)
    }

    render() {
        return (
            <div id="about-wrapper" className="section-wrapper">
                <div>
                    <BackButton hasHistory={!this.props.isAppearing} mouseEnterListener={this.props.mouseEnterListener}
                        mouseLeaveListener={this.props.mouseLeaveListener} clickListener={this.props.clickListener} />
                </div>
                <div id="about-content">
                    <h2>{strings.services}.</h2>
                    <p lang="en">
                        {/* Ich helfe Ihnen gerne bei der Umsetzung von Webprojekten fürs 21. Jahrhundert! */}
                        Sie haben Projektideen für das Internet von morgen? Ich helfe Ihnen gerne dabei, sie zur Realität zu machen!
                        {/* Bringen Sie Ihre Webprojekte aufs nächste Level. Ich helfe Ihnen gerne! */}
                        {/* Bringen Sie Ihre Webprojekte ins 21. Jahrhundert. Ich helfe Ihnen gerne! */}
                        {/* Bringen Sie Ihre Website in 3D. Ich helfe Ihnen gerne!
                        Fügen Sie Ihrer Website die die dritte Dimension hinzu. Ich helfe Ihnen gerne! */}
                        {/* Ambitionierte Pläne? Innovative Konzepte? Oder einfach nur ein paar Fragen? */}
                    </p>
                    <MessageButtons clickListener={this.props.clickListener} startTabIndex={1} />
                    <h3>3D im Web</h3>
                    <p lang="en">
                        Ich helfe Ihnen, innovative 3D-Konzepte umzusetzen - vom Prototyp zum finalen Produkt.
                    </p>
                    <ul>
                        <li>Konzeption, Beratung und Umsetzung</li>
                        <li>Interaktion und Animation</li>
                        <li>Visualisierung</li>
                        <li>Game development</li>
                        <li>Virtual und Augmented Reality</li>
                        <li>360°-Inhalte</li>
                        <li>Shaderprogrammierung und visuelle Effekte</li>
                    </ul>
                    <p lang="en">
                        Mit diesen Technologien arbeite ich besonders gerne.
                    </p>
                    <span className="tag">Three.js</span>
                    <span className="tag">WebGL</span>
                    <span className="tag">GLSL / Shaders</span>
                    <span className="tag">GLTF</span>
                    <span className="tag">gl-matrix</span>
                    <h3>Front-end-Entwicklung</h3>
                    <p lang="en">
                        Ich helfe Ihnen bei der Erstellung einer Website, die Sie, Ihr Unternehmen oder ihr Produkt perfekt repräsentiert.
                    </p>
                    <ul>
                        <li>Konzeption, Planung und Umsetzung</li>
                        <li>Interaktive Websites mit Fokus auf Intuitivität und User Experience</li>
                        <li>Passgenaue Umsetzung von Designs</li>
                        <li>Animationen</li>
                        <li>One-Page-Applikationen</li>
                        <li>Responsive Webdesign</li>
                        <li>Digital experiences, die über konventionelle Websites hinausgehen</li>
                    </ul>
                    <p lang="en">
                        Mit diesen Technologien arbeite ich besonders gerne.
                    </p>
                    <span className="tag">TypeScript</span>
                    <span className="tag">CSS / SASS</span>
                    <span className="tag">Webpack</span>
                    <span className="tag">React</span>
                    <span className="tag">NPM</span>
                    <span className="tag">Git / GitHub</span>
                    {/* <p lang="en">
                        I can also help you with
                        <b>native <span className="no-hyphenation">Android</span> development</b>,
                        including both <b>UI-driven apps</b> and
                        <b>computer graphics projects</b> using
                        <b className="no-hyphenation">OpenGL ES</b>.
                    </p>
                    <p lang="en">
                        <b>I’m always excited to tackle interesting projects and collaborate with
                        great people. Sounds good? Let’s have a chat!</b>
                    </p> */}
                </div>
            </div>
        )
    }
}

export default About