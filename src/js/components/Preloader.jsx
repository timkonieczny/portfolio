import React from "react"
import { useAppSelector } from "../hooks"

const Preloader = () => {
    const progress = useAppSelector(state => state.progress.progress)
    const isComplete = progress === 100
    return (
        <div id="preloader" style={isComplete ? { visibility: "hidden", top: "100%", height: 0 } : {}}>
            <p>{String(Math.round(progress)).padStart(3, '0')}</p>
            <div className="track">
                <div className="bar" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    )
}

export default Preloader