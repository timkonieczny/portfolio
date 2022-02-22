import { PUSH_HISTORY_LOCATION, SET_CURRENT_LOCATION, SET_HISTORY_ANIMATION, SET_PROGRESS, SET_START_ANIMATION } from "../actionTypes"

export const setHistoryAnimation = (historyAction) => {
    return { type: SET_HISTORY_ANIMATION, payload: { historyAction } }
}
export const setProgress = (progress) => {
    return { type: SET_PROGRESS, payload: { progress } }
}
export const setStartAnimation = (callback) => {
    return { type: SET_START_ANIMATION, payload: { callback } }
}
export const pushHistoryLocation = (location, currentLocation) => {
    return { type: PUSH_HISTORY_LOCATION, payload: { location, currentLocation } }
}
export const setCurrentLocation = (currentLocation) => {
    return { type: SET_CURRENT_LOCATION, payload: { currentLocation } }
}