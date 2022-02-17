import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppDispatch, useAppSelector } from "../hooks";
import { popPreviousPath } from "../actions";

type Props = {
    clickListener: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

const BackButton = ({ clickListener }: Props) => {

    const paths = useAppSelector((state) => state.previousPaths)
    const path = paths[paths.length - 1]
    const dispatch = useAppDispatch()

    const onClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        clickListener(event)
        dispatch(popPreviousPath())
    }

    return (<Link to={path} className="back-arrow" data-animation="home" onClick={onClick}>
        <FontAwesomeIcon icon="long-arrow-alt-left" />
    </Link>)
}

export default BackButton;