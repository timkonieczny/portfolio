class Loop{
    constructor(){

    }

    loop(time){
        this.tick(time)
        requestAnimationFrame(this.loop.bind(this))
    }

    tick(){}

    render() {
        requestAnimationFrame(this.loop.bind(this))
    }

}

export {Loop}