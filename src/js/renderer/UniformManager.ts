import Uniform from "./Uniform"

class UniformManager {
    dirtyUniforms: Uniform[]
    gl: WebGLRenderingContext | WebGL2RenderingContext
    program: WebGLProgram

    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext, program: WebGLProgram) {
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
