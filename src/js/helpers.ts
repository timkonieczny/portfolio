export function getAnimationByLocation(path: string) {
    switch (path.toLowerCase()) {
        case "/":
            return "home"
        case "/message":
            return "message"
        case "/services":
            return "services"
        case "/privacy":
            return "privacy"
        case "/work":
            return "work"
        case "/about":
            return "about"
        default:
            return "home"
    }
}
