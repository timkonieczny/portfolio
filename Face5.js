import { vec3 } from "./toji-gl-matrix-d6156a5/src/index.js";

class Face5 {
    constructor(
        /** @type {vec3} */ a,
        /** @type {vec3} */ b,
        /** @type {vec3} */ c,
        /** @type {vec3} */ d,
        /** @type {vec3} */ e,
        /** @type {vec3} */ color) {
        this.vertices = [...a, ...b, ...c, ...d, ...e]
        this.indices = [0, 1, 2, 2, 3, 4, 0, 2, 4]
        let normal = vec3.create()
        vec3.cross(normal, a, b)
        this.normals = [...normal, ...normal, ...normal, ...normal, ...normal]
        this.colors = [...color, ...color, ...color, ...color, ...color]
    }
}
export { Face5 }