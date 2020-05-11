import Time from "./renderer/Time"
import { MeshObject } from "./renderer/MeshObject"

class Loop {
    hexGrid: MeshObject

    constructor() {}

    loop(time: Time) {
        this.tick(time)
        requestAnimationFrame(this.loop.bind(this))
    }

    tick(..._args: any[]) {}

    render() {
        this.hexGrid.addEventListener("update", this.hexGrid.animation.start.callbackBound)
        this.hexGrid.addEventListener("update", this.hexGrid.animation.wave.callbackBound)
        requestAnimationFrame(this.loop.bind(this))
    }
}

export default Loop
