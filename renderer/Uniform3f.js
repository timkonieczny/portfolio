import { Uniform } from "./Uniform.js";

class Uniform3f extends Uniform {
    constructor(shaderString, manager) {
        super(shaderString, manager)
    }

    updateShader() {
        this.manager.gl.uniform3fv(this.location, this.value)
    }
}

export { Uniform3f }