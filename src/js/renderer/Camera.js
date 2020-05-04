import { mat4, vec3 } from "gl-matrix"
import { UniformMatrix4f } from "./UniformMatrix4f.js";
import { UniformManager } from "./UniformManager.js";
import CameraAnimation from "./CameraAnimation.js";

class Camera {
    constructor(
        /** @type {glMatrix.vec3} */ position,
        /** @type {glMatrix.vec3} */ lookAt,
        /** @type {glMatrix.vec3} */ up,
        /** @type {UniformManager} */ uniformManager) {

        this.listeners = {
            update: []
        }

        this.projMatrix = mat4.create()

        this.viewMatrix = mat4.create()

        this.originalPosition = position
        this.originalLookAt = lookAt
        this.originalUp = up
        this.uniformManager = uniformManager

        this.matViewUniform = new UniformMatrix4f("uView", uniformManager)
        this.position = position
        this.lookAt = lookAt
        this.up = up
        this.update(position, lookAt, up)

        this.animation = {
            headlineIn: new CameraAnimation(),
            messageIn: new CameraAnimation(),
            aboutIn: new CameraAnimation(),
            privacyPolicyIn: new CameraAnimation(),
            workIn: new CameraAnimation(),
            linkedInIn: new CameraAnimation(),
            out: new CameraAnimation()
        }


        // TODO: test and add other animations. create animation system that takes into account which page is active
        // TODO: add + test in and out animations

        vec3.copy(this.animation.headlineIn.to.position, this.position)
        vec3.copy(this.animation.headlineIn.to.lookAt, this.lookAt)
        vec3.copy(this.animation.headlineIn.to.up, this.up)
        // this.animation.headlineIn.reset()

        vec3.set(this.animation.messageIn.to.position, 20, -25, 60)
        // this.animation.messageIn.reset()

        vec3.set(this.animation.aboutIn.to.position, 60, 20, 10)
        vec3.set(this.animation.aboutIn.to.lookAt, -40, -10, -30)
        // this.animation.aboutIn.reset()

        vec3.set(this.animation.privacyPolicyIn.to.position, 0, 40, 0)
        vec3.set(this.animation.privacyPolicyIn.to.up, 0, 0, 1)
        // this.animation.privacyPolicyIn.reset()

        vec3.set(this.animation.workIn.to.position, 0, 15, 40)
        vec3.set(this.animation.workIn.to.lookAt, 0, -10, 0)
        vec3.set(this.animation.workIn.to.up, -1, 0, 0)
        // this.animation.workIn.reset()

        vec3.set(this.animation.linkedInIn.to.position, 0, -40, 0)
        vec3.set(this.animation.linkedInIn.to.up, 1, 0, 0)
        // this.animation.linkedInIn.reset()

        this.animation.out.init = (position, lookAt, up) => {
            const animation = this.animation.out
            vec3.copy(animation.from.position, position)
            vec3.copy(animation.from.lookAt, lookAt)
            vec3.copy(animation.from.up, up)

            animation.time.elapsed = 0
            vec3.copy(animation.last.position, animation.from.position)
            vec3.copy(animation.last.lookAt, animation.from.lookAt)
            vec3.copy(animation.last.up, animation.from.up)
        }
    }

    resize(width, height) {
        mat4.perspective(this.projMatrix, glMatrix.toRadians(45), width, height, 0.1, 100.0)
    }

    update(time) {
        this.listeners.update.forEach(listener => listener(time.tslf, this))
        mat4.lookAt(this.viewMatrix, this.position, this.lookAt, this.up)
        this.matViewUniform.update(this.viewMatrix)
    }

    addEventListener(type, listener) {
        if (!this.hasEventListener(type, listener)) {
            this.listeners[type].push(listener)
        }
    }

    removeEventListener(type, listener) {
        if (this.hasEventListener(type, listener)) {
            const index = this.listeners[type].indexOf(listener)
            this.listeners[type].splice(index, 1)
        }
    }

    hasEventListener(type, listener) {
        const index = this.listeners[type].indexOf(listener)
        return index !== -1
    }
}

export { Camera }