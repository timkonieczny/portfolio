import { Animation } from "./Animation.js"
class HoverAnimation extends Animation {
    constructor() {
        super()
    }

    update(time) {
        super.update(time)
        if (this.isIncreasing) {
            this.interpolationTime += this.tslf
            this.interpolator = (-Math.cos((this.interpolationTime) / this.transitionDuration * Math.PI) + 1) / 2

            if (this.interpolationTime >= this.transitionDuration) {
                this.interpolator = 1
                this.isIncreasing = false
                this.isHighest = true
                this.interpolationTime = this.transitionDuration
            }
        } else if (this.isDecreasing) {
            this.isHighest = false
            this.interpolationTime -= this.tslf
            this.interpolator = (-Math.cos((this.interpolationTime) / this.transitionDuration * Math.PI) + 1) / 2
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
        // this.tslf = time
    }
}

export { HoverAnimation }