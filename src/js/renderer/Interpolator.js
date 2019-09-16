class Interpolator {
    constructor(durationIn) {
        this.interpolationTime = 0
        this.interpolator = 0
        this.transitionDurationIn = durationIn
        this.isIncreasing = false
        this.isDecreasing = false
        this.isHighest = false
    }
}

export { Interpolator }