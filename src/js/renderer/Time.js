class Time {
    constructor() {
        this.elapsed = null
        this.offset = null
        this.firstFrame = true
    }
    update(time) {
        if (this.firstFrame) {
            this.tslf = 0
            this.elapsed = 0
            this.firstFrame = false
        } else {
            if (!this.offset) {
                this.offset = time
                this.elapsed = time - this.offset
            }
            this.tslf = time - this.offset - this.elapsed
            this.elapsed = time - this.offset
        }
    }
}

export default Time