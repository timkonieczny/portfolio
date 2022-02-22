import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type Props = {
    to: string,
    text: string,
}

const ArrowLink = ({ to, text }: Props) => {
    return (<Link to={to} className="animated link-with-icon">
        <FontAwesomeIcon icon="long-arrow-alt-right" />
        <span>{text}</span>
    </Link>)
}

export default ArrowLink