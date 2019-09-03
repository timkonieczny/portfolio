class Time {
    constructor() {
        this.elapsed = null
        this.offset = null
    }
    update(time) {
        if (!this.offset) {
            this.offset = time
            this.elapsed = time - this.offset
        }
        this.tslf = time - this.offset - this.elapsed
        this.elapsed = time - this.offset
    }
}

export { Time }