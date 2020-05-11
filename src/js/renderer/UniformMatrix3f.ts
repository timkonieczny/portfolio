import Uniform from "./Uniform"
import UniformManager from "./UniformManager"

class UniformMatrix3f extends Uniform {
    constructor(shaderString: string, manager: UniformManager) {
        super(shaderString, manager)
    }

    updateShader() {
        this.manager.gl.uniformMatrix3fv(this.location, false, this.value)
    }
}

export default UniformMatrix3f
