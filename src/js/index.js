import { Scene } from "./Scene.js"
import { mailServerURL } from "URLs"
import "../scss/index.scss"
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faPaperPlane, faRobot, faRedoAlt, faLongArrowAltLeft, faLongArrowAltRight, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons"

library.add(
    faPaperPlane,
    faRobot,
    faRedoAlt,
    faLongArrowAltLeft,
    faLongArrowAltRight,
    faLinkedinIn,
    faExclamationTriangle
)

window.addEventListener("load", async _ => {
    dom.i2svg()

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
        const url = "https://www.linkedin.com/in/tim-konieczny"
        if (!window.open(url, '_blank'))
            window.location.href = url
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
                },
                {
                    element: document.querySelector("#about-wrapper #privacy-policy-button"),
                    listeners: [
                        { type: "click", callback: onButtonClick }
                    ]
                }
            ]
        },
        privacyPolicy: {
            element: document.querySelector("#privacy-policy-wrapper"),
            animations: [
                { name: "privacyPolicy", type: "hover" },
                { name: "privacyPolicy", type: "click" }
            ],
            buttons: [
                {
                    element: document.querySelector("#privacy-policy-wrapper .back-arrow"),
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
        active: null
    }

    wrappers.active = wrappers.headline
    wrappers.active.buttons.forEach(button => {
        button.listeners.forEach(listener => {
            button.element.addEventListener(listener.type, listener.callback)
        })
    })

    const messageForm = document.querySelector("#message-wrapper form")
    const messageFormWrapper = document.querySelector("#message-form-wrapper")
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
        preloaderHalves.forEach(element => {
            element.style.flex = 0;
        })
        preloaderHalvesPlaceholders.forEach(element => {
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

    let isAnimationPending = true

    const invalidInputWrapper = document.querySelector("#invalid-input-wrapper")
    const invalidInputText = document.querySelector("#invalid-input-wrapper p")
    const submitButtonWrapper = document.querySelector("#submit-button-wrapper")
    const nameField = document.querySelector("#name-input")
    const emailField = document.querySelector("#emailaddress-input")
    const subjectField = document.querySelector("#subject-input")
    const messageField = document.querySelector("#message-input")

    const onInvalidInputFocus = event => {
        event.currentTarget.classList.remove("invalid")
        invalidInputWrapper.classList.add("hide")
        submitButtonWrapper.classList.remove("hide")
        event.currentTarget.removeEventListener("focus", onInvalidInputFocus)
    }

    const validateInput = (input, errorMessage) => {
        if (!input.value) {
            invalidInputText.innerText = errorMessage
            input.classList.add("invalid")
            invalidInputWrapper.classList.remove("hide")
            submitButtonWrapper.classList.add("hide")
            input.addEventListener("focus", onInvalidInputFocus)
            return false
        }
        return true
    }

    const validateEmail = (input, errorMessage) => {
        const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!input.value || !regex.test(input.value)) {
            invalidInputText.innerText = errorMessage
            input.classList.add("invalid")
            invalidInputWrapper.classList.remove("hide")
            submitButtonWrapper.classList.add("hide")
            input.addEventListener("focus", onInvalidInputFocus)
            return false
        }
        return true
    }

    let isSendAnimationFinished = false
    let hasRequestReadyState = false
    let requestStatus;

    const onMessageFormSubmit = event => {
        event.preventDefault()

        if (validateInput(nameField, "Please enter your name.") &&
            validateEmail(emailField, "Please enter a valid email address.") &&
            validateInput(subjectField, "Please enter a subject.") &&
            validateInput(messageField, "Please enter a message.")) {

            // anti spam timetrap
            if (isFormDisabled || Date.now() - timetrapStart < 3000) {
                isFormDisabled = true
                return
            }

            const request = new XMLHttpRequest();
            request.addEventListener("readystatechange", event => {
                if (event.currentTarget.readyState == 4) {
                    if (isSendAnimationFinished) {
                        showMessageConfirmation(event.currentTarget.status)
                    } else {
                        requestStatus = event.currentTarget.status
                        hasRequestReadyState = true
                    }
                }
                if (isAnimationPending) {
                    isAnimationPending = false
                    messageForm.classList.add("sent")
                    messageFormWrapper.style.overflow = "visible"
                    const onSentAnimationEnd = _ => {
                        messageFormWrapper.style.overflow = ""
                        document.querySelector("#message-confirmation").classList.add("show")
                        messageForm.style.display = "none"
                        if (hasRequestReadyState)
                            showMessageConfirmation(requestStatus)
                        else
                            isSendAnimationFinished = true
                        messageForm.removeEventListener("animationend", onSentAnimationEnd)
                    }
                    messageForm.addEventListener("animationend", onSentAnimationEnd)
                }
            })

            request.open("POST", mailServerURL);

            request.send(new FormData(document.querySelector("#message-wrapper form")));
        }
    }

    const showMessageConfirmation = requestStatus => {
        switch (requestStatus) {
            case 200:
                document.querySelector("#message-success").classList.add("show")
                break
            case 400:
                document.querySelector("#message-client-error").classList.add("show")
                break
            case 500:
                document.querySelector("#message-server-error").classList.add("show")
                break
            default:
                document.querySelector("#message-unknown-error").classList.add("show")
                break
        }
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