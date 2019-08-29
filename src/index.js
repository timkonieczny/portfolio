import { Scene } from "./Scene.js"
import "./index.scss";
import "@fortawesome/fontawesome-free/css/all.css";

window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas")

    const headlineWrapper = document.getElementById("headline-wrapper")
    const messageWrapper = document.getElementById("message-wrapper")
    const aboutWrapper = document.getElementById("about-wrapper")
    let activeWrapper = headlineWrapper;
    const distanceToLeft = activeWrapper.getBoundingClientRect().left
    const width = activeWrapper.clientWidth
    // TODO: resize?

    Array.from(document.getElementsByClassName("contact-button")).forEach(element => {
        element.addEventListener("click", () => {
            moveWrappers(messageWrapper)
        })
    })

    document.querySelector("#about-button").addEventListener("click", () => {
        moveWrappers(aboutWrapper)
    })

    const moveWrappers = (newActiveWrapper) => {
        const goHome = newActiveWrapper === headlineWrapper
        if (goHome)
            activeWrapper.style.left = (distanceToLeft + width) + "px"
        else
            activeWrapper.style.left = (distanceToLeft - width) + "px"
        activeWrapper.style.opacity = 0
        activeWrapper.style.visibility = "hidden"
        activeWrapper = newActiveWrapper;
        activeWrapper.style.left = distanceToLeft + "px"
        activeWrapper.style.opacity = 1
        activeWrapper.style.visibility = "visible"

        if (goHome)
            aboutWrapper.style.left = (distanceToLeft + width) + "px"
    }

    Array.from(document.getElementsByClassName("back-arrow")).forEach(element => {
        element.addEventListener("click", () => {
            moveWrappers(headlineWrapper)
        })
    })

    const scene = new Scene(canvas)

    Array.from(document.getElementsByClassName("hoverable")).forEach(element => {
        element.addEventListener("mouseenter", (event) => {
            scene.startSpecialEvent(parseInt(event.target.dataset.id))
        })
        element.addEventListener("mouseleave", (event) => {
            scene.endSpecialEvent(parseInt(event.target.dataset.id))
        })
    })
})