import Uniform from "./Uniform"

class UniformManager {
    dirtyUniforms: Uniform[]
    gl: WebGLRenderingContextBase
    program: WebGLProgram

    constructor(gl: WebGLRenderingContextBase, program: WebGLProgram) {
        this.dirtyUniforms = []
        this.gl = gl
        this.program = program
    }

    setDirty(uniform: Uniform) {
        this.dirtyUniforms.push(uniform)
    }

    sendDirtyUniformsToShader() {
        this.dirtyUniforms.forEach((uniform) => {
            uniform.updateShader()
        })
        this.dirtyUniforms = []
    }
}

export default UniformManager
