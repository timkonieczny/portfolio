import { vec3 } from "../lib/toji-gl-matrix-d6156a5/src/index.js";
import { Face } from "./Face.js";

class Face6 extends Face {
    constructor(
        /** @type {vec3} */ a,
        /** @type {vec3} */ b,
        /** @type {vec3} */ c,
        /** @type {vec3} */ d,
        /** @type {vec3} */ e,
        /** @type {vec3} */ f,
        /** @type {vec3} */ color,
        /** @type {vec3} */ center,
        /** @type {Number} */ specialY) {
        super(a, b, c)
        this.indices = [0, 1, 2, 2, 3, 4, 4, 5, 0, 0, 2, 4]
        this.interleavedArray.push(
            ...a, ...this.normal, ...center, ...color, specialY,
            ...b, ...this.normal, ...center, ...color, specialY,
            ...c, ...this.normal, ...center, ...color, specialY,
            ...d, ...this.normal, ...center, ...color, specialY,
            ...e, ...this.normal, ...center, ...color, specialY,
            ...f, ...this.normal, ...center, ...color, specialY)
    }
}
export { Face6 }