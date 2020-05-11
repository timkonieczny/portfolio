import Uniform from "./Uniform"
import { mat4 } from "gl-matrix"
import UniformManager from "./UniformManager"

class UniformMatrix4f extends Uniform {
    constructor(shaderString: string, manager: UniformManager) {
        super(shaderString, manager)
        this.value = mat4.create()
    }

    updateShader() {
        this.manager.gl.uniformMatrix4fv(this.location, false, this.value)
    }

    update(value: mat4) {
        if (!mat4.equals(this.value, value)) {
            this.value = mat4.clone(value)
            this.manager.setDirty(this)
        }
    }
}

export default UniformMatrix4f
