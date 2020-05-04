import { mat4, vec3 } from "gl-matrix"
import UniformMatrix4f from "./UniformMatrix4f";
import UniformManager from "./UniformManager";
import CameraAnimation from "./CameraAnimation";

class Camera {
    constructor(/** @type {UniformManager} */ uniformManager) {

        this.listeners = {
            update: []
        }

        this.projMatrix = mat4.create()

        this.viewMatrix = mat4.create()

        this.uniformManager = uniformManager

        this.matViewUniform = new UniformMatrix4f("uView", uniformManager)

        this.animation = {
            headlineIn: new CameraAnimation(),
            messageIn: new CameraAnimation(),
            aboutIn: new CameraAnimation(),
            privacyPolicyIn: new CameraAnimation(),
            workIn: new CameraAnimation(),
            linkedInIn: new CameraAnimation(),
            out: new CameraAnimation()
        }

        vec3.set(this.animation.headlineIn.to.position, -50, 20, 50)
        vec3.set(this.animation.headlineIn.to.lookAt, 0, -20, 0)

        vec3.set(this.animation.messageIn.to.position, 20, -25, 60)

        vec3.set(this.animation.aboutIn.to.position, 60, 20, 10)
        vec3.set(this.animation.aboutIn.to.lookAt, -40, -10, -30)

        vec3.set(this.animation.privacyPolicyIn.to.position, 0, 40, 0)
        vec3.set(this.animation.privacyPolicyIn.to.up, 0, 0, 1)

        vec3.set(this.animation.workIn.to.position, 0, 15, 40)
        vec3.set(this.animation.workIn.to.lookAt, 0, -10, 0)
        vec3.set(this.animation.workIn.to.up, -1, 0, 0)

        vec3.set(this.animation.linkedInIn.to.position, 0, -40, 0)
        vec3.set(this.animation.linkedInIn.to.up, 1, 0, 0)

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

        console.log(`${window.location.pathname.replace(new RegExp("/", 'g'), "")}In`)

        let startAnimation
        switch (window.location.pathname) {
            case "/message":
                startAnimation = this.animation.messageIn
                break
            case "/about":
                startAnimation = this.animation.aboutIn
                break
            case "/privacypolicy":
                startAnimation = this.animation.privacyPolicyIn
                break
            case "/work":
                startAnimation = this.animation.workIn
                break
            default:
                startAnimation = this.animation.headlineIn
                break
        }

        this.position = vec3.copy(vec3.create(), startAnimation.to.position)
        this.lookAt = vec3.copy(vec3.create(), startAnimation.to.lookAt)
        this.up = vec3.copy(vec3.create(), startAnimation.to.up)

        this.update(this.position, this.lookAt, this.up)
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

export default Camera