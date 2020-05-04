import { vec3 } from "gl-matrix";

class CameraAnimation {
    constructor() {
        this.from = {
            position: vec3.create(),
            lookAt: vec3.create(),
            up: vec3.create()
        }

        this.to = {
            position: vec3.create(),
            lookAt: vec3.create(),
            up: vec3.create()
        }
        this.last = {
            position: vec3.create(),
            lookAt: vec3.create(),
            up: vec3.create()
        }
        this.current = {
            position: vec3.create(),
            lookAt: vec3.create(),
            up: vec3.create()
        }
        this.delta = {
            position: vec3.create(),
            lookAt: vec3.create(),
            up: vec3.create()
        }

        const defaultUp = vec3.set(vec3.create(), 0, 1, 0)
        vec3.copy(this.from.up, defaultUp)
        vec3.copy(this.to.up, defaultUp)
        vec3.copy(this.last.up, defaultUp)



        this.time = {
            total: 5000,
            elapsed: 0,
            function: interpolator => {
                return interpolator
            }
        }

        this.callbackBound = this.callback.bind(this)
    }

    init() {
        this.time.elapsed = 0
        vec3.copy(this.last.position, this.from.position)
        vec3.copy(this.last.lookAt, this.from.lookAt)
        vec3.copy(this.last.up, this.from.up)
    }

    callback(tslf, camera) {
        this.time.elapsed += tslf
        const interpolator = Math.min(1, this.time.elapsed / this.time.total)


        vec3.lerp(this.current.position, this.from.position, this.to.position, this.time.function(interpolator))
        vec3.lerp(this.current.lookAt, this.from.lookAt, this.to.lookAt, this.time.function(interpolator))
        vec3.lerp(this.current.up, this.from.up, this.to.up, this.time.function(interpolator))

        vec3.sub(this.delta.position, this.current.position, this.last.position)
        vec3.sub(this.delta.lookAt, this.current.lookAt, this.last.lookAt)
        vec3.sub(this.delta.up, this.current.up, this.last.up)

        vec3.add(camera.position, camera.position, this.delta.position)
        vec3.add(camera.lookAt, camera.lookAt, this.delta.lookAt)
        vec3.add(camera.up, camera.up, this.delta.up)

        vec3.copy(this.last.position, this.current.position)
        vec3.copy(this.last.lookAt, this.current.lookAt)
        vec3.copy(this.last.up, this.current.up)

        if (interpolator === 1)
            camera.removeEventListener("update", this.callbackBound)
    }
}

export default CameraAnimation