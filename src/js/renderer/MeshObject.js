import { Mesh } from "./Mesh.js"
import { Light } from "./Light.js"
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
        const attribLocationDisplacementY0 = gl.getAttribLocation(this.uniformManager.program, "aDisplacementY0")
        const attribLocationDisplacementY1 = gl.getAttribLocation(this.uniformManager.program, "aDisplacementY1")
        const attribLocationDisplacementY2 = gl.getAttribLocation(this.uniformManager.program, "aDisplacementY2")
        const attribLocationDisplacementY3 = gl.getAttribLocation(this.uniformManager.program, "aDisplacementY3")
        const attribLocationStartPosition = gl.getAttribLocation(this.uniformManager.program, "aStartPosition")
        gl.enableVertexAttribArray(attribLocationPosition)
        gl.enableVertexAttribArray(attribLocationColor)
        gl.enableVertexAttribArray(attribLocationNormal)
        gl.enableVertexAttribArray(attribLocationCenter)
        gl.enableVertexAttribArray(attribLocationDisplacementY0)
        gl.enableVertexAttribArray(attribLocationDisplacementY1)
        gl.enableVertexAttribArray(attribLocationDisplacementY2)
        gl.enableVertexAttribArray(attribLocationDisplacementY3)
        gl.enableVertexAttribArray(attribLocationStartPosition)
        this.interleaved = {
            buffer: buffer,
            attribLocation: {
                position: attribLocationPosition,
                color: attribLocationColor,
                normal: attribLocationNormal,
                center: attribLocationCenter,
                displacementY0: attribLocationDisplacementY0,
                displacementY1: attribLocationDisplacementY1,
                displacementY2: attribLocationDisplacementY2,
                displacementY3: attribLocationDisplacementY3,
                startPosition: attribLocationStartPosition
            },
            numberOfElements: 19,
            bytesPerElement: 4
        }

        this.timeUniform = new UniformFloat("uTime", this.uniformManager)
        this.displacementY0Uniform = new UniformFloat("uDisplacementY0", this.uniformManager)
        this.displacementY1Uniform = new UniformFloat("uDisplacementY1", this.uniformManager)
        this.displacementY2Uniform = new UniformFloat("uDisplacementY2", this.uniformManager)
        this.displacementY3Uniform = new UniformFloat("uDisplacementY3", this.uniformManager)
        this.explosionUniform = new UniformFloat("uExplosion", this.uniformManager)
        this.doubleExplosionUniform = new UniformFloat("uDoubleExplosion", this.uniformManager)
        this.matWorldUniform = new UniformMatrix4f("uWorld", this.uniformManager)
        this.matProjUniform = new UniformMatrix4f("uProjection", this.uniformManager)
        this.matNormUniform = new UniformMatrix3f("uNormal", this.uniformManager)
        this.lightPosUniform = new Uniform3f("uLightPosition", this.uniformManager)

        this.lightPosUniform.update(light.position)

        gl.vertexAttribPointer(this.interleaved.attribLocation.position, 3, gl.FLOAT, gl.FALSE, this.interleaved.bytesPerElement * this.interleaved.numberOfElements, this.interleaved.bytesPerElement * 0)
        gl.vertexAttribPointer(this.interleaved.attribLocation.normal, 3, gl.FLOAT, gl.FALSE, this.interleaved.bytesPerElement * this.interleaved.numberOfElements, this.interleaved.bytesPerElement * 3)
        gl.vertexAttribPointer(this.interleaved.attribLocation.center, 3, gl.FLOAT, gl.FALSE, this.interleaved.bytesPerElement * this.interleaved.numberOfElements, this.interleaved.bytesPerElement * 6)
        gl.vertexAttribPointer(this.interleaved.attribLocation.color, 3, gl.FLOAT, gl.FALSE, this.interleaved.bytesPerElement * this.interleaved.numberOfElements, this.interleaved.bytesPerElement * 9)
        gl.vertexAttribPointer(this.interleaved.attribLocation.displacementY0, 1, gl.FLOAT, gl.FALSE, this.interleaved.bytesPerElement * this.interleaved.numberOfElements, this.interleaved.bytesPerElement * 12)
        gl.vertexAttribPointer(this.interleaved.attribLocation.displacementY1, 1, gl.FLOAT, gl.FALSE, this.interleaved.bytesPerElement * this.interleaved.numberOfElements, this.interleaved.bytesPerElement * 13)
        gl.vertexAttribPointer(this.interleaved.attribLocation.displacementY2, 1, gl.FLOAT, gl.FALSE, this.interleaved.bytesPerElement * this.interleaved.numberOfElements, this.interleaved.bytesPerElement * 14)
        gl.vertexAttribPointer(this.interleaved.attribLocation.displacementY3, 1, gl.FLOAT, gl.FALSE, this.interleaved.bytesPerElement * this.interleaved.numberOfElements, this.interleaved.bytesPerElement * 15)
        gl.vertexAttribPointer(this.interleaved.attribLocation.startPosition, 3, gl.FLOAT, gl.FALSE, this.interleaved.bytesPerElement * this.interleaved.numberOfElements, this.interleaved.bytesPerElement * 16)
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