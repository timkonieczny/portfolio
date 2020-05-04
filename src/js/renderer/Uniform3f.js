import Uniform from "./Uniform";

class Uniform3f extends Uniform {
    constructor(shaderString, manager) {
        super(shaderString, manager)
    }

    updateShader() {
        this.manager.gl.uniform3fv(this.location, this.value)
    }
}

export default Uniform3f