import Uniform from "./Uniform"
import UniformManager from "./UniformManager"

class UniformFloat extends Uniform {
    constructor(shaderString: string, manager: UniformManager) {
        super(shaderString, manager)
    }

    updateShader() {
        this.manager.gl.uniform1f(this.location, this.value)
    }
}

export default UniformFloat
