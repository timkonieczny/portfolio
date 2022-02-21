import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch } from "react-redux"
import { pushPreviousPath } from "../actions"
import { useAppSelector } from "../hooks"

type Props = {
    from: string,
    to: string,
    animation: string,
    text: string,
}

const ArrowLink = ({ from, to, animation, text }: Props) => {

    const dispatch = useDispatch()

    const startAnimation = useAppSelector(state => state.webGLReducer.startAnimation)

    const onClick = () => {
        startAnimation(animation)
        dispatch(pushPreviousPath(from))
    }
    return (<Link
        to={to}
        className="animated link-with-icon"
        onClick={onClick}>
        <FontAwesomeIcon icon="long-arrow-alt-right" />
        <span>{text}</span>
    </Link>)
}

export default ArrowLink