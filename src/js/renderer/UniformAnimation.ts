import Uniform from "./Uniform"
import Mesh from "./Mesh"

class UniformAnimation {
    uniform: Uniform
    time: { total: number; elapsed: number; function: (interpolator: number) => number }
    callbackBound: (tslf: number, mesh: Mesh) => void

    constructor(uniform: Uniform) {
        this.uniform = uniform

        this.time = {
            total: 5000,
            elapsed: 0,
            function: (interpolator) => {
                return interpolator
            },
        }

        this.callbackBound = this.callback.bind(this)
    }

    init() {
        this.time.elapsed = 0
    }

    callback(tslf: number, mesh: Mesh) {
        this.time.elapsed += tslf
        const interpolator = Math.min(1, this.time.elapsed / this.time.total)

        this.uniform.update(this.time.function(interpolator))

        if (interpolator === 1) {
            mesh.removeEventListener("update", this.callbackBound)
            this.init()
        }
    }
}

export default UniformAnimation
