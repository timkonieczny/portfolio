import { vec3, mat4, mat3 } from "../lib/toji-gl-matrix-d6156a5/src/index.js";

class Mesh {
    constructor() {
        this.vertices = []
        this.normals = []
        this.indices = []
        this.colors = []
    }

    applyMatrix(/** @type {mat4} */ matrix) {
        const vector = vec3.create()
        const matrix3 = mat3.create()
        mat3.fromMat4(matrix3, matrix)
        const outputVector = vec3.create()
        for (let i = 0; i < this.interleavedArray.length; i += 17) {
            // vertices
            vec3.set(vector,
                this.interleavedArray[i],
                this.interleavedArray[i + 1],
                this.interleavedArray[i + 2])
            vec3.transformMat4(outputVector, vector, matrix)
            this.interleavedArray[i] = outputVector[0]
            this.interleavedArray[i + 1] = outputVector[1]
            this.interleavedArray[i + 2] = outputVector[2]

            // normals
            vec3.set(vector,
                this.interleavedArray[i + 3],
                this.interleavedArray[i + 4],
                this.interleavedArray[i + 5])
            vec3.transformMat3(outputVector, vector, matrix3)
            this.interleavedArray[i + 3] = outputVector[0]
            this.interleavedArray[i + 4] = outputVector[1]
            this.interleavedArray[i + 5] = outputVector[2]

            // centers
            vec3.set(vector,
                this.interleavedArray[i + 6],
                this.interleavedArray[i + 7],
                this.interleavedArray[i + 8])
            vec3.transformMat4(outputVector, vector, matrix)
            this.interleavedArray[i + 6] = outputVector[0]
            this.interleavedArray[i + 7] = outputVector[1]
            this.interleavedArray[i + 8] = outputVector[2]
        }
    }

    static mergeGeometries(...geometries) {
        const interleavedArray = []
        const output = new Mesh()
        geometries.forEach(geometry => {
            const newIndices = geometry.indices.map(index => {
                return index + interleavedArray.length / 17
            })
            output.indices.push(...newIndices)
            interleavedArray.push(...geometry.interleavedArray)
        })
        output.interleavedArray = interleavedArray
        return output
    }
}

export { Mesh }