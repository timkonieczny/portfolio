import Stats from "stats-js"

class Loop{
    constructor(){
        this.stats = new Stats()
        this.stats.showPanel(0)
        this.stats.dom.style.left = ""
        this.stats.dom.style.right = "80px"
        document.body.appendChild(this.stats.dom)
    }

    loop(time){
        this.stats.begin();
        this.tick(time)
        this.stats.end();
        requestAnimationFrame(this.loop.bind(this))
    }

    tick(){}

    render() {
        requestAnimationFrame(this.loop.bind(this))
    }
}

export {Loop}