import { POP_PREVIOUS_PATH, PUSH_PREVIOUS_PATH, SET_HISTORY_ACTION, SET_PROGRESS, SET_START_ANIMATION } from "../actionTypes"

export const pushPreviousPath = (path) => {
    return { type: PUSH_PREVIOUS_PATH, payload: { path } }
}
export const popPreviousPath = () => {
    return { type: POP_PREVIOUS_PATH }
}
export const setHistoryAction = (historyAction) => {
    return { type: SET_HISTORY_ACTION, payload: { historyAction } }
}
export const setProgress = (progress) => {
    return { type: SET_PROGRESS, payload: { progress } }
}
export const setStartAnimation = (callback) => {
    return { type: SET_START_ANIMATION, payload: { callback } }
}