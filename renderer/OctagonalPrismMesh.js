import { Mesh } from "./Mesh.js"
import { vec3 } from "../lib/toji-gl-matrix-d6156a5/src/index.js";
import { Face4 } from "./Face4.js"
import { Face6 } from "./Face6.js"

class OctagonalPrismMesh extends Mesh {
    constructor() {
        super()

        const sides = []
        const a = vec3.create()
        const b = vec3.create()
        const c = vec3.create()
        const d = vec3.create()
        const color = vec3.create()
        vec3.set(color, 0.2, 0.2, 0.2)
        const center = vec3.create()
        vec3.set(center, 0, 0, 0)

        for (let i = 0; i < 6; i++) {
            vec3.set(a, Math.sin(i * 1 / 6 * Math.PI * 2), -1, Math.cos(i * 1 / 6 * Math.PI * 2))
            vec3.set(b, Math.sin((i + 1) * 1 / 6 * Math.PI * 2), -1, Math.cos((i + 1) * 1 / 6 * Math.PI * 2))
            vec3.set(c, Math.sin((i + 1) * 1 / 6 * Math.PI * 2), 1, Math.cos((i + 1) * 1 / 6 * Math.PI * 2))
            vec3.set(d, Math.sin(i * 1 / 6 * Math.PI * 2), 1, Math.cos(i * 1 / 6 * Math.PI * 2))
            sides.push(new Face4(a, b, c, d, color, center))
        }
        const topVertices = []
        const bottomVertices = []
        for (let i = 0; i < 6; i++) {
            let vertex = vec3.create()
            vec3.set(vertex, Math.sin(i * 1 / 6 * Math.PI * 2), 1, Math.cos(i * 1 / 6 * Math.PI * 2))
            topVertices.push(vertex)
            vertex = vec3.create()
            vec3.set(vertex, Math.sin(i * 1 / 6 * Math.PI * 2), -1, Math.cos(i * 1 / 6 * Math.PI * 2))
            bottomVertices.push(vertex)
        }
        const top = new Face6(...topVertices, color, center)
        const bottom = new Face6(...bottomVertices.reverse(), color, center)

        const geometry = Mesh.mergeGeometries(top, bottom, ...sides)
        this.indices = geometry.indices
        this.interleavedArray = geometry.interleavedArray
    }

}

export { OctagonalPrismMesh }