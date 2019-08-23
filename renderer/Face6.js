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
        /** @type {Number} */ specialY0,
        /** @type {Number} */ specialY1
    ) {
        super(a, b, c)
        this.indices = [0, 1, 2, 2, 3, 4, 4, 5, 0, 0, 2, 4]
        this.interleavedArray.push(
            ...a, ...this.normal, ...center, ...color, specialY0, specialY1,
            ...b, ...this.normal, ...center, ...color, specialY0, specialY1,
            ...c, ...this.normal, ...center, ...color, specialY0, specialY1,
            ...d, ...this.normal, ...center, ...color, specialY0, specialY1,
            ...e, ...this.normal, ...center, ...color, specialY0, specialY1,
            ...f, ...this.normal, ...center, ...color, specialY0, specialY1)
    }
}
export { Face6 }