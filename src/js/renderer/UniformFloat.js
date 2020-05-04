import Uniform from "./Uniform";

class UniformFloat extends Uniform {
    constructor(shaderString, manager) {
        super(shaderString, manager)
    }

    updateShader() {
        this.manager.gl.uniform1f(this.location, this.value)
    }


}

export default UniformFloat