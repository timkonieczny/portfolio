class Mesh {
    constructor() {
        this.vertices = []
        this.normals = []
        this.indices = []
        this.colors = []
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
}

export { Mesh }