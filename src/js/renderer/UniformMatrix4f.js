import Uniform from "./Uniform";
import { mat4 } from "gl-matrix";

class UniformMatrix4f extends Uniform {
    constructor(shaderString, manager) {
        super(shaderString, manager)
        this.value = mat4.create()
    }

    updateShader() {
        this.manager.gl.uniformMatrix4fv(this.location, this.manager.gl.FALSE, this.value)
    }

    update(value) {
        if (!mat4.equals(this.value, value)) {
            this.value = mat4.clone(value)
            this.manager.setDirty(this)
        }
    }


}

export default UniformMatrix4f 