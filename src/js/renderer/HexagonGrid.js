import { Mesh } from "./Mesh.js";
import { OctagonalPrismMesh } from "./OctagonalPrismMesh.js"
import { mat4, vec3 } from "gl-matrix"

class HexagonGrid extends Mesh {
    constructor(rings, gap, scaleY) {
        super()

        let time = Date.now()
        console.info("[grid generation] start")

        const cylinders = []

        const progressTotalElements = 6 * ((rings * (rings + 1)) / 2)
        let progressCurrentElement = 0
        let progressLastPercentage = 0

        const makeRing = (level, gap, scaleY) => {
            const identity = mat4.create()
            const pi2 = Math.PI * 2
            const edgeDiameter = Math.sqrt(3)
            for (let i = 0; i < 6; i++) {
                let vertex1 = vec3.create()
                let vertex2 = vec3.create()
                let betweenVector = vec3.create()

                vec3.set(vertex1,
                    level * (edgeDiameter * gap) * Math.sin(i / 6 * pi2 + 1 / 12 * pi2),
                    0,
                    level * (edgeDiameter * gap) * Math.cos(i / 6 * pi2 + 1 / 12 * pi2))

                vec3.set(vertex2,
                    level * (edgeDiameter * gap) * Math.sin((i + 1) / 6 * pi2 + 1 / 12 * pi2),
                    0,
                    level * (edgeDiameter * gap) * Math.cos((i + 1) / 6 * pi2 + 1 / 12 * pi2))

                vec3.sub(betweenVector, vertex2, vertex1)

                let interpolator = vec3.create()
                let position = vec3.create()
                for (let j = 0; j < level; j++) {
                    const progressPercentage = Math.floor(++progressCurrentElement / progressTotalElements * 100)
                    if (progressPercentage >= progressLastPercentage + 5) {
                        progressLastPercentage = progressPercentage
                        console.info("[grid generation] " + progressPercentage + "%")
                    }
                    vec3.scale(interpolator, betweenVector, j / level)
                    vec3.add(position, vertex1, interpolator)

                    let matrix = mat4.create()
                    let scaleVector = vec3.create()
                    vec3.set(scaleVector, 1, scaleY, 1)
                    mat4.translate(matrix, identity, position)
                    mat4.scale(matrix, matrix, scaleVector)
                    cylinders.push(new OctagonalPrismMesh(matrix))
                }
            }
        }

        const makeGrid = (rings, gap, scaleY) => {
            // center
            const matrix = mat4.create()
            const vector = vec3.create()
            vec3.set(vector, 1, scaleY, 1)
            mat4.scale(matrix, matrix, vector)
            cylinders.push(new OctagonalPrismMesh(matrix))
            // rings
            for (let i = 1; i <= rings; i++)
                makeRing(i, gap, scaleY)
        }

        console.info("[grid generation] creating elements")
        makeGrid(rings, gap, scaleY)
        console.info("[grid generation] creating elements done (" + (Date.now() - time) + "ms)")
        time = Date.now()

        console.info("[grid generation] merging geometries")
        const hexGridGeometry = this.mergeGeometries(...cylinders)
        console.info("[grid generation] merging geometries done (" + (Date.now() - time) + "ms)")

        this.indices = hexGridGeometry.indices
        this.interleavedArray = hexGridGeometry.interleavedArray
        console.info("[grid generation] done.\n\t" +
            this.indices.length + " indices.\n\t" +
            this.interleavedArray.length + " elements in interleaved array.")
    }
}

export { HexagonGrid }