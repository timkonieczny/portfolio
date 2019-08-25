import { Uniform } from "./Uniform.js";

class UniformFloat extends Uniform {
    constructor(shaderString, manager) {
        super(shaderString, manager)
    }

    updateShader() {
        this.manager.gl.uniform1f(this.location, this.value)
    }


}

export { UniformFloat }