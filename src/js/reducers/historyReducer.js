import { POP_PREVIOUS_PATH, PUSH_PREVIOUS_PATH, SET_HISTORY_ACTION } from "../actionTypes"

export default (state = { previousPaths: ["/"] }, action) => {
    switch (action.type) {
        case PUSH_PREVIOUS_PATH:
            const previousPaths = [...state.previousPaths]
            previousPaths.push(action.payload.path)
            return { ...state, previousPaths }
        case POP_PREVIOUS_PATH:
            const previousPaths = [...state.previousPaths]
            previousPaths.pop()
            return { ...state, previousPaths }
        case SET_HISTORY_ACTION:
            return { ...state, historyAction: action.payload.historyAction }
        default:
            return state
    }
}