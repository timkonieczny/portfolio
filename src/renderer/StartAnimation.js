import { Animation } from "./Animation.js"

class StartAnimation extends Animation {
    constructor() {
        super()
        this.interpolationTime = -2000
        this.transitionDuration = 2000
    }

    update(time) {
        super.update(time)
        this.interpolationTime = Math.min(this.interpolationTime + this.tslf, this.transitionDuration)
        this.interpolator = (-Math.cos(Math.max(this.interpolationTime, 0) / this.transitionDuration * Math.PI) + 1) / 2, 1
    }
}

export { StartAnimation }