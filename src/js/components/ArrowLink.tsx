import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch } from "react-redux"
import { pushPreviousPath } from "../actions"

type Props = {
    from: string,
    to: string,
    animation: string,
    text: string,
    clickListener: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

const ArrowLink = ({ clickListener, from, to, animation, text }: Props) => {

    const dispatch = useDispatch()

    const onClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        clickListener(event)
        dispatch(pushPreviousPath(from))
    }
    return (<Link
        to={to}
        className="animated link-with-icon"
        data-animation={animation}
        onClick={onClick}>
        <FontAwesomeIcon icon="long-arrow-alt-right" />
        <span>{text}</span>
    </Link>)
}

export default ArrowLink