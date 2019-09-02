import { Interpolator } from "./Interpolator.js"

class InterpolatorIn extends Interpolator {
    constructor(duration, delay) {
        super(duration)
        this.interpolationTime = -delay
    }

    update(time) {
        super.update(time)
        this.interpolationTime = Math.min(this.interpolationTime + this.tslf, this.transitionDuration)
        this.interpolator = (-Math.cos(Math.max(this.interpolationTime, 0) / this.transitionDuration * Math.PI) + 1) / 2, 1
    }
}

export { InterpolatorIn }