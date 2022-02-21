import { SET_START_ANIMATION } from "../actionTypes"

export default (state = { startAnimation: null }, action) => {
    switch (action.type) {
        case SET_START_ANIMATION:
            return { ...state, startAnimation: action.payload.callback }
        default:
            return state
    }
}