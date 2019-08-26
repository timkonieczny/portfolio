import { vec3 } from "gl-matrix";

class Face {
    constructor(
        /** @type {vec3} */ a,
        /** @type {vec3} */ b,
        /** @type {vec3} */ c
    ) {
        const ab = vec3.create()
        vec3.sub(ab, b, a)
        const ac = vec3.create()
        vec3.sub(ac, c, a)
        this.normal = vec3.create()
        vec3.cross(this.normal, ab, ac)
        this.interleavedArray = []
    }
}

export { Face }