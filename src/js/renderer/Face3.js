import { vec3 } from "gl-matrix"
import { Face } from "./Face.js";
class Face3 extends Face {
    constructor(
        /** @type {vec3} */ a,
        /** @type {vec3} */b,
        /** @type {vec3} */c,
        /** @type {vec3} */ color,
        /** @type {vec3} */ center) {
        super(a, b, c)
        this.indices = [0, 1, 2]
        this.interleavedArray.push(
            ...a, ...this.normal, ...center, ...color,
            ...b, ...this.normal, ...center, ...color,
            ...c, ...this.normal, ...center, ...color)
    }
}
export { Face3 }