import React, { Component } from "react"

class WorkItem extends Component {
    render() {
        console.log(this.props.tags)
        return <div className={`cell ${this.props.large ? "large" : ""}`}>
            <div className="image" style={{ backgroundImage: `url(${this.props.image})` }}></div>
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