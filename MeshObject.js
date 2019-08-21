import { Mesh } from "./Mesh.js"
import { Light } from "./Light.js"
import { mat4, mat3, vec3 } from "./toji-gl-matrix-d6156a5/src/index.js"

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

        const initBuffer = (
            /** @type {Number} */ type,
            /** @type {TypedArray} */ array,
            /** @type {string} */ shaderAttribName) => {
            const buffer = gl.createBuffer()
            gl.bindBuffer(type, buffer)
            gl.bufferData(type, array, gl.STATIC_DRAW)
            if (type == gl.ARRAY_BUFFER) {
                const attribLocation = gl.getAttribLocation(this.program, shaderAttribName)
                gl.enableVertexAttribArray(attribLocation)
                return { buffer: buffer, attribLocation: attribLocation }
            }
            return
        }

        // TODO: interlace buffers
        this.vertex = initBuffer(gl.ARRAY_BUFFER, new Float32Array(mesh.vertices), "vertPosition")
        this.color = initBuffer(gl.ARRAY_BUFFER, new Uint8Array(mesh.colors), "vertColor")
        this.normal = initBuffer(gl.ARRAY_BUFFER, new Float32Array(mesh.normals), "vertNormal")
        this.center = initBuffer(gl.ARRAY_BUFFER, new Float32Array(mesh.centers), "vertCenter")
        initBuffer(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(this.indices))


        gl.useProgram(this.program)
        this.matWorldUniformLocation = gl.getUniformLocation(this.program, "mWorld")
        this.matViewUniformLocation = gl.getUniformLocation(this.program, "mView")
        this.matProjUniformLocation = gl.getUniformLocation(this.program, "mProj")
        this.matNormUniformLocation = gl.getUniformLocation(this.program, "mNorm")
        this.viewPosUniformLocation = gl.getUniformLocation(this.program, "viewPos")
        this.lightPosUniformLocation = gl.getUniformLocation(this.program, "lightPos")
        this.timeUniformLocation = gl.getUniformLocation(this.program, "time")
        this.worldMatrix = mat4.create();
        mat4.identity(this.worldMatrix)
        this.normalMatrix = mat3.create();
        mat4.identity(this.normalMatrix)
        gl.uniformMatrix4fv(this.matWorldUniformLocation, gl.FALSE, this.worldMatrix)
        gl.uniformMatrix4fv(this.matViewUniformLocation, gl.FALSE, camera.viewMatrix)
        gl.uniformMatrix3fv(this.matNormUniformLocation, gl.FALSE, this.normalMatrix)
        gl.uniform3f(this.lightPosUniformLocation, light.position[0], light.position[1], light.position[2])
        gl.uniform3f(this.viewPosUniformLocation, camera.position[0], camera.position[1], camera.position[2])
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

    render(/** @type {WebGLRenderingContext} */ gl) {
        gl.useProgram(this.program)
        gl.uniformMatrix4fv(this.matWorldUniformLocation, gl.FALSE, this.worldMatrix)
        gl.uniformMatrix3fv(this.matNormUniformLocation, gl.FALSE, this.normalMatrix)
        
        let time = Date.now()*0.001
        time = time % (Math.PI*2)
        gl.uniform1f(this.timeUniformLocation, time)

        gl.clearColor(0.75, 0.85, 0.8, 1.0)
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT)

        // TODO: abstraction
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex.buffer)
        // console.log(this.positionAttribLocation)
        gl.vertexAttribPointer(this.vertex.attribLocation, // Attribute location
            3, // Number of elements per attribute
            gl.FLOAT, // Type of elements
            gl.FALSE,
            0, // Size of an individual vertex
            0 // Offset from the beginning of a single vertex to this attribute
        )

        gl.bindBuffer(gl.ARRAY_BUFFER, this.color.buffer)
        // console.log(this.colorAttribLocation)
        gl.vertexAttribPointer(this.color.attribLocation, // Attribute location
            3, // Number of elements per attribute
            gl.UNSIGNED_BYTE, // Type of elements
            gl.TRUE,
            0, // Size of an individual vertex
            0 // Offset from the beginning of a single vertex to this attribute
        )

        gl.bindBuffer(gl.ARRAY_BUFFER, this.normal.buffer)
        // console.log(this.colorAttribLocation)
        gl.vertexAttribPointer(this.normal.attribLocation, // Attribute location
            3, // Number of elements per attribute
            gl.FLOAT, // Type of elements
            gl.FALSE,
            0, // Size of an individual vertex
            0 // Offset from the beginning of a single vertex to this attribute
        )

        gl.bindBuffer(gl.ARRAY_BUFFER, this.center.buffer)
        // console.log(this.colorAttribLocation)
        gl.vertexAttribPointer(this.center.attribLocation, // Attribute location
            3, // Number of elements per attribute
            gl.FLOAT, // Type of elements
            gl.FALSE,
            0, // Size of an individual vertex
            0 // Offset from the beginning of a single vertex to this attribute
        )

        gl.getExtension('OES_element_index_uint');  // TODO: not possible / necessary with experimental-webgl and webgl2
        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_INT, 0)
        // gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0) // use this with experimental-webgl
    }

    resize(gl, projMatrix) {
        gl.uniformMatrix4fv(this.matProjUniformLocation, gl.FALSE, projMatrix)
    }

}

export { MeshObject }