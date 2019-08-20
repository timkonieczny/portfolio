import { Mesh } from "./Mesh.js"
import { vec3 } from "./toji-gl-matrix-d6156a5/src/index.js";
import { Face4 } from "./Face4.js"
import { Face6 } from "./Face6.js"

class OctagonalPrismMesh extends Mesh {
    constructor() {
        super()

        const sides = []
        const a = vec3.create()
        const b = vec3.create()
        const c = vec3.create()
        const d = vec3.create()
        const color = vec3.create()
        vec3.set(color, 1, 0, 0)

        for (let i = 0; i < 6; i++) {
            vec3.set(a, Math.sin(i * 1 / 6 * Math.PI * 2), -1, Math.cos(i * 1 / 6 * Math.PI * 2))
            vec3.set(b, Math.sin((i + 1) * 1 / 6 * Math.PI * 2), -1, Math.cos((i + 1) * 1 / 6 * Math.PI * 2))
            vec3.set(c, Math.sin((i + 1) * 1 / 6 * Math.PI * 2), 1, Math.cos((i + 1) * 1 / 6 * Math.PI * 2))
            vec3.set(d, Math.sin(i * 1 / 6 * Math.PI * 2), 1, Math.cos(i * 1 / 6 * Math.PI * 2))
            sides.push(new Face4(a, b, c, d, color))
        }
        const topVertices = []
        const bottomVertices = []
        for (let i = 0; i < 6; i++) {
            const vertex = vec3.create()
            vec3.set(vertex, Math.sin(i * 1 / 6 * Math.PI * 2), 1, Math.cos(i * 1 / 6 * Math.PI * 2))
            topVertices.push(vertex)
            vec3.set(vertex, Math.sin(i * 1 / 6 * Math.PI * 2), -1, Math.cos(i * 1 / 6 * Math.PI * 2))
            bottomVertices.push(vertex)
        }
        const top = new Face6(...topVertices, color)
        const bottom = new Face6(...bottomVertices, color)

        this.combineFaces(top, bottom, ...sides)

        console.log(this.vertices)
        console.log(this.indices)
        console.log(this.normals)
        console.log(this.colors)
        

        // // Top
        // for (let i = 0; i < 6; i++) {
        //     this.vertices.push(
        //         Math.sin(i * 1 / 6 * Math.PI * 2),
        //         0.5,
        //         Math.cos(i * 1 / 6 * Math.PI * 2),
        //     )
        //     this.normals.push(
        //         0, 1, 0
        //     )
        // }
        // this.indices.push(
        //     1, 2, 0,
        //     3, 4, 2,
        //     5, 0, 4,
        //     2, 4, 0
        // )

        // // Bottom
        // for (let i = 0; i < 6; i++) {
        //     this.vertices.push(
        //         Math.sin(i * 1 / 6 * Math.PI * 2),
        //         -0.5,
        //         Math.cos(i * 1 / 6 * Math.PI * 2),
        //     )
        //     this.normals.push(0, -1, 0)
        // }
        // this.indices.push(
        //     6, 8, 7,
        //     8, 10, 9,
        //     10, 6, 11,
        //     6, 10, 8
        // )

        // // Sides
        // for (let i = 0; i < 6; i++) {   // TODO: rewrite this. do normals, vertices, indices in one go. create function makeRectangle()
        //     this.vertices.push(         // TODO: or create face object that creates the face and adds the normal etc
        //         // previous side        // TODO: reverse viewing axis
        //         Math.sin(i * 1 / 6 * Math.PI * 2),
        //         0.5,
        //         Math.cos(i * 1 / 6 * Math.PI * 2),
        //         Math.sin(i * 1 / 6 * Math.PI * 2),
        //         -0.5,
        //         Math.cos(i * 1 / 6 * Math.PI * 2),

        //         // current side
        //         Math.sin(i * 1 / 6 * Math.PI * 2),
        //         0.5,
        //         Math.cos(i * 1 / 6 * Math.PI * 2),
        //         Math.sin(i * 1 / 6 * Math.PI * 2),
        //         -0.5,
        //         Math.cos(i * 1 / 6 * Math.PI * 2),
        //     )

        //     this.normals.push(  // TODO: calculate proper normals
        //         1, 0, 0,
        //         1, 0, 0,
        //         1, 0, 0,
        //         1, 0, 0,
        //     )
            
        // }

        // this.indices.push(  // TODO: reverse
        //     15, 16, 14,
        //     17, 16, 15,
            
        //     19, 20, 18,
        //     21, 20, 19,
            
        //     23, 24, 22,
        //     25, 24, 23,
            
        //     27, 28, 26,
        //     29, 28, 27,

        //     31, 32, 30,
        //     33, 32, 31,

        //     35, 12, 34,
        //     13, 12, 35
        // )

        // // this.indices2 = [
        // //     // Top
        // //     2, 1, 0,
        // //     4, 3, 2,
        // //     0, 5, 4,
        // //     4, 2, 0,
        // //     // Bottom
        // //     6, 7, 8,
        // //     8, 9, 10,
        // //     10, 11, 6,
        // //     6, 8, 10,
        // //     // Sides
        // //     0, 1, 6,
        // //     1, 7, 6,
        // //     1, 2, 7,
        // //     2, 8, 7,
        // //     2, 3, 8,
        // //     3, 9, 8,
        // //     3, 4, 9,
        // //     4, 10, 9,
        // //     4, 5, 10,
        // //     5, 11, 10,
        // //     5, 0, 11,
        // //     0, 6, 11
        // // ]
        // // this.normals = []
        // this.colors = [
        //     1, 1, 0,
        //     1, 1, 0,
        //     1, 1, 0,
        //     1, 1, 0,
        //     1, 1, 0,
        //     1, 1, 0,

        //     1, 0, 1,
        //     1, 0, 1,
        //     1, 0, 1,
        //     1, 0, 1,
        //     1, 0, 1,
        //     1, 0, 1,
            
        //     1, 0, 0,
        //     1, 0, 0,
        //     1, 0, 0,
        //     1, 0, 0,
        //     1, 0, 0,
        //     1, 0, 0,
        //     1, 0, 0,
        //     1, 0, 0,
        //     1, 0, 0,
        //     1, 0, 0,
        //     1, 0, 0,
        //     1, 0, 0,
        //     1, 0, 0,
        //     1, 0, 0,
        //     1, 0, 0,
        //     1, 0, 0,
        //     1, 0, 0,
        //     1, 0, 0,
        //     1, 0, 0,
        //     1, 0, 0,
        //     1, 0, 0,
        //     1, 0, 0,
        //     1, 0, 0,
        //     1, 0, 0
        // ]
        // console.log(this.vertices)
        // console.log(this.indices)
        // console.log(this.normals)
        // console.log(this.colors)

    }

    combineFaces(...faces){ // TODO: move to parent. rename makeGeometry?
        this.indices = []
        this.vertices = []
        this.normals = []
        this.colors = []

        faces.forEach(face => {
            this.vertices.concat(face.vertices)
            this.normals.concat(face.normals)
            this.colors.concat(face.colors)
            const shiftedIndices = [...face.indices]
            shiftedIndices.forEach(shiftedIndex => {
                shiftedIndex+=this.indices.length
            })
            this.indices.concat(shiftedIndices)
        })

    }

}

export { OctagonalPrismMesh }