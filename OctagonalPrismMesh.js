import { Mesh } from "./Mesh.js"
import { vec3 } from "./toji-gl-matrix-d6156a5/src/index.js";
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

        for (let i = 0; i < 6; i++) {
            vec3.set(a, Math.sin(i * 1 / 6 * Math.PI * 2), -1, Math.cos(i * 1 / 6 * Math.PI * 2))
            vec3.set(b, Math.sin((i + 1) * 1 / 6 * Math.PI * 2), -1, Math.cos((i + 1) * 1 / 6 * Math.PI * 2))
            vec3.set(c, Math.sin((i + 1) * 1 / 6 * Math.PI * 2), 1, Math.cos((i + 1) * 1 / 6 * Math.PI * 2))
            vec3.set(d, Math.sin(i * 1 / 6 * Math.PI * 2), 1, Math.cos(i * 1 / 6 * Math.PI * 2))
            sides.push(new Face4(a, b, c, d, color))
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
        const top = new Face6(...topVertices, color)
        const bottom = new Face6(...bottomVertices.reverse(), color)

        this.vertices = []
        this.indices = []
        this.normals = []
        this.colors = []

        const geometry = this.makeGeometry(top, bottom, ...sides)

        this.centers = []
        for (let i = 0; i < geometry.vertices.length; i += 3)
            this.centers.push(0, 0, 0)

        this.vertices = geometry.vertices
        this.indices = geometry.indices
        this.normals = geometry.normals
        this.colors = geometry.colors
    }

}

export { OctagonalPrismMesh }