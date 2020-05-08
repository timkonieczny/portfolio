class Time {
    elapsed: number
    offset: number
    firstFrame: boolean
    tslf: number

    constructor() {
        this.elapsed = 0
        this.offset = 0
        this.firstFrame = true
    }
    update(time: number) {
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
