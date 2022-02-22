import { SET_HISTORY_ACTION, SET_PROGRESS, SET_START_ANIMATION } from "../actionTypes"

export const setHistoryAction = (historyAction) => {
    return { type: SET_HISTORY_ACTION, payload: { historyAction } }
}
export const setProgress = (progress) => {
    return { type: SET_PROGRESS, payload: { progress } }
}
export const setStartAnimation = (callback) => {
    return { type: SET_START_ANIMATION, payload: { callback } }
}