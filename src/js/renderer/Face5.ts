import { vec3 } from "gl-matrix"
import Face from "./Face"

class Face5 extends Face {
    constructor(a: vec3, b: vec3, c: vec3, d: vec3, e: vec3, color: vec3, center: vec3) {
        super(a, b, c)
        this.indices = [0, 1, 2, 2, 3, 4, 0, 2, 4]
        this.interleavedArray.push(
            ...a,
            ...this.normal,
            ...center,
            ...color,
            ...b,
            ...this.normal,
            ...center,
            ...color,
            ...c,
            ...this.normal,
            ...center,
            ...color,
            ...d,
            ...this.normal,
            ...center,
            ...color,
            ...e,
            ...this.normal,
            ...center,
            ...color
        )
    }
}
export default Face5
