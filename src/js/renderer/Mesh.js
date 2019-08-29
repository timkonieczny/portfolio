class Mesh {
    constructor() {
        this.indices = []
        this.interleavedArray = []
    }

    mergeGeometries(...geometries) {
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