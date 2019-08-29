class Animation {
    constructor() {
        this.interpolationTime = 0
        this.interpolator = 0
        this.transitionDuration = 500
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

export { Animation }