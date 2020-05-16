import Stats from "stats.js"
import { MeshObject } from "./renderer/MeshObject"
class Loop {
    stats: Stats
    hexGrid: MeshObject
    gl: WebGL2RenderingContext
    floatPrecisionVertexHigh: string
    floatPrecisionFragmentHigh: string
    floatPrecisionVertexMedium: string
    floatPrecisionFragmentMedium: string
    floatPrecisionVertexLow: string
    floatPrecisionFragmentLow: string

    constructor() {
        this.stats = new Stats()
        this.stats.showPanel(0)
        this.stats.dom.style.left = ""
        this.stats.dom.style.right = "80px"
        document.body.appendChild(this.stats.dom)
    }

    loop(time: number) {
        this.stats.begin()
        this.tick(time)
        this.stats.end()
        requestAnimationFrame(this.loop.bind(this))
    }

    tick(..._args: any[]) { }

    render() {
        this.printInfo()
        this.hexGrid.addEventListener("update", this.hexGrid.getAnimation("start").callbackBound)
        this.hexGrid.addEventListener("update", this.hexGrid.getAnimation("wave").callbackBound)
        requestAnimationFrame(this.loop.bind(this))
    }

    printInfo() {
        const ext = this.gl.getExtension("WEBGL_debug_renderer_info")
        let info =
            "WebGL version:\t\t\t" +
            this.gl.getParameter(this.gl.VERSION) +
            "\nGLSL version:\t\t\t" +
            this.gl.getParameter(this.gl.SHADING_LANGUAGE_VERSION) +
            "\nWebGL Vendor:\t\t\t" +
            this.gl.getParameter(this.gl.VENDOR) +
            "\nhighp float precision:\t\tvertex: " +
            this.floatPrecisionVertexHigh +
            "\tfragment: " +
            this.floatPrecisionFragmentHigh +
            "\nmdiump float precision:\t\tvertex: " +
            this.floatPrecisionVertexMedium +
            "\tfragment: " +
            this.floatPrecisionFragmentMedium +
            "\nlowp float precision:\t\tvertex: " +
            this.floatPrecisionVertexLow +
            "\tfragment: " +
            this.floatPrecisionFragmentLow
        if (ext)
            info +=
                "\nUnmasked WebGL vendor:\t\t" +
                this.gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) +
                "\nUnmasked renderer:\t\t" +
                this.gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)
        console.info(info)
    }
}

export default Loop
