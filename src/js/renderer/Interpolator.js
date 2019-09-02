class Interpolator {
    constructor(duration) {
        this.interpolationTime = 0
        this.interpolator = 0
        this.transitionDuration = duration
        this.isIncreasing = false
        this.isDecreasing = false
        this.isHighest = false
        this.tslf = null
        this.time = null
    }

    update(time) {
        if (this.time == null) this.time = time
        this.tslf = time - this.time
        this.time = time
    }
}

export { Interpolator }