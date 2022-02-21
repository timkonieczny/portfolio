import { POP_PREVIOUS_PATH, PUSH_PREVIOUS_PATH } from "../actionTypes"

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
        default:
            return state
    }
}