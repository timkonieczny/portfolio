import { vec3 } from "gl-matrix";
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
        /** @type {Number} */ displacementY0,
        /** @type {Array} */ startPositions
    ) {
        super(a, b, c)
        this.indices = [0, 1, 2, 2, 3, 4, 4, 5, 0, 0, 2, 4]
        this.interleavedArray.push(
            ...a, ...this.normal, ...center, ...color, displacementY0, startPositions[0][0], startPositions[0][1], startPositions[0][2],
            ...b, ...this.normal, ...center, ...color, displacementY0, startPositions[1][0], startPositions[1][1], startPositions[1][2],
            ...c, ...this.normal, ...center, ...color, displacementY0, startPositions[2][0], startPositions[2][1], startPositions[2][2],
            ...d, ...this.normal, ...center, ...color, displacementY0, startPositions[3][0], startPositions[3][1], startPositions[3][2],
            ...e, ...this.normal, ...center, ...color, displacementY0, startPositions[4][0], startPositions[4][1], startPositions[4][2],
            ...f, ...this.normal, ...center, ...color, displacementY0, startPositions[5][0], startPositions[5][1], startPositions[5][2])
    }
}
export { Face6 }