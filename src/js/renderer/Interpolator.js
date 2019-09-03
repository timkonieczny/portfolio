class Interpolator {
    constructor(duration) {
        this.interpolationTime = 0
        this.interpolator = 0
        this.transitionDuration = duration
        this.isIncreasing = false
        this.isDecreasing = false
        this.isHighest = false
    }
}

export { Interpolator }