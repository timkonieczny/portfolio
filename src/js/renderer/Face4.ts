import { vec3 } from "gl-matrix"
import Face from "./Face"

class Face4 extends Face {
    indices: number[]
    constructor(
        a: vec3,
        b: vec3,
        c: vec3,
        d: vec3,
        color: vec3,
        center: vec3,
        displacementY: number,
        startPositions: [number[], number[], number[], number[]]
    ) {
        super(a, b, c)
        this.indices = [0, 1, 2, 2, 3, 0]
        this.interleavedArray.push(
            ...a,
            ...this.normal,
            ...center,
            ...color,
            displacementY,
            startPositions[0][0],
            startPositions[0][1],
            startPositions[0][2],
            ...b,
            ...this.normal,
            ...center,
            ...color,
            displacementY,
            startPositions[1][0],
            startPositions[1][1],
            startPositions[1][2],
            ...c,
            ...this.normal,
            ...center,
            ...color,
            displacementY,
            startPositions[2][0],
            startPositions[2][1],
            startPositions[2][2],
            ...d,
            ...this.normal,
            ...center,
            ...color,
            displacementY,
            startPositions[3][0],
            startPositions[3][1],
            startPositions[3][2]
        )
    }
}
export default Face4
