import { vec3 } from "gl-matrix";
import Face from "./Face";

class Face5 extends Face {
    constructor(
        /** @type {vec3} */ a,
        /** @type {vec3} */ b,
        /** @type {vec3} */ c,
        /** @type {vec3} */ d,
        /** @type {vec3} */ e,
        /** @type {vec3} */ color,
        /** @type {vec3} */ center) {
        super(a, b, c)
        this.indices = [0, 1, 2, 2, 3, 4, 0, 2, 4]
        this.interleavedArray.push(
            ...a, ...this.normal, ...center, ...color,
            ...b, ...this.normal, ...center, ...color,
            ...c, ...this.normal, ...center, ...color,
            ...d, ...this.normal, ...center, ...color,
            ...e, ...this.normal, ...center, ...color)
    }
}
export default Face5