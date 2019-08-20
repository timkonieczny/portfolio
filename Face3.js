import { vec3 } from "./toji-gl-matrix-d6156a5/src/index.js"
import { Face } from "./Face.js";
class Face3 extends Face {
    constructor(
        /** @type {vec3} */ a,
        /** @type {vec3} */b,
        /** @type {vec3} */c,
        /** @type {vec3} */ color) {
        super(a, b, c)
        this.vertices = [...a, ...b, ...c]
        this.indices = [0, 1, 2]
        // let normal = vec3.create()
        // vec3.cross(normal, a, b)
        this.normals = [...this.normal, ...this.normal, ...this.normal]
        this.colors = [...color, ...color, ...color]
    }
}
export { Face3 }