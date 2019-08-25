import { Mesh } from "./Mesh.js"
import { Light } from "./Light.js"
import { mat4, mat3, vec3 } from "../lib/toji-gl-matrix-d6156a5/src/index.js"
import { UniformManager } from "./UniformManager.js";
import { UniformFloat } from "./UniformFloat.js";
import { UniformMatrix4f } from "./UniformMatrix4f.js";
import { UniformMatrix3f } from "./UniformMatrix3f.js";
import { Uniform3f } from "./Uniform3f.js";

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
        gl.useProgram(this.program)

        const buffer2 = gl.createBuffer()
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer2)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(this.indices), gl.STATIC_DRAW)

        const buffer = gl.createBuffer()
        const typedArray = new Float32Array(mesh.interleavedArray)
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, typedArray, gl.STATIC_DRAW)
        const attribLocationPosition = gl.getAttribLocation(this.program, "aPosition")
        const attribLocationColor = gl.getAttribLocation(this.program, "aColor")
        const attribLocationNormal = gl.getAttribLocation(this.program, "aNormal")
        const attribLocationCenter = gl.getAttribLocation(this.program, "aCenter")
        const attribLocationSpecialY0 = gl.getAttribLocation(this.program, "aSpecialY0")
        const attribLocationSpecialY1 = gl.getAttribLocation(this.program, "aSpecialY1")
        const attribLocationStartPosition = gl.getAttribLocation(this.program, "aStartPosition")
        gl.enableVertexAttribArray(attribLocationPosition)
        gl.enableVertexAttribArray(attribLocationColor)
        gl.enableVertexAttribArray(attribLocationNormal)
        gl.enableVertexAttribArray(attribLocationCenter)
        gl.enableVertexAttribArray(attribLocationSpecialY0)
        gl.enableVertexAttribArray(attribLocationSpecialY1)
        gl.enableVertexAttribArray(attribLocationStartPosition)
        this.interleaved = {
            buffer: buffer,
            attribLocation: {
                position: attribLocationPosition,
                color: attribLocationColor,
                normal: attribLocationNormal,
                center: attribLocationCenter,
                specialY0: attribLocationSpecialY0,
                specialY1: attribLocationSpecialY1,
                startPosition: attribLocationStartPosition
            },
            numberOfElements: 17,
            bytesPerElement: 4
        }

        this.uniformManager = new UniformManager(gl, this.program);
        this.timeUniform = new UniformFloat("uTime", this.uniformManager)
        this.interpolator0Uniform = new UniformFloat("uInterpolator0", this.uniformManager)
        this.interpolator1Uniform = new UniformFloat("uInterpolator1", this.uniformManager)
        this.interpolator2Uniform = new UniformFloat("uInterpolator2", this.uniformManager)
        this.matWorldUniform = new UniformMatrix4f("uWorld", this.uniformManager)
        this.matViewUniform = new UniformMatrix4f("uView", this.uniformManager)
        this.matProjUniform = new UniformMatrix4f("uProjection", this.uniformManager)
        this.matNormUniform = new UniformMatrix3f("uNormal", this.uniformManager)
        this.lightPosUniform = new Uniform3f("uLightPosition", this.uniformManager)

        this.worldMatrix = mat4.create();
        mat4.identity(this.worldMatrix)
        this.normalMatrix = mat3.create();
        mat4.identity(this.normalMatrix)
        this.matNormUniform.update(this.normalMatrix)
        this.lightPosUniform.update(light.position)


        this.matWorldUniform.update(this.worldMatrix)
        this.matViewUniform.update(camera.viewMatrix)

        // gl.bindBuffer(gl.ARRAY_BUFFER, this.interleaved.buffer)
        gl.vertexAttribPointer(this.interleaved.attribLocation.position, 3, gl.FLOAT, gl.FALSE, this.interleaved.bytesPerElement * this.interleaved.numberOfElements, this.interleaved.bytesPerElement * 0)
        gl.vertexAttribPointer(this.interleaved.attribLocation.normal, 3, gl.FLOAT, gl.FALSE, this.interleaved.bytesPerElement * this.interleaved.numberOfElements, this.interleaved.bytesPerElement * 3)
        gl.vertexAttribPointer(this.interleaved.attribLocation.center, 3, gl.FLOAT, gl.FALSE, this.interleaved.bytesPerElement * this.interleaved.numberOfElements, this.interleaved.bytesPerElement * 6)
        gl.vertexAttribPointer(this.interleaved.attribLocation.color, 3, gl.FLOAT, gl.FALSE, this.interleaved.bytesPerElement * this.interleaved.numberOfElements, this.interleaved.bytesPerElement * 9)
        gl.vertexAttribPointer(this.interleaved.attribLocation.specialY0, 1, gl.FLOAT, gl.FALSE, this.interleaved.bytesPerElement * this.interleaved.numberOfElements, this.interleaved.bytesPerElement * 12)
        gl.vertexAttribPointer(this.interleaved.attribLocation.specialY1, 1, gl.FLOAT, gl.FALSE, this.interleaved.bytesPerElement * this.interleaved.numberOfElements, this.interleaved.bytesPerElement * 13)
        gl.vertexAttribPointer(this.interleaved.attribLocation.startPosition, 3, gl.FLOAT, gl.FALSE, this.interleaved.bytesPerElement * this.interleaved.numberOfElements, this.interleaved.bytesPerElement * 14)
        // TODO: startposition: y component unnecessary

        this.animation = {
            hover: [
                {
                    interpolationTime: 0,
                    interpolator: 0,
                    transitionDuration: 500,
                    isIncreasing: false,
                    isDecreasing: false,
                    isHighest: false,
                    tslf: null,
                    update(time) {
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
                },
                {
                    interpolationTime: 0,
                    interpolator: 0,
                    transitionDuration: 500,
                    isIncreasing: false,
                    isDecreasing: false,
                    isHighest: false,
                    tslf: null,
                    update(time) {
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
                }
            ],
            start: {
                interpolationTime: 0,
                interpolator: 0,
                transitionDuration: 2000,
                isIncreasing: false,
                isDecreasing: false,
                isHighest: false,
                tslf: null,
                update(time) {
                    if (this.tslf == null) this.tslf = time

                    this.tslf = time - this.tslf
                    this.interpolationTime = Math.min(this.interpolationTime + this.tslf, this.transitionDuration)
                    this.interpolator = (-Math.cos(this.interpolationTime / this.transitionDuration * Math.PI) + 1) / 2, 1

                    this.tslf = time
                }
            }
        }
    }

    update(/** @type {Number} */ time) {
        const identityMatrix = mat4.create()
        const translationVector = vec3.create()
        vec3.set(translationVector, 0, -2, 0)
        mat4.translate(this.worldMatrix, identityMatrix, translationVector)

        let normalMatrix2 = mat4.create()
        let normalMatrix3 = mat4.create()
        mat4.invert(normalMatrix2, this.worldMatrix)
        mat4.transpose(normalMatrix3, normalMatrix2)
        mat3.fromMat4(this.normalMatrix, normalMatrix3)

        this.animation.hover.forEach(hoverAnimation => { hoverAnimation.update(time) })
        this.animation.start.update(time)

        this.matWorldUniform.update(this.worldMatrix)
        this.matNormUniform.update(this.normalMatrix)
        this.timeUniform.update(time * 0.001)
        this.interpolator0Uniform.update(this.animation.hover[0].interpolator)
        this.interpolator1Uniform.update(this.animation.hover[1].interpolator)
        this.interpolator2Uniform.update(this.animation.start.interpolator)
    }

    render(/** @type {WebGLRenderingContext} */ gl) {
        this.uniformManager.sendDirtyUniformsToShader()
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT)
        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_INT, 0)
    }

    resize(projMatrix) {
        this.matProjUniform.update(projMatrix)
    }

    startSpecialEvent(item) {
        this.animation.hover[item].isIncreasing = true
        this.animation.hover[item].isDecreasing = false
    }

    endSpecialEvent(item) {
        this.animation.hover[item].isDecreasing = true
        this.animation.hover[item].isIncreasing = false
    }

}

export { MeshObject }