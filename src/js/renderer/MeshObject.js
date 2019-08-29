import { Mesh } from "./Mesh.js"
import { Light } from "./Light.js"
import { mat4, mat3, vec3 } from "gl-matrix"
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
        /** @type {Light} */ light,
        /** @type {UniformManager} */ uniformManager) {

        // this.program = gl.createProgram();
        this.indices = mesh.indices
        this.uniformManager = uniformManager

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
            gl.attachShader(this.uniformManager.program, shader)
        }

        initShader(fragmentShaderSource, gl.FRAGMENT_SHADER)
        initShader(vertexShaderSource, gl.VERTEX_SHADER)

        gl.linkProgram(this.uniformManager.program)
        if (!gl.getProgramParameter(this.uniformManager.program, gl.LINK_STATUS)) {
            console.error("ERROR linking program!", gl.getProgramInfoLog(this.uniformManager.program))
            return
        }
        gl.validateProgram(this.uniformManager.program)
        if (!gl.getProgramParameter(this.uniformManager.program, gl.VALIDATE_STATUS)) {
            console.error("ERROR validating program!", gl.getProgramInfoLog(this.uniformManager.program))
            return
        }
        gl.useProgram(this.uniformManager.program)

        const buffer2 = gl.createBuffer()
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer2)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(this.indices), gl.STATIC_DRAW)

        const buffer = gl.createBuffer()
        const typedArray = new Float32Array(mesh.interleavedArray)
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(gl.ARRAY_BUFFER, typedArray, gl.STATIC_DRAW)
        const attribLocationPosition = gl.getAttribLocation(this.uniformManager.program, "aPosition")
        const attribLocationColor = gl.getAttribLocation(this.uniformManager.program, "aColor")
        const attribLocationNormal = gl.getAttribLocation(this.uniformManager.program, "aNormal")
        const attribLocationCenter = gl.getAttribLocation(this.uniformManager.program, "aCenter")
        const attribLocationSpecialY0 = gl.getAttribLocation(this.uniformManager.program, "aSpecialY0")
        const attribLocationSpecialY1 = gl.getAttribLocation(this.uniformManager.program, "aSpecialY1")
        const attribLocationStartPosition = gl.getAttribLocation(this.uniformManager.program, "aStartPosition")
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

        this.timeUniform = new UniformFloat("uTime", this.uniformManager)
        this.interpolator0Uniform = new UniformFloat("uInterpolator0", this.uniformManager)
        this.interpolator1Uniform = new UniformFloat("uInterpolator1", this.uniformManager)
        this.interpolator2Uniform = new UniformFloat("uInterpolator2", this.uniformManager)
        this.matWorldUniform = new UniformMatrix4f("uWorld", this.uniformManager)
        // this.matViewUniform = new UniformMatrix4f("uView", this.uniformManager)
        this.matProjUniform = new UniformMatrix4f("uProjection", this.uniformManager)
        this.matNormUniform = new UniformMatrix3f("uNormal", this.uniformManager)
        this.lightPosUniform = new Uniform3f("uLightPosition", this.uniformManager)

        this.lightPosUniform.update(light.position)
        // this.matViewUniform.update(camera.viewMatrix)

        gl.vertexAttribPointer(this.interleaved.attribLocation.position, 3, gl.FLOAT, gl.FALSE, this.interleaved.bytesPerElement * this.interleaved.numberOfElements, this.interleaved.bytesPerElement * 0)
        gl.vertexAttribPointer(this.interleaved.attribLocation.normal, 3, gl.FLOAT, gl.FALSE, this.interleaved.bytesPerElement * this.interleaved.numberOfElements, this.interleaved.bytesPerElement * 3)
        gl.vertexAttribPointer(this.interleaved.attribLocation.center, 3, gl.FLOAT, gl.FALSE, this.interleaved.bytesPerElement * this.interleaved.numberOfElements, this.interleaved.bytesPerElement * 6)
        gl.vertexAttribPointer(this.interleaved.attribLocation.color, 3, gl.FLOAT, gl.FALSE, this.interleaved.bytesPerElement * this.interleaved.numberOfElements, this.interleaved.bytesPerElement * 9)
        gl.vertexAttribPointer(this.interleaved.attribLocation.specialY0, 1, gl.FLOAT, gl.FALSE, this.interleaved.bytesPerElement * this.interleaved.numberOfElements, this.interleaved.bytesPerElement * 12)
        gl.vertexAttribPointer(this.interleaved.attribLocation.specialY1, 1, gl.FLOAT, gl.FALSE, this.interleaved.bytesPerElement * this.interleaved.numberOfElements, this.interleaved.bytesPerElement * 13)
        gl.vertexAttribPointer(this.interleaved.attribLocation.startPosition, 3, gl.FLOAT, gl.FALSE, this.interleaved.bytesPerElement * this.interleaved.numberOfElements, this.interleaved.bytesPerElement * 14)
        // TODO: startposition: y component unnecessary
    }

    render(/** @type {WebGLRenderingContext} */ gl) {
        this.uniformManager.sendDirtyUniformsToShader()
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT)
        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_INT, 0)
    }

    resize(projMatrix) {
        this.matProjUniform.update(projMatrix)
    }

}

export { MeshObject }