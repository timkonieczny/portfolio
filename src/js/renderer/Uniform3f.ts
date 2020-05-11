import Uniform from "./Uniform"
import UniformManager from "./UniformManager"

class Uniform3f extends Uniform {
    constructor(shaderString: string, manager: UniformManager) {
        super(shaderString, manager)
    }

    updateShader() {
        this.manager.gl.uniform3fv(this.location, this.value)
    }
}

export default Uniform3f
