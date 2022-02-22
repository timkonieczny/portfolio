import { SET_PROGRESS } from "../actionTypes"

export default (state = { progress: 0 }, action) => {
    switch (action.type) {
        case SET_PROGRESS:
            let progress = 0
            switch (action.payload.progress.task) {
                case "generate":
                    progress = action.payload.progress.progress * .85
                    break
                case "merge":
                    progress = 85 + action.payload.progress.progress * .15
                    break
                case "complete":
                    progress = action.payload.progress.progress
                    break
            }
            return { ...state, progress }
        default:
            return state
    }
}