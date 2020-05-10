import { vec3 } from "gl-matrix"

class Light {
    position: vec3
    constructor(position: vec3) {
        this.position = position
    }
}

export default Light
