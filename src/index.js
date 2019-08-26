import { MeshObject } from "./renderer/MeshObject.js"
import { Camera } from "./renderer/Camera.js";
import { Light } from "./renderer/Light.js";
import { mat4, mat3, vec3, glMatrix } from "gl-matrix"
import Stats from "stats-js"
import { HexagonGrid } from "./renderer/HexagonGrid.js";
import { HoverAnimation } from "./renderer/HoverAnimation.js";
import { StartAnimation } from "./renderer/StartAnimation.js";
import { UniformManager } from "./renderer/UniformManager.js";
import vertexShaderSource from "./shader/vertex.glsl"
import fragmentShaderSource from "./shader/fragment.glsl"
import "./index.css";

window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas")
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

    let info = "WebGL version:\t\t\t" + gl.getParameter(gl.VERSION) + "\nGLSL version:\t\t\t" + gl.getParameter(gl.SHADING_LANGUAGE_VERSION) + "\nWebGL Vendor:\t\t\t" + gl.getParameter(gl.VENDOR)
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    if (ext) info += "\nUnmasked WebGL vendor:\t" + gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) + "\nUnmasked renderer:\t\t" + gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)
    console.info(info)
    console.log(gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT))
    //desktop
    // {rangeMin: 127, rangeMax: 127, precision: 23}
    // {rangeMin: 127, rangeMax: 127, precision: 23}
    // {rangeMin: 127, rangeMax: 127, precision: 23}

    //mobile
    // {rangeMin: 15, rangeMax: 15, precision: 10}
    // {rangeMin: 15, rangeMax: 15, precision: 10}
    // {rangeMin: 127, rangeMax: 127, precision: 23}

    // PERFORMANCE
    // TODO: Performance: test how desktop and mobile compare with gl.getShaderPrecisionFormat. What precision do I need?
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

    try {
        // const loadFile = url => {
        //     return new Promise(function (resolve, reject) {
        //         const request = new XMLHttpRequest()
        //         request.open("GET", url)
        //         request.addEventListener("load", () => {
        //             if (request.status == 200)
        //                 resolve(request.response)
        //             else
        //                 reject(Error(request.statusText))
        //         })
        //         request.addEventListener("error", () => {
        //             reject(Error("Network Error"))
        //         })
        //         request.send()
        //     })
        // }

        // const responses = await Promise.all([loadFile("shader/vertex.glsl"), loadFile("shader/fragment.glsl")])

        const program = gl.createProgram()
        const uniformManager = new UniformManager(gl, program)
        const lightPosition = vec3.create()
        vec3.set(lightPosition, 10, 10, -10)
        const light = new Light(lightPosition)

        console.log(vertexShaderSource)
        const hexGrid = new MeshObject(gl, new HexagonGrid(), vertexShaderSource, fragmentShaderSource, light, uniformManager)
        // const hexGrid = new MeshObject(gl, new HexagonGrid(), ...responses, light, uniformManager)

        const position = vec3.create()
        vec3.set(position, 0, 65, 75)
        const lookAt = vec3.create()
        vec3.set(lookAt, 0, 0, 20)
        const up = vec3.create()
        vec3.set(up, 0, 1, 0)

        const camera = new Camera(position, lookAt, up, uniformManager)


        const animation = {
            hover: [
                new HoverAnimation(),
                new HoverAnimation()
            ],
            start: new StartAnimation()
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

            animation.hover.forEach(hoverAnimation => { hoverAnimation.update(time) })
            animation.start.update(time)

            let position = vec3.create()
            let lookAt = vec3.create()
            let up = vec3.create()
            vec3.set(position, animation.hover[0].interpolator * 20, 65 - animation.hover[0].interpolator * 20, 75 - animation.hover[0].interpolator * 20)
            vec3.set(lookAt, 0, 0, 20)
            vec3.set(up, 0, 1, 0)

            camera.update(position, lookAt, up)
            hexGrid.matWorldUniform.update(worldMatrix)
            hexGrid.matNormUniform.update(normalMatrix)
            hexGrid.timeUniform.update(time * 0.001)
            hexGrid.interpolator0Uniform.update(animation.hover[0].interpolator)
            hexGrid.interpolator1Uniform.update(animation.hover[1].interpolator)
            hexGrid.interpolator2Uniform.update(animation.start.interpolator)
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

        const startSpecialEvent = (item) => {
            animation.hover[item].isIncreasing = true
            animation.hover[item].isDecreasing = false
        }

        const endSpecialEvent = (item) => {
            animation.hover[item].isDecreasing = true
            animation.hover[item].isIncreasing = false
        }

        Array.from(document.getElementsByClassName("hoverable")).forEach(element => {
            element.addEventListener("mouseenter", (event) => {
                startSpecialEvent(parseInt(event.target.dataset.id))
            })
            element.addEventListener("mouseleave", (event) => {
                endSpecialEvent(parseInt(event.target.dataset.id))
            })
        })

        requestAnimationFrame(loop)
    } catch (responses) {
        console.error(responses)
    }
})