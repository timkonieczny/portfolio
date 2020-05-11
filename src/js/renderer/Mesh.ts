import Face from "./Face"

class Mesh {
    indices: number[]
    interleavedArray: number[]
    progressEventListeners: { ({ progress, task }: { progress: number, task: string }): void; }[]
    constructor() {
        this.indices = []
        this.interleavedArray = []
        this.progressEventListeners = []
    }

    mergeGeometries(...geometries: Face[] | Mesh[]) {
        let startTime = Date.now()
        const interleavedArray: number[] = []
        const output = new Mesh()
        geometries.forEach((geometry: Face | Mesh, i: number) => {
            const newIndices = geometry.indices.map((index: number) => {
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

    addEventListener(type: string, listener: ({ progress, task }: { progress: number, task: string }) => void) {
        if (type == "progress") this.progressEventListeners.push(listener)
    }

    removeEventListener(type: string, listener: ({ progress, task }: { progress: number, task: string }) => void) {
        if (type == "progress")
            this.progressEventListeners = this.progressEventListeners.filter((activeListener) => {
                return activeListener === listener
            })
    }
}

export default Mesh
