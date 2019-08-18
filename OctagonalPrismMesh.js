import { Mesh } from "./Mesh.js"

class OctagonalPrismMesh extends Mesh {
    constructor() {
        super()
        for (let i = 0; i < 6; i++) {
            this.vertices.push(
                Math.sin(i * 1 / 6 * Math.PI * 2),
                0.5,
                Math.cos(i * 1 / 6 * Math.PI * 2),
                0.0, 1.0, 0.0
            )
        }
        for (let i = 0; i < 6; i++) {
            this.vertices.push(
                Math.sin(i * 1 / 6 * Math.PI * 2),
                -0.5,
                Math.cos(i * 1 / 6 * Math.PI * 2),
                0.0, 1.0, 0.0,
            )
        }
        this.indices = [
            // Top
            2, 1, 0,
            4, 3, 2,
            0, 5, 4,
            4, 2, 0,
            // Bottom
            6, 7, 8,
            8, 9, 10,
            10, 11, 6,
            6, 8, 10,
            // Sides
            0, 1, 6,
            1, 7, 6,
            1, 2, 7,
            2, 8, 7,
            2, 3, 8,
            3, 9, 8,
            3, 4, 9,
            4, 10, 9,
            4, 5, 10,
            5, 11, 10,
            5, 0, 11,
            0, 6, 11
        ]
        this.colors = [
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0
        ]

    }

}

export { OctagonalPrismMesh }