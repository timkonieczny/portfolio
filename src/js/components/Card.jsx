import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { home } from "../strings"
import webp from "../../../assets/profile.webp"
import jpg from "../../../assets/profile.jpg"

const Card = () => {

    return (
        <div style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "center" }}>
            <div>
                <h1>
                    Tim Konieczny,<br />
                    <span style={{ color: "#00b0cf" }}>Freelance Software Engineer.</span><br />
                </h1>
                <p id="subtitle">
                    <span className="tag"><FontAwesomeIcon icon="map-marker-alt" />{home.location}</span>
                    <span className="tag">3D</span>
                    <span className="tag">front-end</span>
                </p>
            </div>
            <picture style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "5em" }}>
                <source srcSet={webp} type="image/webp" />
                <img src={jpg} style={{ height: "14em", borderRadius: "50%" }} />
            </picture>
        </div>
    )
}

export default Card