import { Interpolator } from "./Interpolator.js"
import { vec3 } from "gl-matrix"

class InterpolatorInOut extends Interpolator {
    constructor(durationIn, durationOut) {
        super(durationIn)
        this.transitionDurationOut = durationOut
    }

    update(tslf) {
        if (this.isIncreasing) {
            this.interpolationTime += tslf
            this.interpolator = (-Math.cos((this.interpolationTime) / this.transitionDurationIn * Math.PI) + 1) / 2

            if (this.interpolationTime >= this.transitionDurationIn) {
                this.interpolator = 1
                this.isIncreasing = false
                this.isHighest = true
                this.interpolationTime = this.transitionDurationIn
            }
        } else if (this.isDecreasing) {
            this.isHighest = false
            this.interpolationTime -= tslf * this.transitionDurationIn / this.transitionDurationOut
            this.interpolator = (-Math.cos((this.interpolationTime) / this.transitionDurationIn * Math.PI) + 1) / 2
            if (this.interpolationTime <= 0) {
                this.interpolator = 0
                this.isDecreasing = false
                this.interpolationTime = 0
            }
        } else if (this.isHighest) {
            this.interpolator = 1
        } else {
            this.interpolator = 0
        }
    }
}

export { InterpolatorInOut }