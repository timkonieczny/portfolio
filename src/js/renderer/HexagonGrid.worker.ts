import HexagonGrid from "./HexagonGrid"

const context: Worker = self as any

const progressListener = (event: { progress: number; task: string }) => {
    context.postMessage({
        data: event,
        type: "progress",
    })
}

const geometry = new HexagonGrid(30, 1.1, 2)
geometry.addEventListener("progress", progressListener)
geometry.generate()

context.postMessage({
    data: geometry.getData(),
    type: "geometry",
})
