class Camera {
    constructor(
        /** @type {glMatrix.vec3} */ position, 
        /** @type {glMatrix.vec3} */lookAt, 
        /** @type {glMatrix.vec3} */up) {
        let { mat4, vec3} = glMatrix;
        
        this.projMatrix = mat4.create()

        this.viewMatrix = mat4.create()

        this.position = position

        console.log(vec3.create())
        mat4.lookAt(this.viewMatrix, position, lookAt, up)
        
    }

    resize(width, height) {
        let { mat4 } = glMatrix;
        mat4.perspective(this.projMatrix, glMatrix.toRadians(45), width, height, 0.1, 1000.0)
    }

}

export { Camera }