import UniformManager from "./UniformManager"

class Uniform {
    manager: UniformManager
    location: WebGLUniformLocation
    value: any
    constructor(shaderString: string, manager: UniformManager) {
        this.manager = manager
        this.location = this.manager.gl.getUniformLocation(this.manager.program, shaderString)
        this.value = null
    }

    update(value: any) {
        if (this.value != value) {
            this.value = value
            this.manager.setDirty(this)
        }
    }

    updateShader() {}
}

export default Uniform
