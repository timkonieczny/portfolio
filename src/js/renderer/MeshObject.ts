import Mesh from "./Mesh"
import Light from "./Light"
import UniformManager from "./UniformManager"
import UniformFloat from "./UniformFloat"
import UniformMatrix4f from "./UniformMatrix4f"
import UniformMatrix3f from "./UniformMatrix3f"
import Uniform3f from "./Uniform3f"
import { vec3, mat4, mat3 } from "gl-matrix"
import UniformAnimation from "./UniformAnimation"
import Time from "./Time"

class MeshObject {
    worldMatrix: mat4
    identityMatrix: mat4
    translationVector: vec3
    normalMatrix: mat3
    normalMatrix2: mat4
    normalMatrix3: mat4
    indices: number[]
    uniformManager: UniformManager
    interleaved: {
        buffer: WebGLBuffer
        attribLocation: {
            position: number
            color: number
            normal: number
            center: number
            displacementY: number
            startPosition: number
        }
        numberOfElements: number
        bytesPerElement: number
    }
    timeUniform: UniformFloat
    displacementYUniform: UniformFloat
    explosionUniform: UniformFloat
    matWorldUniform: UniformMatrix4f
    matProjUniform: UniformMatrix4f
    matNormUniform: UniformMatrix3f
    lightPosUniform: Uniform3f
    animation: {
        start: UniformAnimation
        message: UniformAnimation
        services: UniformAnimation
        home: UniformAnimation
        privacy: UniformAnimation
        work: UniformAnimation
        about: UniformAnimation
        wave: UniformAnimation
    }
    listeners: Map<string, ((...args: any[]) => void)[]>
    constructor(
        gl: WebGLRenderingContext | WebGL2RenderingContext,
        mesh: Mesh,
        vertexShaderSource: string,
        fragmentShaderSource: string,
        light: Light,
        uniformManager: UniformManager
    ) {
        this.worldMatrix = mat4.create()
        this.identityMatrix = mat4.create()
        this.translationVector = vec3.set(vec3.create(), 0, -2, 0)
        this.normalMatrix = mat3.create()
        this.normalMatrix2 = mat4.create()
        this.normalMatrix3 = mat4.create()

        this.listeners = new Map()
        this.listeners.set("update", [])

        this.indices = mesh.indices
        this.uniformManager = uniformManager

        const initShader = (shaderSource: string, type: number) => {
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
            console.error(
                "ERROR linking program!",
                gl.getProgramInfoLog(this.uniformManager.program)
            )
            return
        }
        gl.validateProgram(this.uniformManager.program)
        if (!gl.getProgramParameter(this.uniformManager.program, gl.VALIDATE_STATUS)) {
            console.error(
                "ERROR validating program!",
                gl.getProgramInfoLog(this.uniformManager.program)
            )
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
        const attribLocationPosition = gl.getAttribLocation(
            this.uniformManager.program,
            "aPosition"
        )
        const attribLocationColor = gl.getAttribLocation(this.uniformManager.program, "aColor")
        const attribLocationNormal = gl.getAttribLocation(this.uniformManager.program, "aNormal")
        const attribLocationCenter = gl.getAttribLocation(this.uniformManager.program, "aCenter")
        const attribLocationDisplacementY = gl.getAttribLocation(
            this.uniformManager.program,
            "aDisplacementY"
        )
        const attribLocationStartPosition = gl.getAttribLocation(
            this.uniformManager.program,
            "aStartPosition"
        )
        gl.enableVertexAttribArray(attribLocationPosition)
        gl.enableVertexAttribArray(attribLocationColor)
        gl.enableVertexAttribArray(attribLocationNormal)
        gl.enableVertexAttribArray(attribLocationCenter)
        gl.enableVertexAttribArray(attribLocationDisplacementY)
        gl.enableVertexAttribArray(attribLocationStartPosition)
        this.interleaved = {
            buffer: buffer,
            attribLocation: {
                position: attribLocationPosition,
                color: attribLocationColor,
                normal: attribLocationNormal,
                center: attribLocationCenter,
                displacementY: attribLocationDisplacementY,
                startPosition: attribLocationStartPosition,
            },
            numberOfElements: 16,
            bytesPerElement: 4,
        }

        this.timeUniform = new UniformFloat("uTime", this.uniformManager)
        this.displacementYUniform = new UniformFloat("uDisplacementY", this.uniformManager)
        this.explosionUniform = new UniformFloat("uExplosion", this.uniformManager)
        this.matWorldUniform = new UniformMatrix4f("uWorld", this.uniformManager)
        this.matProjUniform = new UniformMatrix4f("uProjection", this.uniformManager)
        this.matNormUniform = new UniformMatrix3f("uNormal", this.uniformManager)
        this.lightPosUniform = new Uniform3f("uLightPosition", this.uniformManager)

        this.lightPosUniform.update(light.position)

        const stride = this.interleaved.bytesPerElement * this.interleaved.numberOfElements
        gl.vertexAttribPointer(
            this.interleaved.attribLocation.position,
            3,
            gl.FLOAT,
            false,
            stride,
            this.interleaved.bytesPerElement * 0
        )
        gl.vertexAttribPointer(
            this.interleaved.attribLocation.normal,
            3,
            gl.FLOAT,
            false,
            stride,
            this.interleaved.bytesPerElement * 3
        )
        gl.vertexAttribPointer(
            this.interleaved.attribLocation.center,
            3,
            gl.FLOAT,
            false,
            stride,
            this.interleaved.bytesPerElement * 6
        )
        gl.vertexAttribPointer(
            this.interleaved.attribLocation.color,
            3,
            gl.FLOAT,
            false,
            stride,
            this.interleaved.bytesPerElement * 9
        )
        gl.vertexAttribPointer(
            this.interleaved.attribLocation.displacementY,
            1,
            gl.FLOAT,
            false,
            stride,
            this.interleaved.bytesPerElement * 12
        )
        gl.vertexAttribPointer(
            this.interleaved.attribLocation.startPosition,
            3,
            gl.FLOAT,
            false,
            stride,
            this.interleaved.bytesPerElement * 13
        )

        // TODO: startposition: y component unnecessary

        this.animation = {
            start: new UniformAnimation(this.explosionUniform),
            message: new UniformAnimation(this.displacementYUniform),
            services: new UniformAnimation(this.displacementYUniform),
            home: new UniformAnimation(this.displacementYUniform),
            privacy: new UniformAnimation(this.displacementYUniform),
            work: new UniformAnimation(this.displacementYUniform),
            about: new UniformAnimation(this.displacementYUniform),
            wave: new UniformAnimation(this.timeUniform),
        }
        this.animation.start.time.total = 5000
        const interpolationFunction = (interpolator: number) => {
            return (Math.cos(Math.PI + interpolator * 2 * Math.PI) + 1) / 2
        }

        // TODO: add camera panning to explosion
        // TODO: delay explosion

        this.animation.message.time.function = interpolationFunction
        this.animation.services.time.function = interpolationFunction
        this.animation.home.time.function = interpolationFunction
        this.animation.privacy.time.function = interpolationFunction
        this.animation.work.time.function = interpolationFunction
        this.animation.about.time.function = interpolationFunction

        this.animation.wave.callback = (tslf) => {
            const animation = this.animation.wave
            animation.time.elapsed += tslf
            animation.uniform.update(animation.time.elapsed * 0.001)
        }
        this.animation.wave.callbackBound = this.animation.wave.callback.bind(this.animation.wave)
    }

    getAnimation(key: string): UniformAnimation {
        switch (key.toLowerCase()) {
            case "start":
                return this.animation.start
            case "home":
                return this.animation.home
            case "message":
                return this.animation.message
            case "services":
                return this.animation.services
            case "privacy":
                return this.animation.privacy
            case "work":
                return this.animation.work
            default:
                return this.animation.wave
        }
    }

    update(time: Time) {
        this.listeners.get("update").forEach(listener => listener(time.tslf, this))

        mat4.identity(this.worldMatrix)
        mat4.translate(this.worldMatrix, this.identityMatrix, this.translationVector)

        mat4.invert(this.normalMatrix2, this.worldMatrix)
        mat4.transpose(this.normalMatrix3, this.normalMatrix2)
        mat3.fromMat4(this.normalMatrix, this.normalMatrix3)

        this.matWorldUniform.update(this.worldMatrix)
        this.matNormUniform.update(this.normalMatrix)
    }

    render(gl: WebGLRenderingContext | WebGL2RenderingContext) {
        this.uniformManager.sendDirtyUniformsToShader()
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT)
        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_INT, 0)
    }

    resize(projMatrix: mat4) {
        this.matProjUniform.update(projMatrix)
    }

    addEventListener(type: string, listener: { (...args: any[]): void }) {
        if (!this.hasEventListener(type, listener)) {
            this.listeners.get(type).push(listener)
        }
    }

    removeEventListener(type: string, listener: { (...args: any[]): void }) {
        if (this.hasEventListener(type, listener)) {
            const listeners = this.listeners.get(type)
            listeners.splice(listeners.indexOf(listener), 1)
        }
    }

    hasEventListener(type: string, listener: { (...args: any[]): void }): boolean {
        const listeners = this.listeners.get(type)
        if (listeners) {
            const index = listeners.indexOf(listener)
            return index !== -1
        } else return false
    }
}

export { MeshObject }
