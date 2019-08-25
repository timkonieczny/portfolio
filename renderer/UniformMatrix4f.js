import { Uniform } from "./Uniform.js";

class UniformMatrix4f extends Uniform {
    constructor(shaderString, manager) {
        super(shaderString, manager)
    }

    updateShader() {
        this.manager.gl.uniformMatrix4fv(this.location, this.manager.gl.FALSE, this.value)
    }


}

export { UniformMatrix4f }