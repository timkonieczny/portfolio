import { MeshObject } from "./renderer/MeshObject.js"
import { Camera } from "./renderer/Camera.js";
import { Light } from "./renderer/Light.js";
import { InterpolatorInOut } from "./renderer/InterpolatorInOut.js";
import { InterpolatorIn } from "./renderer/InterpolatorIn.js";
import { UniformManager } from "./renderer/UniformManager.js";
import { mat4, mat3, vec3, glMatrix } from "gl-matrix"
import Stats from "stats-js"
import vertexShaderSource from "../glsl/vertex.glsl"
import fragmentShaderSource from "../glsl/fragment.glsl"
import Worker from './renderer/HexagonGrid.worker.js'
import { Time } from "./renderer/Time.js";

class Scene {
    constructor() {
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

        const floatPrecisionVertexHigh = this.gl.getShaderPrecisionFormat(this.gl.VERTEX_SHADER, this.gl.HIGH_FLOAT).precision
        const floatPrecisionFragmentHigh = this.gl.getShaderPrecisionFormat(this.gl.FRAGMENT_SHADER, this.gl.HIGH_FLOAT).precision
        const floatPrecisionVertexMedium = this.gl.getShaderPrecisionFormat(this.gl.VERTEX_SHADER, this.gl.MEDIUM_FLOAT).precision
        const floatPrecisionFragmentMedium = this.gl.getShaderPrecisionFormat(this.gl.FRAGMENT_SHADER, this.gl.MEDIUM_FLOAT).precision
        const floatPrecisionVertexLow = this.gl.getShaderPrecisionFormat(this.gl.VERTEX_SHADER, this.gl.LOW_FLOAT).precision
        const floatPrecisionFragmentLow = this.gl.getShaderPrecisionFormat(this.gl.FRAGMENT_SHADER, this.gl.LOW_FLOAT).precision

        const ext = this.gl.getExtension("WEBGL_debug_renderer_info");
        let info =
            "WebGL version:\t\t\t" + this.gl.getParameter(this.gl.VERSION) +
            "\nGLSL version:\t\t\t" + this.gl.getParameter(this.gl.SHADING_LANGUAGE_VERSION) +
            "\nWebGL Vendor:\t\t\t" + this.gl.getParameter(this.gl.VENDOR) +
            "\nhighp float precision:\t\tvertex: " + floatPrecisionVertexHigh +
            "\tfragment: " + floatPrecisionFragmentHigh +
            "\nmdiump float precision:\t\tvertex: " + floatPrecisionVertexMedium +
            "\tfragment: " + floatPrecisionFragmentMedium +
            "\nlowp float precision:\t\tvertex: " + floatPrecisionVertexLow +
            "\tfragment: " + floatPrecisionFragmentLow
        if (ext) info +=
            "\nUnmasked WebGL vendor:\t\t" + this.gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) +
            "\nUnmasked renderer:\t\t" + this.gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)
        console.info(info)

        if (floatPrecisionVertexHigh != floatPrecisionVertexMedium != floatPrecisionVertexLow) {
            if (floatPrecisionVertexLow >= 23) {
                vertexShaderSource.replace("precision highp float;", "precision lowp float;")
            } else if (floatPrecisionVertexMedium >= 23) {
                vertexShaderSource.replace("precision highp float;", "precision mediump float;")
            }
        }
        if (floatPrecisionFragmentHigh != floatPrecisionFragmentMedium != floatPrecisionFragmentLow) {
            if (floatPrecisionFragmentLow >= 23) {
                fragmentShaderSource.replace("precision highp float;", "precision lowp float;")
            } else if (floatPrecisionFragmentMedium >= 23) {
                fragmentShaderSource.replace("precision highp float;", "precision mediump float;")
            }
        }

        // PERFORMANCE
        // TODO: Eliminate / shrink unnecessary uniforms and attributes
        // TODO: Compare Gourand and Phong shading

        this.stats = new Stats()
        this.stats.showPanel(0)
        this.stats.dom.style.left = ""
        this.stats.dom.style.right = "80px"
        document.body.appendChild(this.stats.dom)


        this.gl.enable(this.gl.DEPTH_TEST)
        this.gl.enable(this.gl.CULL_FACE)
        this.gl.frontFace(this.gl.CCW)
        this.gl.cullFace(this.gl.BACK)
        this.gl.clearColor(0.2, 0.2, 0.2, 1.0)

        const program = this.gl.createProgram()
        const uniformManager = new UniformManager(this.gl, program)
        const lightPosition = vec3.create()
        vec3.set(lightPosition, 10, 10, -10)
        const light = new Light(lightPosition)

        const position = vec3.create()
        vec3.set(position, 0, 65, 75)
        const lookAt = vec3.create()
        vec3.set(lookAt, 0, 0, 20)
        const up = vec3.create()
        vec3.set(up, 0, 1, 0)

        const contactHoverPosition = vec3.create()
        vec3.set(contactHoverPosition, 20, 20, 20)
        const contactHoverLookAt = vec3.create()
        vec3.set(contactHoverLookAt, 0, 0, 20)
        const contactHoverUp = vec3.create()
        vec3.set(contactHoverUp, 0, 1, 0)

        const linkedinHoverPosition = vec3.create()
        vec3.set(linkedinHoverPosition, -20, 20, 20)
        const linkedinHoverLookAt = vec3.create()
        vec3.set(linkedinHoverLookAt, 0, 0, 20)
        const linkedinHoverUp = vec3.create()
        vec3.set(linkedinHoverUp, 0, 1, 0)

        const learnmoreHoverPosition = vec3.create()
        vec3.set(learnmoreHoverPosition, 20, 40, 20)
        const learnmoreHoverLookAt = vec3.create()
        vec3.set(learnmoreHoverLookAt, 0, 0, 20)
        const learnmoreHoverUp = vec3.create()
        vec3.set(learnmoreHoverUp, 0, 1, 0)


        this.animation = {
            contact: {
                hover: new InterpolatorInOut(500, contactHoverPosition, contactHoverLookAt, contactHoverUp),
                click: new InterpolatorInOut(500, null, null, null)
            },
            linkedin: {
                hover: new InterpolatorInOut(500, linkedinHoverPosition, linkedinHoverLookAt, linkedinHoverUp),
                click: new InterpolatorInOut(500, null, null, null)
            },
            learnmore: {
                hover: new InterpolatorInOut(500, learnmoreHoverPosition, learnmoreHoverLookAt, learnmoreHoverUp),
                click: new InterpolatorInOut(500, null, null, null)
            },
            start: new InterpolatorIn(2000, 2000)
        }

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

            this.animation.contact.hover.update(time.tslf)
            this.animation.contact.click.update(time.tslf)
            this.animation.linkedin.hover.update(time.tslf)
            this.animation.linkedin.click.update(time.tslf)
            this.animation.learnmore.hover.update(time.tslf)
            this.animation.learnmore.click.update(time.tslf)
            this.animation.start.update(time.tslf)

            let contactParams = this.animation.contact.hover.getInterpolatedDeltaCameraParameters(camera)
            let linkedinParams = this.animation.linkedin.hover.getInterpolatedDeltaCameraParameters(camera)
            let learnmoreParams = this.animation.learnmore.hover.getInterpolatedDeltaCameraParameters(camera)

            let accumulatedPosition = vec3.create()
            let accumulatedLookAt = vec3.create()
            let accumulatedUp = vec3.create()

            vec3.add(accumulatedPosition, contactParams.position, linkedinParams.position)
            vec3.add(accumulatedPosition, accumulatedPosition, learnmoreParams.position)
            vec3.add(accumulatedPosition, accumulatedPosition, camera.originalPosition)

            vec3.add(accumulatedLookAt, contactParams.lookAt, linkedinParams.lookAt)
            vec3.add(accumulatedLookAt, accumulatedLookAt, learnmoreParams.lookAt)
            vec3.add(accumulatedLookAt, accumulatedLookAt, camera.originalLookAt)

            vec3.add(accumulatedUp, contactParams.up, linkedinParams.up)
            vec3.add(accumulatedUp, accumulatedUp, learnmoreParams.up)
            vec3.add(accumulatedUp, accumulatedUp, camera.originalUp)

            camera.update(accumulatedPosition, accumulatedLookAt, accumulatedUp)
            this.hexGrid.matWorldUniform.update(worldMatrix)
            this.hexGrid.matNormUniform.update(normalMatrix)
            this.hexGrid.timeUniform.update(time.elapsed * 0.001)
            this.hexGrid.interpolator0Uniform.update(this.animation.contact.click.interpolator)
            this.hexGrid.interpolator1Uniform.update(this.animation.linkedin.click.interpolator)
            // TODO: learnmore uniform
            this.hexGrid.interpolator2Uniform.update(this.animation.start.interpolator)
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

    loop(time) {
        this.stats.begin();
        this.time.update(time)
        this.hexGrid.update(this.time)
        this.hexGrid.render(this.gl)
        if (this.firstFrame) {
            this.firstFrame = false
            this.initCompleteEventListeners.forEach(listener => { listener() })
        }
        this.stats.end();
        requestAnimationFrame(this.loop.bind(this))
    }

    render() {
        requestAnimationFrame(this.loop.bind(this))
    }

    startAnimation(name, type) {
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