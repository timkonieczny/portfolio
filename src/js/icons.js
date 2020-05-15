import { library } from "@fortawesome/fontawesome-svg-core"
import {
    faLongArrowAltLeft,
    faLongArrowAltRight,
    faPaperPlane,
    faRobot,
    faRedoAlt,
    faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons"
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons"

export default _ => {
    library.add(
        faLongArrowAltLeft,
        faLongArrowAltRight,
        faLinkedinIn,
        faPaperPlane,
        faExclamationTriangle,
        faRobot,
        faRedoAlt)
}