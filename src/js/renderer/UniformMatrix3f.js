import { Uniform } from "./Uniform.js";

class UniformMatrix3f extends Uniform {
    constructor(shaderString, manager) {
        super(shaderString, manager)
    }

    updateShader() {
        this.manager.gl.uniformMatrix3fv(this.location, this.manager.gl.FALSE, this.value)
    }
}

export { UniformMatrix3f }