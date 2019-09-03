import { Scene } from "./Scene.js"
import mail from "../php/mail.php"
import "../scss/index.scss"
import "@fortawesome/fontawesome-free/css/all.css"

window.addEventListener("load", async _ => {

    let distanceToLeft, width;
    const canvas = document.querySelector("#canvas")

    const wrappers = {
        headline: document.querySelector("#headline-wrapper"),
        contact: document.querySelector("#message-wrapper"),
        learnmore: document.querySelector("#about-wrapper"),
        active: document.querySelector("#headline-wrapper")
    }

    const messageForm = document.querySelector("#message-wrapper form")
    const timetrapStart = Date.now()
    let isFormDisabled = false

    const preloader = document.querySelector("#preloader")
    const progressBar = document.querySelector("#progress-bar")

    const progressListener = event => {
        let progress = 0
        switch (event.task) {
            case "generate":
                progress += event.progress * 0.85
                break
            case "merge":
                progress += 85 + event.progress * 0.15
                break
        }
        progressBar.style.width = progress + "%"
    }

    const initCompleteListener = _ => {
        progressBar.style.width = "100%"    // TODO: update progress bar between geometry merge and first frame. Recalculate percentages
        preloader.style.visibility = "hidden";
        preloader.style.animation = "preloader 1s forwards";
    }

    const moveWrappers = newActiveWrapper => {
        const goHome = newActiveWrapper === wrappers.headline
        if (goHome)
            wrappers.active.style.left = (distanceToLeft + width) + "px"
        else
            wrappers.active.style.left = (distanceToLeft - width) + "px"
        wrappers.active.style.opacity = 0
        wrappers.active.style.visibility = "hidden"
        wrappers.active = newActiveWrapper;
        wrappers.active.style.left = distanceToLeft + "px"
        wrappers.active.style.opacity = 1
        wrappers.active.style.visibility = "visible"

        if (goHome)
            wrappers.learnmore.style.left = (distanceToLeft + width) + "px"
    }

    const onResize = _ => {
        distanceToLeft = wrappers.active.getBoundingClientRect().left
        width = wrappers.active.clientWidth
    }

    const onButtonClick = event => {
        if (event.currentTarget.dataset.animation != "linkedin")
            moveWrappers(wrappers[event.currentTarget.dataset.animation])
        if (event.currentTarget.dataset.animation != "learnmore") {
            scene.endAnimation("learnmore", "click")
            scene.endAnimation("learnmore", "hover")
        }
        scene.startAnimation(event.currentTarget.dataset.animation, "click")
        scene.startAnimation(event.currentTarget.dataset.animation, "hover")
        event.currentTarget.removeEventListener("mouseleave", onHoverableMouseexit) // TODO: disable all eventlisteners on inactive page
        event.currentTarget.removeEventListener("mouseenter", onHoverableMouseenter)
    }

    const onBackArrowClick = _ => {
        moveWrappers(wrappers.headline)
        scene.endAllAnimations()
        Array.from(document.querySelectorAll(".animated")).forEach(element => {
            element.addEventListener("mouseenter", onHoverableMouseenter)
            element.addEventListener("mouseleave", onHoverableMouseexit)
        })
    }

    const onHoverableMouseenter = event => {
        scene.startAnimation(event.currentTarget.dataset.animation, "hover")
    }

    const onHoverableMouseexit = event => {
        scene.endAnimation(event.currentTarget.dataset.animation, "hover")
    }

    const onMessageFormSubmit = event => {
        event.preventDefault()

        // anti spam timetrap
        if (isFormDisabled || Date.now() - timetrapStart < 3000) {
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
    }

    window.addEventListener("resize", onResize)
    messageForm.addEventListener("submit", onMessageFormSubmit)

    Array.from(document.querySelectorAll("#headline-wrapper .animated, #about-wrapper .contact-button, #about-wrapper .linkedin")).forEach(element => {
        element.addEventListener("click", onButtonClick)
    })

    Array.from(document.querySelectorAll(".back-arrow")).forEach(element => {
        element.addEventListener("click", onBackArrowClick)
    })

    Array.from(document.querySelectorAll(".animated")).forEach(element => {
        element.addEventListener("mouseenter", onHoverableMouseenter)
        element.addEventListener("mouseleave", onHoverableMouseexit)
    })

    onResize()

    const scene = new Scene()
    scene.addEventListener("progress", progressListener)
    scene.addEventListener("initComplete", initCompleteListener)
    await scene.initialize(canvas, progressListener)
    scene.render()
})