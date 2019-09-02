import {HexagonGrid} from "./HexagonGrid.js"

const callback = progress=>{
    postMessage({
        data: progress,
        type: "progress"
    })
}

const geometry = new HexagonGrid(30, 1.1, 2, callback)

postMessage({
        data: geometry,
        type: "geometry"
    })