// import { boxVertices, boxIndices, boxColors, hexCylVertices, hexCylIndices } from "./geometry.js"
import { MeshObject } from "./MeshObject.js"
import { BoxMesh } from "./BoxMesh.js"
import { OctagonalPrismMesh } from "./OctagonalPrismMesh.js"
window.addEventListener("load", async () => {
    let { mat4, vec3 } = glMatrix;

    glMatrix.toRadians = deg => { return deg / 180 * Math.PI }

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

        const viewMatrix = mat4.create()
        mat4.lookAt(viewMatrix, [0, 0, -8], [0, 0, 0], [0, 1, 0])
        const projMatrix = mat4.create()
        const resize = () => {
            console.log("resizing")
            canvas.width = canvas.clientWidth * window.devicePixelRatio
            canvas.height = canvas.clientHeight * window.devicePixelRatio
            gl.viewport(0, 0, canvas.width, canvas.height)
            mat4.perspective(projMatrix, glMatrix.toRadians(45), canvas.width / canvas.height, 0.1, 1000.0)
            // gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix)
            cube.resize(gl, projMatrix)
        }
        window.addEventListener("resize", resize)
        // const cube = new MeshObject(gl, boxVertices, boxIndices, boxColors, responses[0], responses[1], viewMatrix)
        const cube = new MeshObject(gl, new BoxMesh(), responses[0], responses[1], viewMatrix)
        resize()

        const loop = function () {
            cube.update()

            gl.clearColor(0.75, 0.85, 0.8, 1.0)
            gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT)
            cube.render(gl)

            requestAnimationFrame(loop)
        }
        requestAnimationFrame(loop)
    } catch (responses) {
        console.error(responses)
    }
})

// TODO: add lighting in next tutorial http://www.kamaron.me/webgl-tutorial/02-rotating-cube