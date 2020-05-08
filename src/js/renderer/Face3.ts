import { vec3 } from "gl-matrix"
import Face from "./Face"

class Face3 extends Face {
    indices: number[]
    constructor(a: vec3, b: vec3, c: vec3, color: vec3, center: vec3) {
        super(a, b, c)
        this.indices = [0, 1, 2]
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
            ...color
        )
    }
}
export default Face3
