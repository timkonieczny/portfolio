class Uniform {
    constructor(shaderString, manager) {
        this.manager = manager
        this.location = this.manager.gl.getUniformLocation(this.manager.program, shaderString)
        this.value = null
    }

    update(value) {
        if (this.value != value) {
            this.value = value
            this.manager.setDirty(this)
        }
    }
}

export { Uniform }