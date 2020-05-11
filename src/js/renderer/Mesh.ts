import OctagonalPrismMesh from "./OctagonalPrismMesh"

class Mesh {
    indices: number[]
    interleavedArray: number[]
    progressEventListeners: { ({ progress: number, task: string }): void }[]
    constructor() {
        this.indices = []
        this.interleavedArray = []
        this.progressEventListeners = []
    }

    mergeGeometries(...geometries: OctagonalPrismMesh[]) {
        let startTime = Date.now()
        const interleavedArray = []
        const output = new Mesh()
        geometries.forEach((geometry, i) => {
            const newIndices = geometry.indices.map((index) => {
                return index + interleavedArray.length / 16
            })
            output.indices.push(...newIndices)
            interleavedArray.push(...geometry.interleavedArray)

            const now = Date.now()
            if (now - startTime >= 200) {
                startTime = now
                this.progressEventListeners.forEach((listener) => {
                    listener({
                        progress: (i / geometries.length) * 100,
                        task: "merge",
                    })
                })
            }
        })
        output.interleavedArray = interleavedArray
        return output
    }

    addEventListener(type: string, listener: { ({ progress: number, task: string }): void }) {
        if (type == "progress") this.progressEventListeners.push(listener)
    }

    removeEventListener(type: string, listener: (...args: any[]) => void) {
        if (type == "progress")
            this.progressEventListeners = this.progressEventListeners.filter((activeListener) => {
                return activeListener === listener
            })
    }
}

export default Mesh