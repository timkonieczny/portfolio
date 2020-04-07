import { MeshObject } from "./renderer/MeshObject.js"
import { Camera } from "./renderer/Camera.js";
import { Light } from "./renderer/Light.js";
import { InterpolatorInOut } from "./renderer/InterpolatorInOut.js";
import { InterpolatorIn } from "./renderer/InterpolatorIn.js";
import { UniformManager } from "./renderer/UniformManager.js";
import { mat4, mat3, vec3, glMatrix } from "gl-matrix"
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
                return
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
        const lightPosition = vec3.create()
        vec3.set(lightPosition, 30, 10, -10)
        const light = new Light(lightPosition)

        const position = vec3.create()
        vec3.set(position, -50, 20, 50)
        const lookAt = vec3.create()
        vec3.set(lookAt, 0, -20, 0)
        const up = vec3.create()
        vec3.set(up, 0, 1, 0)

        const messageHoverPosition = vec3.create()
        vec3.set(messageHoverPosition, 20, -25, 60)
        const messageHoverLookAt = vec3.create()
        vec3.set(messageHoverLookAt, 0, 0, 0)
        const messageHoverUp = vec3.create()
        vec3.set(messageHoverUp, 0, 1, 0)

        const linkedinHoverPosition = vec3.create()
        vec3.set(linkedinHoverPosition, 0, -40, 0)
        const linkedinHoverLookAt = vec3.create()
        vec3.set(linkedinHoverLookAt, 0, 0, 0)
        const linkedinHoverUp = vec3.create()
        vec3.set(linkedinHoverUp, 1, 0, 0)

        const aboutHoverPosition = vec3.create()
        vec3.set(aboutHoverPosition, 60, 20, 10)
        const aboutHoverLookAt = vec3.create()
        vec3.set(aboutHoverLookAt, -40, -10, -30)
        const aboutHoverUp = vec3.create()
        vec3.set(aboutHoverUp, 0, 1, 0)

        const privacyPolicyHoverPosition = vec3.create()
        vec3.set(privacyPolicyHoverPosition, 0, 40, 0)
        const privacyPolicyHoverLookAt = vec3.create()
        vec3.set(privacyPolicyHoverLookAt, 0, 0, 0)
        const privacyPolicyHoverUp = vec3.create()
        vec3.set(privacyPolicyHoverUp, 0, 0, 1)

        const workHoverPosition = vec3.create()     // TODO: Add new animation parameters for work section
        vec3.set(workHoverPosition, 0, 40, 0)
        const workHoverLookAt = vec3.create()
        vec3.set(workHoverLookAt, 0, 0, 0)
        const workHoverUp = vec3.create()
        vec3.set(workHoverUp, 0, 0, 1)

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

        const camera = new Camera(position, lookAt, up, uniformManager)

        this.animation = {
            headline: {
                hover: new InterpolatorInOut(1000, 2000, camera.originalPosition, camera.originalLookAt, camera.originalUp),
            },
            message: {
                hover: new InterpolatorInOut(1000, 1000, messageHoverPosition, messageHoverLookAt, messageHoverUp),
                click: new InterpolatorInOut(2000, 2000, null, null, null)
            },
            linkedin: {
                hover: new InterpolatorInOut(1000, 1000, linkedinHoverPosition, linkedinHoverLookAt, linkedinHoverUp),
                click: new InterpolatorInOut(2000, 2000, null, null, null)
            },
            about: {
                hover: new InterpolatorInOut(1000, 1000, aboutHoverPosition, aboutHoverLookAt, aboutHoverUp),
                click: new InterpolatorInOut(2000, 2000, null, null, null)
            },
            privacyPolicy: {
                hover: new InterpolatorInOut(1000, 1000, privacyPolicyHoverPosition, privacyPolicyHoverLookAt, privacyPolicyHoverUp),
                click: new InterpolatorInOut(2000, 2000, null, null, null)
            },
            work: {
                hover: new InterpolatorInOut(1000, 1000, workHoverPosition, workHoverLookAt, workHoverUp),
                click: new InterpolatorInOut(2000, 2000, null, null, null)
            },
            start: new InterpolatorIn(3000, 2000)
        }

        this.hexGrid.update = time => {
            let worldMatrix = mat4.create()
            const identityMatrix = mat4.create()
            const translationVector = vec3.create()
            vec3.set(translationVector, 0, -2, 0)
            mat4.translate(worldMatrix, identityMatrix, translationVector)

            let normalMatrix = mat3.create()
            let normalMatrix2 = mat4.create()
            let normalMatrix3 = mat4.create()
            mat4.invert(normalMatrix2, worldMatrix)
            mat4.transpose(normalMatrix3, normalMatrix2)
            mat3.fromMat4(normalMatrix, normalMatrix3)

            this.animation.message.hover.update(time.tslf)
            this.animation.message.click.update(time.tslf)
            this.animation.linkedin.hover.update(time.tslf)
            this.animation.linkedin.click.update(time.tslf)
            this.animation.about.hover.update(time.tslf)
            this.animation.about.click.update(time.tslf)
            this.animation.privacyPolicy.hover.update(time.tslf)
            this.animation.privacyPolicy.click.update(time.tslf)
            this.animation.work.hover.update(time.tslf)
            this.animation.work.click.update(time.tslf)
            this.animation.start.update(time.tslf)
            this.animation.headline.hover.update(time.tslf) // 0.5 to 1

            let messageParams = this.animation.message.hover.getInterpolatedDeltaCameraParameters(camera)
            let linkedinParams = this.animation.linkedin.hover.getInterpolatedDeltaCameraParameters(camera)
            let aboutParams = this.animation.about.hover.getInterpolatedDeltaCameraParameters(camera)
            let privacyPolicyParams = this.animation.privacyPolicy.hover.getInterpolatedDeltaCameraParameters(camera)
            let workParams = this.animation.work.hover.getInterpolatedDeltaCameraParameters(camera)

            let accumulatedPosition = vec3.create()
            let accumulatedLookAt = vec3.create()
            let accumulatedUp = vec3.create()

            vec3.add(accumulatedPosition, messageParams.position, linkedinParams.position)
            vec3.add(accumulatedPosition, accumulatedPosition, aboutParams.position)
            vec3.add(accumulatedPosition, accumulatedPosition, privacyPolicyParams.position)
            vec3.add(accumulatedPosition, accumulatedPosition, workParams.position)
            vec3.add(accumulatedPosition, accumulatedPosition, camera.originalPosition)

            vec3.add(accumulatedLookAt, messageParams.lookAt, linkedinParams.lookAt)
            vec3.add(accumulatedLookAt, accumulatedLookAt, aboutParams.lookAt)
            vec3.add(accumulatedLookAt, accumulatedLookAt, privacyPolicyParams.lookAt)
            vec3.add(accumulatedLookAt, accumulatedLookAt, workParams.lookAt)
            vec3.add(accumulatedLookAt, accumulatedLookAt, camera.originalLookAt)

            vec3.add(accumulatedUp, messageParams.up, linkedinParams.up)
            vec3.add(accumulatedUp, accumulatedUp, aboutParams.up)
            vec3.add(accumulatedUp, accumulatedUp, privacyPolicyParams.up)
            vec3.add(accumulatedUp, accumulatedUp, workParams.up)
            vec3.add(accumulatedUp, accumulatedUp, camera.originalUp)

            let negatedAccumulatedPosition = vec3.create()
            vec3.negate(negatedAccumulatedPosition, accumulatedPosition)
            let negatedAccumulatedLookAt = vec3.create()
            vec3.negate(negatedAccumulatedLookAt, accumulatedLookAt)
            let negatedAccumulatedUp = vec3.create()
            vec3.negate(negatedAccumulatedUp, accumulatedUp)

            vec3.set(accumulatedPosition,
                accumulatedPosition[0] * (1 - this.animation.headline.hover.interpolator) + camera.originalPosition[0] * this.animation.headline.hover.interpolator,
                accumulatedPosition[1] * (1 - this.animation.headline.hover.interpolator) + camera.originalPosition[1] * this.animation.headline.hover.interpolator,
                accumulatedPosition[2] * (1 - this.animation.headline.hover.interpolator) + camera.originalPosition[2] * this.animation.headline.hover.interpolator,
            )

            vec3.set(accumulatedLookAt,
                accumulatedLookAt[0] * (1 - this.animation.headline.hover.interpolator) + camera.originalLookAt[0] * this.animation.headline.hover.interpolator,
                accumulatedLookAt[1] * (1 - this.animation.headline.hover.interpolator) + camera.originalLookAt[1] * this.animation.headline.hover.interpolator,
                accumulatedLookAt[2] * (1 - this.animation.headline.hover.interpolator) + camera.originalLookAt[2] * this.animation.headline.hover.interpolator,
            )

            vec3.set(accumulatedUp,
                accumulatedUp[0] * (1 - this.animation.headline.hover.interpolator) + camera.originalUp[0] * this.animation.headline.hover.interpolator,
                accumulatedUp[1] * (1 - this.animation.headline.hover.interpolator) + camera.originalUp[1] * this.animation.headline.hover.interpolator,
                accumulatedUp[2] * (1 - this.animation.headline.hover.interpolator) + camera.originalUp[2] * this.animation.headline.hover.interpolator,
            )

            camera.update(accumulatedPosition, accumulatedLookAt, accumulatedUp)
            this.hexGrid.matWorldUniform.update(worldMatrix)
            this.hexGrid.matNormUniform.update(normalMatrix)
            this.hexGrid.timeUniform.update(time.elapsed * 0.001)
            this.hexGrid.displacementY0Uniform.update(this.animation.message.click.interpolator)
            this.hexGrid.displacementY1Uniform.update(this.animation.linkedin.click.interpolator)
            this.hexGrid.displacementY2Uniform.update(this.animation.about.click.interpolator)
            this.hexGrid.displacementY3Uniform.update(this.animation.privacyPolicy.click.interpolator)
            this.hexGrid.displacementY3Uniform.update(this.animation.work.click.interpolator)
            this.hexGrid.explosionUniform.update(this.animation.start.interpolator)
            this.hexGrid.doubleExplosionUniform.update(this.animation.headline.hover.interpolator)
        }

        const resize = () => {
            canvas.width = canvas.clientWidth * window.devicePixelRatio
            canvas.height = canvas.clientHeight * window.devicePixelRatio
            this.gl.viewport(0, 0, canvas.width, canvas.height)
            mat4.perspective(camera.projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0)
            this.hexGrid.resize(camera.projMatrix)
        }
        window.addEventListener("resize", resize)
        resize()
        this.time = new Time()
        this.firstFrame = true
    }

    tick(time) {
        this.time.update(time)
        this.hexGrid.update(this.time)
        this.hexGrid.render(this.gl)
        if (this.firstFrame) {
            this.firstFrame = false
            this.initCompleteEventListeners.forEach(listener => { listener({ progress: 100, task: "complete" }) })
        }
    }

    startAnimation(name, type) {
        console.log(`startAnimation ${name} ${type}`)
        console.log(this.animation[name][type])
        this.animation[name][type].isDecreasing = false
        this.animation[name][type].isIncreasing = true
    }

    endAnimation(name, type) {
        this.animation[name][type].isDecreasing = true
        this.animation[name][type].isIncreasing = false
    }

    endAllAnimations() {
        Object.keys(this.animation).forEach(name => {
            Object.keys(this.animation[name]).forEach(type => {
                if (name != "start")
                    this.endAnimation(name, type)
            }, this)
        }, this)
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