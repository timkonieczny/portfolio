import { PUSH_HISTORY_LOCATION, SET_CURRENT_LOCATION, SET_HISTORY_ACTION } from "../actionTypes"

export default (state = { historyAction: null, locations: [], currentLocation: null }, action) => {
    switch (action.type) {
        case SET_HISTORY_ACTION:
            return { ...state, historyAction: action.payload.historyAction }
        case PUSH_HISTORY_LOCATION:
            const updatedLocations = [...state.locations]
            if (updatedLocations.indexOf(action.payload.currentLocation) !== -1)
                // When a new history entry is pushed, first delete all of the "forward history"
                updatedLocations.splice(updatedLocations.indexOf(action.payload.currentLocation) + 1, Infinity)
            updatedLocations.push(action.payload.location)
            return { ...state, locations: updatedLocations }
        case SET_CURRENT_LOCATION:
            return { ...state, currentLocation: action.payload.currentLocation }
        default:
            return state
    }
}