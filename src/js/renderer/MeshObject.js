import { Mesh } from "./Mesh.js"
import { Light } from "./Light.js"
import { UniformManager } from "./UniformManager.js";
import { UniformFloat } from "./UniformFloat.js";
import { UniformMatrix4f } from "./UniformMatrix4f.js";
import { UniformMatrix3f } from "./UniformMatrix3f.js";
import { Uniform3f } from "./Uniform3f.js";
import { vec3, mat4, mat3 } from "gl-matrix";
import UniformAnimation from "./UniformAnimation.js";

class MeshObject {
    constructor(
        /** @type {WebGLRenderingContext} */ gl,
        /** @type {Mesh} */ mesh,
        /** @type {string} */ vertexShaderSource,
        /** @type {string} */ fragmentShaderSource,
        /** @type {Light} */ light,
        /** @type {UniformManager} */ uniformManager) {

        this.worldMatrix = mat4.create()
        this.identityMatrix = mat4.create()
        this.translationVector = vec3.set(vec3.create(), 0, -2, 0)
        this.normalMatrix = mat3.create()
        this.normalMatrix2 = mat4.create()
        this.normalMatrix3 = mat4.create()

        this.listeners = {
            update: []
        }

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
        const attribLocationStartPosition = gl.getAttribLocation(this.uniformManager.program, "aStartPosition")
        gl.enableVertexAttribArray(attribLocationPosition)
        gl.enableVertexAttribArray(attribLocationColor)
        gl.enableVertexAttribArray(attribLocationNormal)
        gl.enableVertexAttribArray(attribLocationCenter)
        gl.enableVertexAttribArray(attribLocationDisplacementY0)
        gl.enableVertexAttribArray(attribLocationStartPosition)
        this.interleaved = {
            buffer: buffer,
            attribLocation: {
                position: attribLocationPosition,
                color: attribLocationColor,
                normal: attribLocationNormal,
                center: attribLocationCenter,
                displacementY0: attribLocationDisplacementY0,
                startPosition: attribLocationStartPosition
            },
            numberOfElements: 16,
            bytesPerElement: 4
        }

        this.timeUniform = new UniformFloat("uTime", this.uniformManager)
        this.displacementY0Uniform = new UniformFloat("uDisplacementY0", this.uniformManager)
        this.explosionUniform = new UniformFloat("uExplosion", this.uniformManager)
        this.matWorldUniform = new UniformMatrix4f("uWorld", this.uniformManager)
        this.matProjUniform = new UniformMatrix4f("uProjection", this.uniformManager)
        this.matNormUniform = new UniformMatrix3f("uNormal", this.uniformManager)
        this.lightPosUniform = new Uniform3f("uLightPosition", this.uniformManager)

        this.lightPosUniform.update(light.position)

        const stride = this.interleaved.bytesPerElement * this.interleaved.numberOfElements
        gl.vertexAttribPointer(this.interleaved.attribLocation.position,
            3, gl.FLOAT, gl.FALSE, stride, this.interleaved.bytesPerElement * 0)
        gl.vertexAttribPointer(this.interleaved.attribLocation.normal,
            3, gl.FLOAT, gl.FALSE, stride, this.interleaved.bytesPerElement * 3)
        gl.vertexAttribPointer(this.interleaved.attribLocation.center,
            3, gl.FLOAT, gl.FALSE, stride, this.interleaved.bytesPerElement * 6)
        gl.vertexAttribPointer(this.interleaved.attribLocation.color,
            3, gl.FLOAT, gl.FALSE, stride, this.interleaved.bytesPerElement * 9)
        gl.vertexAttribPointer(this.interleaved.attribLocation.displacementY0,
            1, gl.FLOAT, gl.FALSE, stride, this.interleaved.bytesPerElement * 12)
        gl.vertexAttribPointer(this.interleaved.attribLocation.startPosition,
            3, gl.FLOAT, gl.FALSE, stride, this.interleaved.bytesPerElement * 13)

        // TODO: startposition: y component unnecessary

        this.animation = {
            start: new UniformAnimation(this.explosionUniform),
            message: new UniformAnimation(this.displacementY0Uniform),
            about: new UniformAnimation(this.displacementY0Uniform),
            headline: new UniformAnimation(this.displacementY0Uniform),
            privacyPolicy: new UniformAnimation(this.displacementY0Uniform),
            work: new UniformAnimation(this.displacementY0Uniform),
            wave: new UniformAnimation(this.timeUniform)
        }
        this.animation.start.time.total = 5000
        const interpolationFunction = interpolator => {
            return Math.sin(interpolator * Math.PI)
        }
        this.animation.message.time.function = interpolationFunction
        this.animation.about.time.function = interpolationFunction
        this.animation.headline.time.function = interpolationFunction
        this.animation.privacyPolicy.time.function = interpolationFunction
        this.animation.work.time.function = interpolationFunction

        this.animation.wave.callback = (tslf) => {
            const animation = this.animation.wave
            animation.time.elapsed += tslf
            animation.uniform.update(animation.time.elapsed * 0.001)
        }
        this.animation.wave.callbackBound = this.animation.wave.callback.bind(this.animation.wave)
    }

    update(time) {
        this.listeners.update.forEach(listener => { listener(time.tslf, this) })

        mat4.identity(this.worldMatrix)
        mat4.translate(this.worldMatrix, this.identityMatrix, this.translationVector)


        mat4.invert(this.normalMatrix2, this.worldMatrix)
        mat4.transpose(this.normalMatrix3, this.normalMatrix2)
        mat3.fromMat4(this.normalMatrix, this.normalMatrix3)

        this.matWorldUniform.update(this.worldMatrix)
        this.matNormUniform.update(this.normalMatrix)
    }

    render(/** @type {WebGLRenderingContext} */ gl) {
        this.uniformManager.sendDirtyUniformsToShader()
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT)
        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_INT, 0)
    }

    resize(projMatrix) {
        this.matProjUniform.update(projMatrix)
    }

    addEventListener(type, listener) {
        if (!this.hasEventListener(type, listener)) {
            this.listeners[type].push(listener)
        }
    }

    removeEventListener(type, listener) {
        if (this.hasEventListener(type, listener)) {
            const index = this.listeners[type].indexOf(listener)
            this.listeners[type].splice(index, 1)
        }
    }

    hasEventListener(type, listener) {
        const index = this.listeners[type].indexOf(listener)
        return index !== -1
    }

}

export { MeshObject }