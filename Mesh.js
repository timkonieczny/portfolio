import { vec3, mat4, mat3 } from "./toji-gl-matrix-d6156a5/src/index.js";

class Mesh {
    constructor() {
        this.vertices = []
        this.normals = []
        this.indices = []
        this.colors = []
    }

    applyMatrix( /** @type {mat4} */ matrix) {
        const vector = vec3.create()
        const matrix3 = mat3.create()
        mat3.fromMat4(matrix3, matrix)
        const outputVector = vec3.create()
        for (let i = 0; i < this.vertices.length; i += 3) {
            vec3.set(vector, this.vertices[i], this.vertices[i + 1], this.vertices[i + 2])
            vec3.transformMat4(outputVector, vector, matrix)
            this.vertices[i] = outputVector[0]
            this.vertices[i + 1] = outputVector[1]
            this.vertices[i + 2] = outputVector[2]

            vec3.set(vector, this.centers[i], this.centers[i + 1], this.centers[i + 2])
            vec3.transformMat4(outputVector, vector, matrix)
            this.centers[i] = outputVector[0]
            this.centers[i + 1] = outputVector[1]
            this.centers[i + 2] = outputVector[2]

            vec3.set(vector, this.normals[i], this.normals[i + 1], this.normals[i + 2])
            vec3.transformMat3(outputVector, vector, matrix3)
            this.normals[i] = outputVector[0]
            this.normals[i + 1] = outputVector[1]
            this.normals[i + 2] = outputVector[2]
        }
    }

    makeGeometry(...faces) {
        let vertices = []
        let indices = []
        let normals = []
        let colors = []

        faces.forEach(face => {
            indices = indices.concat(face.indices.map(index => {
                return index + vertices.length / 3
            }))
            vertices = vertices.concat(face.vertices)
            normals = normals.concat(face.normals)
            colors = colors.concat(face.colors)
        })
        return { vertices: vertices, indices: indices, normals: normals, colors: colors }
    }

    static mergeGeometries(...geometries) {
        const output = new Mesh()
        output.centers = [] // TODO: remove centers from Mesh and move it to OctagonalPrismMesh. Override this function.
        geometries.forEach(geometry => {
            const newIndices = geometry.indices.map(index => {
                return index + output.vertices.length / 3
            })
            output.indices.push(...newIndices)
            output.vertices.push(...geometry.vertices)
            output.normals.push(...geometry.normals)
            output.colors.push(...geometry.colors)
            output.centers.push(...geometry.centers)
        })
        return output
    }
}

export { Mesh }