import React, { Fragment, useEffect } from "react"
import Preloader from "./Preloader"
import Canvas from "./Canvas"
import { useAppSelector } from "../hooks"
import AnimatedSwitch from "./AnimatedSwitch"
import { CustomRouter } from "./CustomRouter"
import history from "../history"
import { useStore } from "react-redux"

const Wrapper = () => {
    const progress = useAppSelector(state => state.progressReducer.progress)

    const store = useStore()

    useEffect(() => {
        let cleanup
        const unsubscribe = store.subscribe(() => {
            const startAnimation = store.getState().webGLReducer.startAnimation
            if (startAnimation) {
                unsubscribe()
                const unlisten = history.listen((history) => {
                    const { location } = history
                    startAnimation(location.pathname)
                })
                cleanup = unlisten
            }
        })
        return cleanup
    }, [])

    return (
        <Fragment>
            <Canvas />
            <Preloader progress={progress} />
            <CustomRouter history={history}>
                <AnimatedSwitch />
            </CustomRouter>
        </Fragment >
    )
}

export default Wrapper