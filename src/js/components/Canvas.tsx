import React, { useEffect, useRef, useState } from "react";
import { setProgress, setStartAnimation } from "../actions";
import { useAppDispatch } from "../hooks";
import Scene from "../Scene"

const Canvas = () => {
    let scene: Scene;

    const [isRendering, setIsRendering] = useState(false)

    const canvas = useRef(null)

    const dispatch = useAppDispatch()

    const onProgress = (event: any) => {
        dispatch(setProgress(event))

    }
    useEffect(() => {
        if (!isRendering) {
            setIsRendering(true)

            scene = new Scene()
            scene.addEventListener("progress", onProgress)
            scene.addEventListener("initComplete", onProgress)
            scene.initialize(canvas.current).then(
                () => {
                    scene.render.call(scene)
                    dispatch(
                        setStartAnimation(
                            scene.startAnimation.bind(scene)
                        )
                    )
                }

            )
        }
    })

    return <canvas id="canvas" ref={canvas}></canvas>
}

export default Canvas;