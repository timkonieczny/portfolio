import { Scene } from "./Scene.js"
import mail from "../php/mail.php"
import "../scss/index.scss"
import "@fortawesome/fontawesome-free/css/all.css"

window.addEventListener("load", async _ => {

    let distanceToLeft, width;
    const canvas = document.querySelector("#canvas")
    const progressBarWrapper = document.querySelector("#progress-bar-wrapper")
    const contentWrapper = document.querySelector("#wrapper")
    const preloaderHalves = Array.from(document.querySelectorAll("#upper-half, #lower-half"))
    const preloaderHalvesPlaceholders = Array.from(document.querySelectorAll(".half-placeholder"))

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
            wrappers.about.element.style.left = (distanceToLeft + width) + "px"

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
        window.location.href = "https://www.linkedin.com/in/tim-konieczny";
    }

    const onHoverableMouseEnter = event => {
        scene.startAnimation(event.currentTarget.dataset.animation, "hover")
    }

    const onHoverableMousleave = event => {
        scene.endAnimation(event.currentTarget.dataset.animation, "hover")
    }

    const wrappers = {
        headline: {
            element: document.querySelector("#headline-wrapper"),
            animations: [],
            buttons: [
                {
                    element: document.querySelector("#headline-wrapper .message-button"),
                    listeners: [
                        { type: "click", callback: onButtonClick },
                        { type: "mouseenter", callback: onHoverableMouseEnter },
                        { type: "focus", callback: onHoverableMouseEnter },
                        { type: "mouseleave", callback: onHoverableMousleave },
                        { type: "blur", callback: onHoverableMousleave }
                    ]
                },
                {
                    element: document.querySelector("#headline-wrapper .linkedin-button"),
                    listeners: [
                        { type: "click", callback: onButtonClickExternal },
                        { type: "mouseenter", callback: onHoverableMouseEnter },
                        { type: "focus", callback: onHoverableMouseEnter },
                        { type: "mouseleave", callback: onHoverableMousleave },
                        { type: "blur", callback: onHoverableMousleave }
                    ]
                },
                {
                    element: document.querySelector("#headline-wrapper #about-button"),
                    listeners: [
                        { type: "click", callback: onButtonClick },
                        { type: "mouseenter", callback: onHoverableMouseEnter },
                        { type: "focus", callback: onHoverableMouseEnter },
                        { type: "mouseleave", callback: onHoverableMousleave },
                        { type: "blur", callback: onHoverableMousleave }
                    ]
                }
            ]
        },
        message: {
            element: document.querySelector("#message-wrapper"),
            animations: [
                { name: "message", type: "hover" },
                { name: "message", type: "click" },
            ],
            buttons: [
                {
                    element: document.querySelector("#message-wrapper .back-arrow"),
                    listeners: [
                        { type: "mouseenter", callback: onHoverableMouseEnter },
                        { type: "focus", callback: onHoverableMouseEnter },
                        { type: "mouseleave", callback: onHoverableMousleave },
                        { type: "blur", callback: onHoverableMousleave },
                        { type: "click", callback: onButtonClick }
                    ]
                }
            ]
        },
        about: {
            element: document.querySelector("#about-wrapper"),
            animations: [
                { name: "about", type: "hover" },
                { name: "about", type: "click" }
            ],
            buttons: [
                {
                    element: document.querySelector("#about-wrapper .back-arrow"),
                    listeners: [
                        { type: "mouseenter", callback: onHoverableMouseEnter },
                        { type: "focus", callback: onHoverableMouseEnter },
                        { type: "mouseleave", callback: onHoverableMousleave },
                        { type: "blur", callback: onHoverableMousleave },
                        { type: "click", callback: onButtonClick }
                    ]
                },
                {
                    element: document.querySelector("#about-wrapper .message-button"),
                    listeners: [
                        { type: "click", callback: onButtonClick }
                    ]
                },
                {
                    element: document.querySelector("#about-wrapper .linkedin-button"),
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
        preloaderHalves.forEach(element =>{
            element.style.flex = 0;
        })
        preloaderHalvesPlaceholders.forEach(element =>{
            element.style.flex = 1;
        })
        progressBarWrapper.style.width = 0;
        contentWrapper.style.opacity = 1;
        preloader.style.visibility = "hidden"
    }

    let hasResizeAnimationEndListener = false

    const onResize = _ => {
        wrappers.headline.element.style.left = ""

        if (!hasResizeAnimationEndListener) {
            wrappers.headline.element.addEventListener("transitionend", onResizeAnimationEnd);
            hasResizeAnimationEndListener = true
        }
    }

    const onResizeAnimationEnd = _ => {
        wrappers.headline.element.removeEventListener("transitionend", onResizeAnimationEnd)
        hasResizeAnimationEndListener = false

        distanceToLeft = wrappers.headline.element.getBoundingClientRect().left
        width = wrappers.headline.element.clientWidth
        wrappers.active.element.style.left = distanceToLeft + "px"

        if (wrappers.active !== wrappers.headline)
            wrappers.headline.element.style.left = (distanceToLeft - width) + "px"
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

    distanceToLeft = wrappers.headline.element.getBoundingClientRect().left
    width = wrappers.headline.element.clientWidth

    const scene = new Scene()
    scene.addEventListener("progress", progressListener)
    scene.addEventListener("initComplete", initCompleteListener)
    await scene.initialize(canvas, progressListener)
    scene.render()
})