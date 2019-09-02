import { MeshObject } from "./renderer/MeshObject.js"
import { Camera } from "./renderer/Camera.js";
import { Light } from "./renderer/Light.js";
import { HexagonGrid } from "./renderer/HexagonGrid.js";
import { InterpolatorInOut } from "./renderer/InterpolatorInOut.js";
import { InterpolatorIn } from "./renderer/InterpolatorIn.js";
import { UniformManager } from "./renderer/UniformManager.js";
import { mat4, mat3, vec3, glMatrix } from "gl-matrix"
import Stats from "stats-js"
import vertexShaderSource from "../glsl/vertex.glsl"
import fragmentShaderSource from "../glsl/fragment.glsl"

class Scene {
    constructor(canvas) {
        let gl = canvas.getContext("webgl2")
        if (!gl) {
            gl = canvas.getContext("webgl")
            if (gl && !gl.getExtension("OES_element_index_uint")) {
                console.error("Your browser doesn't support the OES_element_index_uint extension")
                return
            }
        }
        if (!gl) {
            gl = canvas.getContext("experimental-webgl")
            if (gl && !gl.getExtension("OES_element_index_uint")) {
                console.error("Your browser doesn't support the OES_element_index_uint extension")
                return
            }
        }
        if (!gl) {
            console.error("Your browser doesn't support WebGL")
            return
        }

        const floatPrecisionVertexHigh = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).precision
        const floatPrecisionFragmentHigh = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision
        const floatPrecisionVertexMedium = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).precision
        const floatPrecisionFragmentMedium = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).precision
        const floatPrecisionVertexLow = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).precision
        const floatPrecisionFragmentLow = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT).precision

        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        let info =
            "WebGL version:\t\t\t" + gl.getParameter(gl.VERSION) +
            "\nGLSL version:\t\t\t" + gl.getParameter(gl.SHADING_LANGUAGE_VERSION) +
            "\nWebGL Vendor:\t\t\t" + gl.getParameter(gl.VENDOR) +
            "\nhighp float precision:\t\tvertex: " + floatPrecisionVertexHigh +
            "\tfragment: " + floatPrecisionFragmentHigh +
            "\nmdiump float precision:\t\tvertex: " + floatPrecisionVertexMedium +
            "\tfragment: " + floatPrecisionFragmentMedium +
            "\nlowp float precision:\t\tvertex: " + floatPrecisionVertexLow +
            "\tfragment: " + floatPrecisionFragmentLow
        if (ext) info +=
            "\nUnmasked WebGL vendor:\t\t" + gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) +
            "\nUnmasked renderer:\t\t" + gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)
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

        const stats = new Stats()
        stats.showPanel(0)
        stats.dom.style.left = ""
        stats.dom.style.right = "80px"
        document.body.appendChild(stats.dom)


        gl.enable(gl.DEPTH_TEST)
        gl.enable(gl.CULL_FACE)
        gl.frontFace(gl.CCW)
        gl.cullFace(gl.BACK)
        gl.clearColor(0.2, 0.2, 0.2, 1.0)

        const program = gl.createProgram()
        const uniformManager = new UniformManager(gl, program)
        const lightPosition = vec3.create()
        vec3.set(lightPosition, 10, 10, -10)
        const light = new Light(lightPosition)

        const hexGrid = new MeshObject(gl, new HexagonGrid(30, 1.1, 2), vertexShaderSource, fragmentShaderSource, light, uniformManager)

        const position = vec3.create()
        vec3.set(position, 0, 65, 75)
        const lookAt = vec3.create()
        vec3.set(lookAt, 0, 0, 20)
        const up = vec3.create()
        vec3.set(up, 0, 1, 0)

        const camera = new Camera(position, lookAt, up, uniformManager)

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
                click: new InterpolatorInOut(500, contactHoverPosition, contactHoverLookAt, contactHoverUp) // TODO: click
            },
            linkedin: {
                hover: new InterpolatorInOut(500, linkedinHoverPosition, linkedinHoverLookAt, linkedinHoverUp),
                click: new InterpolatorInOut(500, linkedinHoverPosition, linkedinHoverLookAt, linkedinHoverUp)
            },
            learnmore: {
                hover: new InterpolatorInOut(500, learnmoreHoverPosition, learnmoreHoverLookAt, learnmoreHoverUp),
                click: new InterpolatorInOut(500, learnmoreHoverPosition, learnmoreHoverLookAt, learnmoreHoverUp)
            },
            start: new InterpolatorIn(2000, 2000)
        }

        hexGrid.update = time => {
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

            this.animation.contact.hover.update(time)
            this.animation.contact.click.update(time)
            this.animation.linkedin.hover.update(time)
            this.animation.linkedin.click.update(time)
            this.animation.learnmore.hover.update(time)
            this.animation.learnmore.click.update(time)
            this.animation.start.update(time)

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
            hexGrid.matWorldUniform.update(worldMatrix)
            hexGrid.matNormUniform.update(normalMatrix)
            hexGrid.timeUniform.update(time * 0.001)
            hexGrid.interpolator0Uniform.update(this.animation.contact.click.interpolator)
            hexGrid.interpolator1Uniform.update(this.animation.linkedin.click.interpolator)
            // TODO: learnmore uniform
            hexGrid.interpolator2Uniform.update(this.animation.start.interpolator)
        }

        const resize = () => {
            canvas.width = canvas.clientWidth * window.devicePixelRatio
            canvas.height = canvas.clientHeight * window.devicePixelRatio
            gl.viewport(0, 0, canvas.width, canvas.height)
            mat4.perspective(camera.projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0)
            hexGrid.resize(camera.projMatrix)
        }
        window.addEventListener("resize", resize)
        resize()

        const loop = function (time) {
            stats.begin();
            hexGrid.update(time)
            hexGrid.render(gl)
            stats.end();
            requestAnimationFrame(loop)
        }

        requestAnimationFrame(loop)
    }

    startSpecialEvent(type) {
        console.log(type)
        this.animation[type].hover.isDecreasing = false
        this.animation[type].hover.isIncreasing = true
    }

    endSpecialEvent(type) {
        this.animation[type].hover.isDecreasing = true
        this.animation[type].hover.isIncreasing = false
    }
}

export { Scene }