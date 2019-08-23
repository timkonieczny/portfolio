import { Mesh } from "./Mesh.js"
import { Light } from "./Light.js"
import { mat4, mat3, vec3 } from "../lib/toji-gl-matrix-d6156a5/src/index.js"

class MeshObject {
    constructor(
        /** @type {WebGLRenderingContext} */ gl,
        /** @type {Mesh} */ mesh,
        /** @type {string} */ vertexShaderSource,
        /** @type {string} */ fragmentShaderSource,
        /** @type {mat4} */ camera,
        /** @type {Light} */ light) {

        this.program = gl.createProgram();
        this.indices = mesh.indices

        const initShader = (
            /** @type {string} */ shaderSource,
            /** @type {Number} */ type) => {
            const shader = gl.createShader(type)
            gl.shaderSource(shader, shaderSource)
            gl.compileShader(shader)
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error("ERROR compiling fragment shader!", gl.getShaderInfoLog(shader))
                return
            }
            gl.attachShader(this.program, shader)
        }

        initShader(fragmentShaderSource, gl.FRAGMENT_SHADER)
        initShader(vertexShaderSource, gl.VERTEX_SHADER)

        gl.linkProgram(this.program)
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            console.error("ERROR linking program!", gl.getProgramInfoLog(this.program))
            return
        }
        gl.validateProgram(this.program)
        if (!gl.getProgramParameter(this.program, gl.VALIDATE_STATUS)) {
            console.error("ERROR validating program!", gl.getProgramInfoLog(this.program))
            return
        }

        const buffer2 = gl.createBuffer()
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer2)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(this.indices), gl.STATIC_DRAW)


        const buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        const typedArray = new Float32Array(mesh.interleavedArray)
        gl.bufferData(gl.ARRAY_BUFFER, typedArray, gl.STATIC_DRAW)
        const attribLocationPosition = gl.getAttribLocation(this.program, "aPosition")
        const attribLocationColor = gl.getAttribLocation(this.program, "aColor")
        const attribLocationNormal = gl.getAttribLocation(this.program, "aNormal")
        const attribLocationCenter = gl.getAttribLocation(this.program, "aCenter")
        const attribLocationSpecialY = gl.getAttribLocation(this.program, "aSpecialY")
        gl.enableVertexAttribArray(attribLocationPosition)
        gl.enableVertexAttribArray(attribLocationColor)
        gl.enableVertexAttribArray(attribLocationNormal)
        gl.enableVertexAttribArray(attribLocationCenter)
        gl.enableVertexAttribArray(attribLocationSpecialY)
        this.interleaved = {
            buffer: buffer,
            attribLocation: {
                position: attribLocationPosition,
                color: attribLocationColor,
                normal: attribLocationNormal,
                center: attribLocationCenter,
                specialY: attribLocationSpecialY
            },
            numberOfElements: 9,
            bytesPerElement: 4
        }


        gl.useProgram(this.program)
        this.matWorldUniformLocation = gl.getUniformLocation(this.program, "uWorld")
        this.matViewUniformLocation = gl.getUniformLocation(this.program, "uView")
        this.matProjUniformLocation = gl.getUniformLocation(this.program, "uProjection")
        this.matNormUniformLocation = gl.getUniformLocation(this.program, "uNormal")
        this.lightPosUniformLocation = gl.getUniformLocation(this.program, "uLightPosition")
        this.timeUniformLocation = gl.getUniformLocation(this.program, "uTime")
        this.specialTimeUniformLocation = gl.getUniformLocation(this.program, "uSpecialTime")
        this.worldMatrix = mat4.create();
        mat4.identity(this.worldMatrix)
        this.normalMatrix = mat3.create();
        mat4.identity(this.normalMatrix)
        gl.uniformMatrix4fv(this.matWorldUniformLocation, gl.FALSE, this.worldMatrix)
        gl.uniformMatrix4fv(this.matViewUniformLocation, gl.FALSE, camera.viewMatrix)
        gl.uniformMatrix3fv(this.matNormUniformLocation, gl.FALSE, this.normalMatrix)
        gl.uniform3f(this.lightPosUniformLocation, light.position[0], light.position[1], light.position[2])

        this.animation = {
            hover: [{
                interpolationTime: 0,
                interpolator: 0,
                transitionDuration: 500,
                isIncreasing: false,
                isDecreasing: false,
                isHighest: false,
                tslf: null,
                update: function(time) {
                    if (this.tslf == null) this.tslf = time
                    this.tslf = time - this.tslf
                    
                    if (this.isIncreasing) {
                        this.interpolationTime += this.tslf
                        this.interpolator = (-Math.cos((this.interpolationTime) / this.transitionDuration * Math.PI) + 1) / 2

                        if (this.interpolationTime >= this.transitionDuration) {
                            this.interpolator = 1
                            this.isIncreasing = false
                            this.isHighest = true
                            this.interpolationTime = this.transitionDuration
                        }
                    } else if (this.isDecreasing) {
                        this.isHighest = false
                        this.interpolationTime -= this.tslf
                        this.interpolator = (-Math.cos((this.interpolationTime) / this.transitionDuration * Math.PI) + 1) / 2
                        if (this.interpolationTime <= 0) {
                            this.interpolator = 0
                            this.isDecreasing = false
                            this.interpolationTime = 0
                        }
                    } else if (this.isHighest) {
                        this.interpolator = 1
                    } else {
                        this.interpolator = 0
                    }
                    this.tslf = time
                }
            }]
        }
    }

    update() {
        // TODO: add isDirty workflow for updating / rendering
        const identityMatrix = mat4.create()
        const translationVector = vec3.create()
        vec3.set(translationVector, 0, -2, 0)
        mat4.translate(this.worldMatrix, identityMatrix, translationVector)

        let normalMatrix2 = mat4.create()
        let normalMatrix3 = mat4.create()
        mat4.invert(normalMatrix2, this.worldMatrix)
        mat4.transpose(normalMatrix3, normalMatrix2)
        mat3.fromMat4(this.normalMatrix, normalMatrix3)
    }

    render(
        /** @type {WebGLRenderingContext} */ gl,
        /** @type {Number} */ time) {

        this.animation.hover[0].update(time)

        gl.useProgram(this.program)
        gl.uniformMatrix4fv(this.matWorldUniformLocation, gl.FALSE, this.worldMatrix)
        gl.uniformMatrix3fv(this.matNormUniformLocation, gl.FALSE, this.normalMatrix)
        gl.uniform1f(this.timeUniformLocation, time * 0.001)
        gl.uniform1f(this.specialTimeUniformLocation, this.animation.hover[0].interpolator)

        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT)

        gl.bindBuffer(gl.ARRAY_BUFFER, this.interleaved.buffer)
        const bytesPerElement = 4
        const numberOfElements = 13
        gl.vertexAttribPointer(this.interleaved.attribLocation.position, 3, gl.FLOAT, gl.FALSE, bytesPerElement * numberOfElements, bytesPerElement * 0)
        gl.vertexAttribPointer(this.interleaved.attribLocation.normal, 3, gl.FLOAT, gl.FALSE, bytesPerElement * numberOfElements, bytesPerElement * 3)
        gl.vertexAttribPointer(this.interleaved.attribLocation.center, 3, gl.FLOAT, gl.FALSE, bytesPerElement * numberOfElements, bytesPerElement * 6)
        gl.vertexAttribPointer(this.interleaved.attribLocation.color, 3, gl.FLOAT, gl.FALSE, bytesPerElement * numberOfElements, bytesPerElement * 9)
        gl.vertexAttribPointer(this.interleaved.attribLocation.specialY, 1, gl.FLOAT, gl.FALSE, bytesPerElement * numberOfElements, bytesPerElement * 12)

        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_INT, 0)
    }

    resize(gl, projMatrix) {
        gl.uniformMatrix4fv(this.matProjUniformLocation, gl.FALSE, projMatrix)
    }

    startSpecialEvent() {
        this.animation.hover[0].isIncreasing = true
        this.animation.hover[0].isDecreasing = false
    }

    endSpecialEvent() {
        this.animation.hover[0].isDecreasing = true
        this.animation.hover[0].isIncreasing = false
    }

}

export { MeshObject }