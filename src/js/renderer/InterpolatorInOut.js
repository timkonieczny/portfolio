import { Interpolator } from "./Interpolator.js"
import { vec3 } from "gl-matrix"

class InterpolatorInOut extends Interpolator {
    constructor(duration, targetPosition, targetLookAt, targetUp) {
        super(duration)
        this.targetPosition = targetPosition
        this.targetLookAt = targetLookAt
        this.targetUp = targetUp

        this.interpolatedPosition = vec3.create()
        this.interpolatedLookAt = vec3.create()
        this.interpolatedUp = vec3.create()
    }

    update(time) {
        super.update(time)
        if (this.isIncreasing) {
            this.interpolationTime += this.tslf
            this.interpolator = (-Math.cos((this.interpolationTime) / this.transitionDuration * Math.PI) + 1) / 2

            if (this.interpolationTime >= this.transitionDuration) {
                this.interpolator = 1
                this.isIncreasing = false
                this.isHighest = true
                this.interpolationTime = this.transitionDuration
            }
        } else if (this.isDecreasing) {
            this.isHighest = false
            this.interpolationTime -= this.tslf
            this.interpolator = (-Math.cos((this.interpolationTime) / this.transitionDuration * Math.PI) + 1) / 2
            if (this.interpolationTime <= 0) {
                this.interpolator = 0
                this.isDecreasing = false
                this.interpolationTime = 0
            }
        } else if (this.isHighest) {
            this.interpolator = 1
        } else {
            this.interpolator = 0
        }
    }

    getInterpolatedDeltaCameraParameters(camera) {
        vec3.set(
            this.interpolatedPosition,
            this.interpolator * (this.targetPosition[0] - camera.originalPosition[0]),
            this.interpolator * (this.targetPosition[1] - camera.originalPosition[1]),
            this.interpolator * (this.targetPosition[2] - camera.originalPosition[2]),
        )

        vec3.set(
            this.interpolatedLookAt,
            this.interpolator * (this.targetLookAt[0] - camera.originalLookAt[0]),
            this.interpolator * (this.targetLookAt[1] - camera.originalLookAt[1]),
            this.interpolator * (this.targetLookAt[2] - camera.originalLookAt[2]),
        )

        vec3.set(
            this.interpolatedUp,
            this.interpolator * (this.targetUp[0] - camera.originalUp[0]),
            this.interpolator * (this.targetUp[1] - camera.originalUp[1]),
            this.interpolator * (this.targetUp[2] - camera.originalUp[2]),
        )

        return { position: this.interpolatedPosition, lookAt: this.interpolatedLookAt, up: this.interpolatedUp }
    }
}

export { InterpolatorInOut }