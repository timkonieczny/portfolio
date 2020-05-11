import Mesh from "./Mesh";

class Sphere extends Mesh {
    constructor() {
        super()
        this.createIco()
    }

    createIco() {
        const vertices = []
        for (let i = 0; i < 4; i++) {
            let y = Math.cos(i / 3 * Math.PI)
            console.log("first y: " + y)
            for (let j = 0; j < 5; j++) {
                let x = Math.sin(j / 4 * Math.PI * 2)
                let z = Math.cos(j / 4 * Math.PI * 2)
                vertices.push(x, y, z)
            }
        }
        console.log(vertices)
    }
}

export { Sphere }