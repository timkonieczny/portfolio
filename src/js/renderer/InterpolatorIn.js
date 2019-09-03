import { Interpolator } from "./Interpolator.js"

class InterpolatorIn extends Interpolator {
    constructor(duration, delay) {
        super(duration)
        this.interpolationTime = -delay
    }

    update(tslf) {
        this.interpolationTime = Math.min(this.interpolationTime + tslf, this.transitionDuration)
        this.interpolator = (-Math.cos(Math.max(this.interpolationTime, 0) / this.transitionDuration * Math.PI) + 1) / 2, 1
    }
}

export { InterpolatorIn }