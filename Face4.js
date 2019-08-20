import { vec3 } from "./toji-gl-matrix-d6156a5/src/index.js";
import { Face } from "./Face.js";

class Face4 extends Face {
    constructor(
        /** @type {vec3} */ a,
        /** @type {vec3} */ b,
        /** @type {vec3} */ c,
        /** @type {vec3} */ d,
        /** @type {vec3} */ color) {
        super(a, b, c)
        this.vertices = [...a, ...b, ...c, ...d]
        this.indices = [0, 1, 2, 2, 3, 0]
        this.normals = [...this.normal, ...this.normal, ...this.normal, ...this.normal]
        this.colors = [...color, ...color, ...color, ...color]
    }
}
export { Face4 }