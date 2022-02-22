import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppSelector } from "../hooks";
import { Link } from "react-router-dom";

const BackButton = () => {

    const navigate = useNavigate()
    const historyAction = useAppSelector(state => state.historyReducer.historyAction)

    const onClick = () => { navigate(-1) }

    return historyAction
        ? (<a className="back-arrow" onClick={onClick}><FontAwesomeIcon icon="long-arrow-alt-left" /></a>)
        : (<Link to="/" className="back-arrow"><FontAwesomeIcon icon="long-arrow-alt-left" /></Link>)
}

export default BackButton;