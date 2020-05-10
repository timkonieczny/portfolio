import Mesh from "./Mesh"
import { vec3, mat4 } from "gl-matrix"
import Face4 from "./Face4"
import Face6 from "./Face6"

class OctagonalPrismMesh extends Mesh {
    constructor(matrix: mat4) {
        super()

        const sides = []
        const a = vec3.create()
        const b = vec3.create()
        const c = vec3.create()
        const d = vec3.create()
        const startPositionA = vec3.create()
        const startPositionB = vec3.create()
        const startPositionC = vec3.create()
        const startPositionD = vec3.create()
        const color = vec3.create()
        vec3.set(color, 0.2, 0.2, 0.2)
        const center = vec3.create()
        vec3.set(center, 0, 0, 0)
        vec3.transformMat4(center, center, matrix)
        const invertedMatrix = mat4.create()
        mat4.invert(invertedMatrix, matrix)

        const displacementY = Math.random() - 0.5

        const y0 = -1
        const y1 = 1
        for (let i = 0; i < 6; i++) {
            let x0 = Math.sin(((i * 1) / 6) * Math.PI * 2)
            let x1 = Math.sin((((i + 1) * 1) / 6) * Math.PI * 2)
            let z0 = Math.cos(((i * 1) / 6) * Math.PI * 2)
            let z1 = Math.cos((((i + 1) * 1) / 6) * Math.PI * 2)

            vec3.set(startPositionA, x0, y0, z0)
            vec3.transformMat4(a, startPositionA, matrix)

            vec3.set(startPositionB, x1, y0, z1)
            vec3.transformMat4(b, startPositionB, matrix)

            vec3.set(startPositionC, x1, y1, z1)
            vec3.transformMat4(c, startPositionC, matrix)

            vec3.set(startPositionD, x0, y1, z0)
            vec3.transformMat4(d, startPositionD, matrix)

            sides.push(
                new Face4(a, b, c, d, color, center, displacementY, [
                    Array.from(startPositionA),
                    Array.from(startPositionB),
                    Array.from(startPositionC),
                    Array.from(startPositionD),
                ])
            )
        }
        const topVertices = []
        const bottomVertices = []
        const bottomStartPosition = []
        const topStartPosition = []
        for (let i = 0; i < 6; i++) {
            let x = Math.sin(((i * 1) / 6) * Math.PI * 2)
            let z = Math.cos(((i * 1) / 6) * Math.PI * 2)

            let startVertex = vec3.create()
            vec3.set(startVertex, x, 1, z)
            topStartPosition.push(startVertex)
            let vertex = vec3.create()
            vec3.transformMat4(vertex, startVertex, matrix)
            topVertices.push(vertex)

            startVertex = vec3.create() // TODO: y is always the same and can be ignored. in face add attributes x and z. ignore y
            vec3.set(startVertex, x, -1, z)
            bottomStartPosition.push(startVertex)
            vertex = vec3.create()
            vec3.transformMat4(vertex, startVertex, matrix)
            bottomVertices.push(vertex)
        }

        const topStartPosition2 = topStartPosition.map((value) => {
            return Array.from(value)
        })

        const top = new Face6(
            topVertices[0],
            topVertices[1],
            topVertices[2],
            topVertices[3],
            topVertices[4],
            topVertices[5],
            color,
            center,
            displacementY,
            topStartPosition2
        )

        const bottomStartPosition2 = bottomStartPosition.map((value) => {
            return Array.from(value).reverse()
        })
        bottomStartPosition2.reverse()

        const bottom = new Face6(
            bottomVertices[5],
            bottomVertices[4],
            bottomVertices[3],
            bottomVertices[2],
            bottomVertices[1],
            bottomVertices[0],
            color,
            center,
            displacementY,
            bottomStartPosition2
        )

        const geometry = this.mergeGeometries(top, bottom, ...sides)

        this.indices = geometry.indices
        this.interleavedArray = geometry.interleavedArray
    }
}

export default OctagonalPrismMesh
