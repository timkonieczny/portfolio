import React, { Component } from "react"

class WorkItem extends Component {
    render() {
        return <div className={`cell ${this.props.large ? "large" : ""}`}>
            <picture>
                <source srcSet={this.props.webp} type="image/webp" />
                <img src={this.props.jpg} />
            </picture>
            <div className="content">
                <h3>{this.props.title}</h3>
                <p>{this.props.description}</p>
                <a className="animated link-with-icon" href="#"><i
                    className="fas fa-long-arrow-alt-right"></i><span>browse</span></a>
                <p className="tags">
                    {this.props.tags.map((tag, i) => {
                        return <span key={i} className="tag">{tag}</span>
                    })}
                </p>
            </div>
        </div>
    }
}

export default WorkItem