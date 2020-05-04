import { MeshObject } from "./renderer/MeshObject.js"
import { Camera } from "./renderer/Camera.js";
import { Light } from "./renderer/Light.js";
import { UniformManager } from "./renderer/UniformManager.js";
import { mat4, vec3, glMatrix } from "gl-matrix"
import vertexShaderSource from "../glsl/vertex.glsl"
import fragmentShaderSource from "../glsl/fragment.glsl"
import Worker from './renderer/HexagonGrid.worker.js'
import { Time } from "./renderer/Time.js"
import { Loop } from "Loop"

class Scene extends Loop {
    constructor() {
        super()
        this.progressEventListeners = []
        this.initCompleteEventListeners = []
    }

    async initialize(canvas) {
        this.gl = canvas.getContext("webgl2")
        if (!this.gl) {
            this.gl = canvas.getContext("webgl")
            if (this.gl && !this.gl.getExtension("OES_element_index_uint")) {
                console.error("Your browser doesn't support the OES_element_index_uint extension")
                return
            }
        }
        if (!this.gl) {
            this.gl = canvas.getContext("experimental-webgl")
            if (this.gl && !this.gl.getExtension("OES_element_index_uint")) {
                console.error("Your browser doesn't support the OES_element_index_uint extension")
                turn
            }
        }
        if (!this.gl) {
            console.error("Your browser doesn't support WebGL")
            return
        }

        this.floatPrecisionVertexHigh = this.gl.getShaderPrecisionFormat(this.gl.VERTEX_SHADER, this.gl.HIGH_FLOAT).precision
        this.floatPrecisionFragmentHigh = this.gl.getShaderPrecisionFormat(this.gl.FRAGMENT_SHADER, this.gl.HIGH_FLOAT).precision
        this.floatPrecisionVertexMedium = this.gl.getShaderPrecisionFormat(this.gl.VERTEX_SHADER, this.gl.MEDIUM_FLOAT).precision
        this.floatPrecisionFragmentMedium = this.gl.getShaderPrecisionFormat(this.gl.FRAGMENT_SHADER, this.gl.MEDIUM_FLOAT).precision
        this.floatPrecisionVertexLow = this.gl.getShaderPrecisionFormat(this.gl.VERTEX_SHADER, this.gl.LOW_FLOAT).precision
        this.floatPrecisionFragmentLow = this.gl.getShaderPrecisionFormat(this.gl.FRAGMENT_SHADER, this.gl.LOW_FLOAT).precision

        if (this.floatPrecisionVertexHigh != this.floatPrecisionVertexMedium != this.floatPrecisionVertexLow) {
            if (this.floatPrecisionVertexLow >= 23) {
                vertexShaderSource.replace("precision highp float;", "precision lowp float;")
            } else if (this.floatPrecisionVertexMedium >= 23) {
                vertexShaderSource.replace("precision highp float;", "precision mediump float;")
            }
        }
        if (this.floatPrecisionFragmentHigh != this.floatPrecisionFragmentMedium != this.floatPrecisionFragmentLow) {
            if (this.floatPrecisionFragmentLow >= 23) {
                fragmentShaderSource.replace("precision highp float;", "precision lowp float;")
            } else if (this.floatPrecisionFragmentMedium >= 23) {
                fragmentShaderSource.replace("precision highp float;", "precision mediump float;")
            }
        }

        // PERFORMANCE
        // TODO: Eliminate / shrink unnecessary uniforms and attributes
        // TODO: Compare Gourand and Phong shading

        this.gl.enable(this.gl.DEPTH_TEST)
        this.gl.enable(this.gl.CULL_FACE)
        this.gl.frontFace(this.gl.CCW)
        this.gl.cullFace(this.gl.BACK)
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0)

        const program = this.gl.createProgram()
        const uniformManager = new UniformManager(this.gl, program)
        const light = new Light(vec3.set(vec3.create(), 30, 10, -10))

        const makeGeometry = _ => {
            return new Promise((resolve) => {
                const worker = new Worker();

                worker.addEventListener("message", event => {
                    switch (event.data.type) {
                        case "geometry":
                            resolve(event.data.data)
                            break
                        case "progress":
                            this.progressEventListeners.forEach(listener => { listener(event.data.data) })
                            break
                    }
                })
            })
        }

        const geometry = await makeGeometry()

        this.hexGrid = new MeshObject(this.gl, geometry, vertexShaderSource, fragmentShaderSource, light, uniformManager)

        this.camera = new Camera(
            vec3.set(vec3.create(), -50, 20, 50),
            vec3.set(vec3.create(), 0, -20, 0),
            vec3.set(vec3.create(), 0, 1, 0),
            uniformManager)

        const resize = () => {
            canvas.width = canvas.clientWidth * window.devicePixelRatio
            canvas.height = canvas.clientHeight * window.devicePixelRatio
            this.gl.viewport(0, 0, canvas.width, canvas.height)
            mat4.perspective(this.camera.projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0)
            this.hexGrid.resize(this.camera.projMatrix)
        }
        window.addEventListener("resize", resize)
        resize()
        this.time = new Time()
        this.firstFrame = true
    }

    tick(time) {
        this.time.update(time)
        this.hexGrid.update(this.time)
        this.camera.update(this.time)
        this.hexGrid.render(this.gl)
        if (this.firstFrame) {
            this.firstFrame = false
            this.initCompleteEventListeners.forEach(listener => { listener({ progress: 100, task: "complete" }) })
        }
    }

    startAnimation(name) {
        this.camera.listeners.update = []

        this.camera.removeEventListener("update", this.camera.animation.headlineIn.callbackBound)
        this.camera.removeEventListener("update", this.camera.animation.messageIn.callbackBound)
        this.camera.removeEventListener("update", this.camera.animation.aboutIn.callbackBound)
        this.camera.removeEventListener("update", this.camera.animation.privacyPolicyIn.callbackBound)
        this.camera.removeEventListener("update", this.camera.animation.workIn.callbackBound)
        this.camera.removeEventListener("update", this.camera.animation.linkedInIn.callbackBound)
        this.camera.removeEventListener("update", this.camera.animation.out.callbackBound)

        this.camera.animation.out.init(this.camera.position, this.camera.lookAt, this.camera.up)
        this.camera.addEventListener("update", this.camera.animation.out.callbackBound)
        this.camera.animation[`${name}In`].init()
        this.camera.addEventListener("update", this.camera.animation[`${name}In`].callbackBound)
        this.hexGrid.addEventListener("update", this.hexGrid.animation[name].callbackBound)
    }

    addEventListener(type, listener) {
        switch (type) {
            case "progress":
                this.progressEventListeners.push(listener)
                break
            case "initComplete":
                this.initCompleteEventListeners.push(listener)
                break
        }
    }

    removeEventListener(type, listener) {
        switch (type) {
            case "progress":
                this.progressEventListeners = this.progressEventListeners.filter(activeListener => {
                    return activeListener === listener
                })
                break
            case "initComplete":
                this.initCompleteEventListeners = this.initCompleteEventListeners.filter(activeListener => {
                    return activeListener === listener
                })
                break
        }
    }
}

export { Scene }