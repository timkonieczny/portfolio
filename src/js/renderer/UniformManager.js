class UniformManager {
    constructor(gl, program) {
        this.dirtyUniforms = []
        this.gl = gl
        this.program = program
    }

    setDirty(uniform) {
        this.dirtyUniforms.push(uniform)
    }

    sendDirtyUniformsToShader() {
        this.dirtyUniforms.forEach(uniform => {
            uniform.updateShader()
        })
        this.dirtyUniforms = []
    }
}

export default UniformManager