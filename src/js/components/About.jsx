import React, { Component } from "react"
import BackButton from "./BackButton"
import ReactGA from "react-ga"

class About extends Component {

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
                    <h2>Über mich.</h2>
                    <p lang="en">Hallo, ich bin Tim Konieczny, Freelance Software Engineer mit Fokus auf 3D und Frontend.</p>
                    <p lang="en">Das Internet hat die Kraft, neue, innovative Konzepte der breiten Masse zugänglich zu machen. Schon seit Langem interessiere ich mich für Ideen und Technologien, die den Rahmen konventioneller Webentwicklung sprengen.</p>
                    <p lang="en">Ich arbeite freiberuflich an Projekten, in denen ich diese Leidenschaft zum Beruf machen kann. Durch einen Masterabschluss (Medieninformatik, Visual Computing) und langjährige Erfahrung in der Webentwicklung, biete ich sowohl tiefgreifendes Verständnis im Bereich der 3D- und Frontend-Entwicklung, aber auch weitreichende praktische Expertise.</p>
                    <p lang="en">Neben meiner Arbeit inspirieren mich Dinge, die mich aus meiner Komfortzone herausholen und an denen ich wachsen kann. Ich liebe es, auf Veranstaltungen zu gehen und auf Reisen kopfüber in fremde Kulturen zu springen.</p>
                </div>
            </div>
        )
    }
}

export default About