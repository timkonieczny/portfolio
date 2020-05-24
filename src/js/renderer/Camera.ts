import { mat4, glMatrix, vec3 } from "gl-matrix"
import UniformMatrix4f from "./UniformMatrix4f"
import UniformManager from "./UniformManager"
import CameraAnimation from "./CameraAnimation"
import Easing from "easing-functions"
import Time from "./Time"

class Camera {
    projMatrix: mat4
    viewMatrix: mat4
    uniformManager: UniformManager
    matViewUniform: UniformMatrix4f
    animation: {
        homeIn: CameraAnimation
        messageIn: CameraAnimation
        servicesIn: CameraAnimation
        privacyIn: CameraAnimation
        workIn: CameraAnimation
        aboutIn: CameraAnimation
        out: CameraAnimation
    }
    position: vec3
    lookAt: vec3
    up: vec3
    listeners: Map<string, ((...args: any[]) => void)[]>
    constructor(uniformManager: UniformManager) {
        this.listeners = new Map()
        this.listeners.set("update", [])

        this.projMatrix = mat4.create()

        this.viewMatrix = mat4.create()

        this.uniformManager = uniformManager

        this.matViewUniform = new UniformMatrix4f("uView", uniformManager)

        this.animation = {
            homeIn: new CameraAnimation(),
            messageIn: new CameraAnimation(),
            servicesIn: new CameraAnimation(),
            privacyIn: new CameraAnimation(),
            workIn: new CameraAnimation(),
            aboutIn: new CameraAnimation(),
            out: new CameraAnimation(),
        }

        vec3.set(this.animation.homeIn.to.position, -50, 20, 50)
        vec3.set(this.animation.homeIn.to.lookAt, 0, -20, 0)
        this.animation.homeIn.time.function = Easing.Sinusoidal.InOut

        vec3.set(this.animation.messageIn.to.position, 20, -25, 60)
        this.animation.messageIn.time.function = Easing.Sinusoidal.InOut

        vec3.set(this.animation.servicesIn.to.position, 60, 20, 10)
        vec3.set(this.animation.servicesIn.to.lookAt, -40, -10, -30)
        this.animation.servicesIn.time.function = Easing.Sinusoidal.InOut

        vec3.set(this.animation.privacyIn.to.position, 0, 40, 0)
        vec3.set(this.animation.privacyIn.to.up, 0, 0, 1)
        this.animation.privacyIn.time.function = Easing.Sinusoidal.InOut

        vec3.set(this.animation.workIn.to.position, 0, 15, 40)
        vec3.set(this.animation.workIn.to.lookAt, 0, -10, 0)
        vec3.set(this.animation.workIn.to.up, -1, 0, 0)
        this.animation.workIn.time.function = Easing.Sinusoidal.InOut

        vec3.set(this.animation.aboutIn.to.position, 0, -40, 0)
        vec3.set(this.animation.aboutIn.to.up, 1, 0, 0)
        this.animation.aboutIn.time.function = Easing.Sinusoidal.InOut

        this.animation.out.time.function = Easing.Sinusoidal.InOut

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

        const key = window.location.pathname.replace(new RegExp("/", "g"), "")
        const startAnimation = this.getAnimation(key)

        this.position = vec3.copy(vec3.create(), startAnimation.to.position)
        this.lookAt = vec3.copy(vec3.create(), startAnimation.to.lookAt)
        this.up = vec3.copy(vec3.create(), startAnimation.to.up)
    }

    getAnimation(key: string): CameraAnimation {
        switch (key.toLowerCase()) {
            case "home":
                return this.animation.homeIn
            case "message":
                return this.animation.messageIn
            case "services":
                return this.animation.servicesIn
            case "privacy":
                return this.animation.privacyIn
            case "work":
                return this.animation.workIn
            case "about":
                return this.animation.aboutIn
            default:
                return this.animation.homeIn
        }
    }

    resize(width: number, height: number) {
        mat4.perspective(this.projMatrix, glMatrix.toRadian(45), width / height, 0.1, 100.0)
    }

    update(time: Time) {
        this.listeners.get("update").forEach(listener => listener(time.tslf, this))
        mat4.lookAt(this.viewMatrix, this.position, this.lookAt, this.up)
        this.matViewUniform.update(this.viewMatrix)
    }

    addEventListener(type: string, listener: { (...args: any[]): void }) {
        if (!this.hasEventListener(type, listener)) {
            this.listeners.get(type).push(listener)
        }
    }

    removeEventListener(type: string, listener: { (...args: any[]): void }) {
        if (this.hasEventListener(type, listener)) {
            const listeners = this.listeners.get(type)
            listeners.splice(listeners.indexOf(listener), 1)
        }
    }

    hasEventListener(type: string, listener: { (...args: any[]): void }): boolean {
        const listeners = this.listeners.get(type)
        if (listeners) {
            const index = listeners.indexOf(listener)
            return index !== -1
        } else return false
    }
}

export default Camera
