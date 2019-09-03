import { HexagonGrid } from "./HexagonGrid.js"

const progressListener = event => {
    postMessage({
        data: event,
        type: "progress"
    })
}

const geometry = new HexagonGrid(30, 1.1, 2)
geometry.addEventListener("progress", progressListener)
geometry.generate()

postMessage({
    data: geometry.getData(),
    type: "geometry"
})