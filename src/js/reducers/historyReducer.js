import { POP_PREVIOUS_PATH, PUSH_PREVIOUS_PATH, SET_HISTORY_ACTION } from "../actionTypes"

export default (state = { previousPaths: ["/"], historyAction: null }, action) => {
    switch (action.type) {
        case SET_HISTORY_ACTION:
            return { ...state, historyAction: action.payload.historyAction }
        default:
            return state
    }
}