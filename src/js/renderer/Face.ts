import { vec3 } from "gl-matrix"

class Face {
    normal: vec3
    interleavedArray: number[]
    constructor(a: vec3, b: vec3, c: vec3) {
        const ab = vec3.create()
        vec3.sub(ab, b, a)
        const ac = vec3.create()
        vec3.sub(ac, c, a)
        this.normal = vec3.create()
        vec3.cross(this.normal, ab, ac)
        this.interleavedArray = []
    }
}

export default Face
