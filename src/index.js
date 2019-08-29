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
import "./index.scss";
import "@fortawesome/fontawesome-free/css/all.css";

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
    // const hexGrid = {};

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

    let headlineWrapper = null, messageWrapper = null, aboutWrapper = null;

    const initDOMElements = ()=>{
        if (!headlineWrapper) headlineWrapper = document.getElementById("headline-wrapper")
        if (!messageWrapper) messageWrapper = document.getElementById("message-wrapper")
        if (!aboutWrapper) aboutWrapper = document.getElementById("about-wrapper")
    }

    Array.from(document.getElementsByClassName("contact-button")).forEach(element => {
        element.addEventListener("click", () => {
            initDOMElements()
            headlineWrapper.style.display = "none"
            
            aboutWrapper.style.display = "none"
            
            messageWrapper.style.display = "block"
            messageWrapper.style.visibility = "visible"
            messageWrapper.style.height = "auto"
        })
    })

    document.querySelector("#about-button").addEventListener("click", () => {
        initDOMElements()
        headlineWrapper.style.display = "none"

        messageWrapper.style.display = "none"
        
        aboutWrapper.style.display = "block"
        aboutWrapper.style.visibility = "visible"
        aboutWrapper.style.height = "auto"
    })

    Array.from(document.getElementsByClassName("back-arrow")).forEach(element => {
        element.addEventListener("click", () => {
            headlineWrapper.style.display = "block"
            messageWrapper.style.display = "none"
            aboutWrapper.style.display = "none"
        })
    })

    Array.from(document.getElementsByClassName("hoverable")).forEach(element => {
        element.addEventListener("mouseenter", (event) => {
            startSpecialEvent(parseInt(event.target.dataset.id))
        })
        element.addEventListener("mouseleave", (event) => {
            endSpecialEvent(parseInt(event.target.dataset.id))
        })
    })

    requestAnimationFrame(loop)
})