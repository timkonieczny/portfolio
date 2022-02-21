import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch, useAppSelector } from "../hooks";
import { popPreviousPath } from "../actions";
import { getAnimationByLocation } from "../helpers";

const BackButton = () => {

    const paths = useAppSelector((state) => state.historyReducer.previousPaths)
    const path = paths[paths.length - 1]
    const dispatch = useAppDispatch()

    const startAnimation = useAppSelector(state => state.webGLReducer.startAnimation)

    const onClick = () => {
        startAnimation(getAnimationByLocation(paths[paths.length - 1]))
        dispatch(popPreviousPath())
    }

    return (<Link to={path} className="back-arrow" onClick={onClick}>
        <FontAwesomeIcon icon="long-arrow-alt-left" />
    </Link>)
}

export default BackButton;