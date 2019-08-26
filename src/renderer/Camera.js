import { mat4 } from "../lib/toji-gl-matrix-d6156a5/src/index.js"
import { UniformMatrix4f } from "./UniformMatrix4f.js";
import { UniformManager } from "./UniformManager.js";

class Camera {
    constructor(
        /** @type {glMatrix.vec3} */ position,
        /** @type {glMatrix.vec3} */ lookAt,
        /** @type {glMatrix.vec3} */ up,
        /** @type {UniformManager} */ uniformManager) {

        this.projMatrix = mat4.create()

        this.viewMatrix = mat4.create()

        this.position = position
        this.uniformManager = uniformManager

        this.matViewUniform = new UniformMatrix4f("uView", uniformManager)
        this.update(position, lookAt, up)
    }

    resize(width, height) {
        mat4.perspective(this.projMatrix, glMatrix.toRadians(45), width, height, 0.1, 100.0)
    }

    update(position, lookAt, up){
        mat4.lookAt(this.viewMatrix, position, lookAt, up)
        this.matViewUniform.update(this.viewMatrix)
    }

}

export { Camera }