import { createStore } from "redux"
import { composeWithDevTools } from '@redux-devtools/extension';
import historyReducer from "./reducers/historyReducer.js"

export const store = createStore(historyReducer, composeWithDevTools())


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
