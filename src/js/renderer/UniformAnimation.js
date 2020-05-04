import { vec3 } from "gl-matrix";

class UniformAnimation {
    constructor(uniform) {

        this.uniform = uniform

        this.time = {
            total: 5000,
            elapsed: 0,
            function: interpolator => {
                return interpolator
            }
        }

        this.callbackBound = this.callback.bind(this)
    }

    init() {
        this.time.elapsed = 0
    }

    callback(tslf, mesh) {
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