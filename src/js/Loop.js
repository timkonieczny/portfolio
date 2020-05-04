class Loop {
    constructor() {

    }

    loop(time) {
        this.tick(time)
        requestAnimationFrame(this.loop.bind(this))
    }

    tick() { }

    render() {
        this.hexGrid.addEventListener("update", this.hexGrid.animation.start.callbackBound)
        this.hexGrid.addEventListener("update", this.hexGrid.animation.wave.callbackBound)
        requestAnimationFrame(this.loop.bind(this))
    }

}

export default Loop