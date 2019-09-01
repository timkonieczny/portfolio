import { Scene } from "./Scene.js"
import mail from "../php/mail.php"
import "../scss/index.scss"
import "@fortawesome/fontawesome-free/css/all.css"

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

    const messageForm = document.querySelector("#message-wrapper form")
    const timetrapStart = Date.now()
    let isFormDisabled = false

    messageForm.addEventListener("submit", (event) => {
        event.preventDefault()

        // anti spam timetrap
        if(isFormDisabled || Date.now() - timetrapStart < 10000){
            isFormDisabled = true
            return
        }

        const request = new XMLHttpRequest();
        request.onreadystatechange = function () {

            messageForm.classList.add("sent")

            if (this.readyState == 4) {
                switch (this.status) {
                    case 200:
                        document.querySelector("#message-success").style.display = "flex"
                        break
                    case 400:
                        document.querySelector("#message-client-error").style.display = "flex"
                        break
                    case 500:
                        document.querySelector("#message-server-error").style.display = "flex"
                        break
                    default:
                        document.querySelector("#message-unknown-error").style.display = "flex"
                        break
                }
            }

            document.querySelector("#message-confirmation").classList.add("show")
        };
        request.open("POST", "http://localhost:3000/dist/" + mail);

        request.send(new FormData(document.querySelector("#message-wrapper form")));
    })
})