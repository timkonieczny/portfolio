import { Interpolator } from "./Interpolator.js"

class InterpolatorIn extends Interpolator {
    constructor(durationIn, delay) {
        super(durationIn)
        this.interpolationTime = -delay
    }

    update(tslf) {
        this.interpolationTime = Math.min(this.interpolationTime + tslf, this.transitionDurationIn)
        this.interpolator = (-Math.cos(Math.max(this.interpolationTime, 0) / this.transitionDurationIn * Math.PI) + 1) / 2, 1
    }
}

export { InterpolatorIn }