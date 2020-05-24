import Mesh from "./Mesh"
import OctagonalPrismMesh from "./OctagonalPrismMesh"
import { mat4, vec3 } from "gl-matrix"

class HexagonGrid extends Mesh {
    rings: number
    gap: number
    scaleY: number
    geometries: OctagonalPrismMesh[]
    progressTotalElements: number
    progressCurrentElement: number
    startTime: number
    indices: any
    interleavedArray: any
    constructor(rings: number, gap: number, scaleY: number) {
        super()
        this.rings = rings
        this.gap = gap
        this.scaleY = scaleY
        this.geometries = []
    }

    generate() {
        let time = Date.now()

        this.progressTotalElements = 6 * ((this.rings * (this.rings + 1)) / 2)
        this.progressCurrentElement = 0

        this.startTime = Date.now()
        this.makeGrid()
        time = Date.now()

        const hexGridGeometry = super.mergeGeometries(...this.geometries)

        this.indices = hexGridGeometry.indices
        this.interleavedArray = hexGridGeometry.interleavedArray
    }

    makeRing(level: number) {
        const identity = mat4.create()
        const pi2 = Math.PI * 2
        const edgeDiameter = Math.sqrt(3)
        for (let i = 0; i < 6; i++) {
            let vertex1 = vec3.create()
            let vertex2 = vec3.create()
            let betweenVector = vec3.create()

            vec3.set(
                vertex1,
                level * (edgeDiameter * this.gap) * Math.sin((i / 6) * pi2 + (1 / 12) * pi2),
                0,
                level * (edgeDiameter * this.gap) * Math.cos((i / 6) * pi2 + (1 / 12) * pi2)
            )

            vec3.set(
                vertex2,
                level * (edgeDiameter * this.gap) * Math.sin(((i + 1) / 6) * pi2 + (1 / 12) * pi2),
                0,
                level * (edgeDiameter * this.gap) * Math.cos(((i + 1) / 6) * pi2 + (1 / 12) * pi2)
            )

            vec3.sub(betweenVector, vertex2, vertex1)

            let interpolator = vec3.create()
            let position = vec3.create()
            for (let j = 0; j < level; j++) {
                vec3.scale(interpolator, betweenVector, j / level)
                vec3.add(position, vertex1, interpolator)

                let matrix = mat4.create()
                let scaleVector = vec3.create()
                vec3.set(scaleVector, 1, this.scaleY, 1)
                mat4.translate(matrix, identity, position)
                mat4.scale(matrix, matrix, scaleVector)
                this.geometries.push(new OctagonalPrismMesh(matrix))

                const now = Date.now()
                this.progressCurrentElement++
                if (now - this.startTime >= 50) {
                    this.startTime = now
                    this.progressEventListeners.forEach((listener) => {
                        listener({
                            progress:
                                (this.progressCurrentElement / this.progressTotalElements) * 100,
                            task: "generate",
                        })
                    })
                }
            }
        }
    }

    makeGrid() {
        // center
        const matrix = mat4.create()
        const vector = vec3.create()
        vec3.set(vector, 1, this.scaleY, 1)
        mat4.scale(matrix, matrix, vector)
        this.geometries.push(new OctagonalPrismMesh(matrix))
        // rings
        for (let i = 1; i <= this.rings; i++) this.makeRing(i)
    }

    getData() {
        return { indices: this.indices, interleavedArray: this.interleavedArray }
    }
}

export default HexagonGrid
