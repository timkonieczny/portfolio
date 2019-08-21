import { mat4 } from "./toji-gl-matrix-d6156a5/src/index.js"
class Camera {
    constructor(
        /** @type {glMatrix.vec3} */ position,
        /** @type {glMatrix.vec3} */lookAt,
        /** @type {glMatrix.vec3} */up) {

        this.projMatrix = mat4.create()

        this.viewMatrix = mat4.create()

        this.position = position

        mat4.lookAt(this.viewMatrix, position, lookAt, up)

    }

    resize(width, height) {
        mat4.perspective(this.projMatrix, glMatrix.toRadians(45), width, height, 0.1, 1000.0)
    }

}

export { Camera }