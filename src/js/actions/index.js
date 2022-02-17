import { POP_PREVIOUS_PATH, PUSH_PREVIOUS_PATH } from "../actionTypes"

export const pushPreviousPath = (path) => {
    return { type: PUSH_PREVIOUS_PATH, payload: { path } }
}
export const popPreviousPath = () => {
    return { type: POP_PREVIOUS_PATH }
}