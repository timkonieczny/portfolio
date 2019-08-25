import { MeshObject } from "./renderer/MeshObject.js"
import { OctagonalPrismMesh } from "./renderer/OctagonalPrismMesh.js"
import { Camera } from "./renderer/Camera.js";
import { Light } from "./renderer/Light.js";
import { mat4, vec3, glMatrix } from "./lib/toji-gl-matrix-d6156a5/src/index.js"
import { Mesh } from "./renderer/Mesh.js"
import Stats from "./lib/stats.js/src/Stats.js"

window.addEventListener("load", async () => {
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
    // TODO: Use unsigned short for indices. Range: 0..65,535. (byte is too small)
    // TODO: Eliminate / shrink unnecessary uniforms and attributes
    // TODO: Compare Gourand and Phong shading
    // TODO: Eliminate unnecessary calles. E.g. gl.useProgram() and gl.bindBuffer
    // TODO: Add isDirty() workflow and only update dirty uniforms

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
        const loadFile = url => {
            return new Promise(function (resolve, reject) {
                const request = new XMLHttpRequest()
                request.open("GET", url)
                request.addEventListener("load", () => {
                    if (request.status == 200)
                        resolve(request.response)
                    else
                        reject(Error(request.statusText))
                })
                request.addEventListener("error", () => {
                    reject(Error("Network Error"))
                })
                request.send()
            })
        }

        const responses = await Promise.all([loadFile("shader/vertex.glsl"), loadFile("shader/fragment.glsl")])

        const position = vec3.create()
        vec3.set(position, 0, 65, 75)
        const lookAt = vec3.create()
        vec3.set(lookAt, 0, 0, 20)
        const up = vec3.create()
        vec3.set(up, 0, 1, 0)

        const camera = new Camera(position, lookAt, up)
        const lightPosition = vec3.create()
        vec3.set(lightPosition, 10, 10, -10)
        const light = new Light(lightPosition)

        console.log("[grid generation] start")

        const cylinders = []
        
        const makeRing = (level, gap, scaleY) =>{
            const identity = mat4.create()
            const pi2 = Math.PI * 2
            const edgeDiameter = Math.sqrt(3)
            for (let i = 0; i < 6; i++) {
                let vertex1 = vec3.create()
                let vertex2 = vec3.create()
                let betweenVector = vec3.create()
    
                vec3.set(vertex1,
                    level * (edgeDiameter * gap) * Math.sin(i / 6 * pi2 + 1 / 12 * pi2),
                    0,
                    level * (edgeDiameter * gap) * Math.cos(i / 6 * pi2 + 1 / 12 * pi2))
    
                vec3.set(vertex2,
                    level * (edgeDiameter * gap) * Math.sin((i + 1) / 6 * pi2 + 1 / 12 * pi2),
                    0,
                    level * (edgeDiameter * gap) * Math.cos((i + 1) / 6 * pi2 + 1 / 12 * pi2))
    
                vec3.sub(betweenVector, vertex2, vertex1)
    
                let interpolator = vec3.create()
                let position = vec3.create()
                for (let j = 0; j < level; j++) {
                    vec3.scale(interpolator, betweenVector, j / level)
                    vec3.add(position, vertex1, interpolator)
    
                    let matrix = mat4.create()
                    let scaleVector = vec3.create()
                    vec3.set(scaleVector, 1, scaleY, 1)
                    mat4.translate(matrix, identity, position)
                    mat4.scale(matrix, matrix, scaleVector)
                    cylinders.push(new OctagonalPrismMesh(matrix))
                }
            }
        }

        const makeGrid = (rings, gap, scaleY) =>{
            // center
            const matrix = mat4.create()
            const vector = vec3.create()
            vec3.set(vector, 1, scaleY, 1)
            mat4.scale(matrix, matrix, vector)
            cylinders.push(new OctagonalPrismMesh(matrix))
            // rings
            for(let i = 1; i <= rings; i++)
                makeRing(i, gap, scaleY)
        }

        makeGrid(30, 1.1, 2)

        console.info("[grid generation] merging geometries")
        const hexGridGeometry = Mesh.mergeGeometries(...cylinders)
        console.info("[grid generation] creating MeshObject")
        const hexGrid = new MeshObject(gl, hexGridGeometry, ...responses, camera, light)

        console.info("[grid generation] done.\n\t" +
            hexGridGeometry.indices.length + " indices.\n\t" +
            hexGridGeometry.interleavedArray.length + " elements in interleaved array.")


        const resize = () => {
            canvas.width = canvas.clientWidth * window.devicePixelRatio
            canvas.height = canvas.clientHeight * window.devicePixelRatio
            gl.viewport(0, 0, canvas.width, canvas.height)
            mat4.perspective(camera.projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0)
            hexGrid.resize(gl, camera.projMatrix)
        }
        window.addEventListener("resize", resize)
        resize()

        const loop = function (time) {
            stats.begin();
            gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT)
            hexGrid.update()    // TODO: move update script out of MeshObject
            hexGrid.render(gl, time)
            stats.end();
            requestAnimationFrame(loop)
        }

        Array.from(document.getElementsByClassName("hoverable")).forEach(element => {
            element.addEventListener("mouseenter", (event) => {
                hexGrid.startSpecialEvent(parseInt(event.target.dataset.id))
            })
            element.addEventListener("mouseleave", (event) => {
                hexGrid.endSpecialEvent(parseInt(event.target.dataset.id))
            })
        })

        requestAnimationFrame(loop)
    } catch (responses) {
        console.error(responses)
    }
})