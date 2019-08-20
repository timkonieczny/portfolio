import { MeshObject } from "./MeshObject.js"
import { OctagonalPrismMesh } from "./OctagonalPrismMesh.js"
import { Camera } from "./Camera.js";
import { Light } from "./Light.js";
import { mat4, vec3, glMatrix } from "./toji-gl-matrix-d6156a5/src/index.js"
window.addEventListener("load", async () => {
    const canvas = document.getElementById("canvas")
    const gl = canvas.getContext("experimental-webgl")

    gl.clearColor(0.75, 0.85, 0.8, 1.0)
    gl.enable(gl.DEPTH_TEST)
    gl.enable(gl.CULL_FACE)
    gl.frontFace(gl.CCW)
    gl.cullFace(gl.BACK) // // Create shaders //

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

        const responses = await Promise.all([loadFile("vertex.glsl"), loadFile("fragment.glsl")])

        const position = vec3.create()
        vec3.set(position, 0, 0, -8)
        const lookAt = vec3.create()
        vec3.set(lookAt, 0, 0, 0)
        const up = vec3.create()
        vec3.set(up, 0, 1, 0)

        const camera = new Camera(position, lookAt, up)
        // const viewMatrix = mat4.create()
        // mat4.lookAt(viewMatrix, [0, 0, -8], [0, 0, 0], [0, 1, 0])
        // const projMatrix = mat4.create()
        const lightPosition = vec3.create()
        vec3.set(lightPosition, 10, 10, -10)
        const light = new Light(lightPosition)
        // const cube = new MeshObject(gl, new BoxMesh(), responses[0], responses[1], camera, light)

        const cylinder = new MeshObject(gl, new OctagonalPrismMesh(), responses[0], responses[1], camera, light)

        const resize = () => {
            canvas.width = canvas.clientWidth * window.devicePixelRatio
            canvas.height = canvas.clientHeight * window.devicePixelRatio
            gl.viewport(0, 0, canvas.width, canvas.height)
            mat4.perspective(camera.projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0)
            // gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix)
            // cube.resize(gl, camera.projMatrix)
            cylinder.resize(gl, camera.projMatrix)
        }
        window.addEventListener("resize", resize)
        // const cube = new MeshObject(gl, boxVertices, boxIndices, boxColors, responses[0], responses[1], viewMatrix)
        resize()

        const loop = function () {
            cylinder.update()

            gl.clearColor(0.75, 0.85, 0.8, 1.0)
            gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT)
            // cube.render(gl)
            cylinder.render(gl)

            requestAnimationFrame(loop)
        }
        requestAnimationFrame(loop)
    } catch (responses) {
        console.error(responses)
    }
})

// TODO: light object
// TODO: camera object