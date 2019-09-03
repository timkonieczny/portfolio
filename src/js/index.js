import { Scene } from "./Scene.js"
import mail from "../php/mail.php"
import "../scss/index.scss"
import "@fortawesome/fontawesome-free/css/all.css"

window.addEventListener("load", async _ => {

    let distanceToLeft, width;
    const canvas = document.querySelector("#canvas")

    const onButtonClick = event => {

        // init
        const wrapper = wrappers[event.currentTarget.dataset.animation]
        const goHome = wrapper === wrappers.headline


        // old wrapper

        // remove listeners
        if (wrappers.active) {
            wrappers.active.buttons.forEach(button => {
                button.listeners.forEach(listener => {
                    button.element.removeEventListener(listener.type, listener.callback)
                })
            })
        }

        // move UI
        if (goHome)
            wrappers.active.element.style.left = (distanceToLeft + width) + "px"
        else
            wrappers.active.element.style.left = (distanceToLeft - width) + "px"
        wrappers.active.element.style.opacity = 0
        wrappers.active.element.style.visibility = "hidden"

        wrappers.active.animations.forEach(animation => {
            scene.endAnimation(animation.name, animation.type)
        })

        // new wrapper

        // add listeners
        wrappers.active = wrapper
        wrappers.active.buttons.forEach(button => {
            button.listeners.forEach(listener => {
                button.element.addEventListener(listener.type, listener.callback)
            })
        })

        // move UI
        wrappers.active.element.style.left = distanceToLeft + "px"
        wrappers.active.element.style.opacity = 1
        wrappers.active.element.style.visibility = "visible"
        if (goHome)
            wrappers.learnmore.element.style.left = (distanceToLeft + width) + "px"

        // 3D animations
        if (goHome)
            scene.endAllAnimations()
        else {
            wrappers.active.animations.forEach(animation => {
                scene.startAnimation(animation.name, animation.type)
            })
        }
    }

    const onButtonClickExternal = _ => {
        console.log("go to linkedin")
    }

    const onHoverableMouseenter = event => {
        scene.startAnimation(event.currentTarget.dataset.animation, "hover")
    }

    const onHoverableMouseexit = event => {
        scene.endAnimation(event.currentTarget.dataset.animation, "hover")
    }

    const wrappers = {
        headline: {
            element: document.querySelector("#headline-wrapper"),
            animations: [],
            buttons: [
                {
                    element: document.querySelector("#headline-wrapper .contact-button"),
                    listeners: [
                        { type: "click", callback: onButtonClick },
                        { type: "mouseenter", callback: onHoverableMouseenter },
                        { type: "mouseleave", callback: onHoverableMouseexit }
                    ]
                },
                {
                    element: document.querySelector("#headline-wrapper .linkedin"),
                    listeners: [
                        { type: "click", callback: onButtonClickExternal },
                        { type: "mouseenter", callback: onHoverableMouseenter },
                        { type: "mouseleave", callback: onHoverableMouseexit }
                    ]
                },
                {
                    element: document.querySelector("#headline-wrapper #about-button"),
                    listeners: [
                        { type: "click", callback: onButtonClick },
                        { type: "mouseenter", callback: onHoverableMouseenter },
                        { type: "mouseleave", callback: onHoverableMouseexit }
                    ]
                }
            ]
        },
        contact: {
            element: document.querySelector("#message-wrapper"),
            animations: [
                { name: "contact", type: "hover" },
                { name: "contact", type: "click" },
            ],
            buttons: [
                {
                    element: document.querySelector("#message-wrapper .back-arrow"),
                    listeners: [
                        { type: "mouseenter", callback: onHoverableMouseenter },
                        { type: "mouseleave", callback: onHoverableMouseexit },
                        { type: "click", callback: onButtonClick }
                    ]
                }
            ]
        },
        learnmore: {
            element: document.querySelector("#about-wrapper"),
            animations: [
                { name: "learnmore", type: "hover" },
                { name: "learnmore", type: "click" }
            ],
            buttons: [
                {
                    element: document.querySelector("#about-wrapper .back-arrow"),
                    listeners: [
                        { type: "mouseenter", callback: onHoverableMouseenter },
                        { type: "mouseleave", callback: onHoverableMouseexit },
                        { type: "click", callback: onButtonClick }
                    ]
                },
                {
                    element: document.querySelector("#about-wrapper .contact-button"),
                    listeners: [
                        { type: "click", callback: onButtonClick }
                    ]
                },
                {
                    element: document.querySelector("#about-wrapper .linkedin"),
                    listeners: [
                        { type: "click", callback: onButtonClickExternal }
                    ]
                }
            ]
        },
        active: null
    }

    wrappers.active = wrappers.headline
    wrappers.active.buttons.forEach(button => {
        button.listeners.forEach(listener => {
            button.element.addEventListener(listener.type, listener.callback)
        })
    })

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

    const onResize = _ => {
        distanceToLeft = wrappers.active.element.getBoundingClientRect().left
        width = wrappers.active.element.clientWidth
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

    onResize()

    const scene = new Scene()
    scene.addEventListener("progress", progressListener)
    scene.addEventListener("initComplete", initCompleteListener)
    await scene.initialize(canvas, progressListener)
    scene.render()
})