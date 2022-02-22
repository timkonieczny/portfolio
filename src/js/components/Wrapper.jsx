import React, { Fragment, useEffect } from "react"
import Preloader from "./Preloader"
import Canvas from "./Canvas"
import AnimatedSwitch from "./AnimatedSwitch"
import { CustomRouter } from "./CustomRouter"
import history from "../history"
import { useStore } from "react-redux"

const Wrapper = () => {
    const store = useStore()

    useEffect(() => {
        let cleanup
        const unsubscribe = store.subscribe(() => {
            const startAnimation = store.getState().webGL.startAnimation
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
            <Preloader />
            <CustomRouter history={history}>
                <AnimatedSwitch />
            </CustomRouter>
        </Fragment >
    )
}

export default Wrapper