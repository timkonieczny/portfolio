import { createStore } from "redux"
import { composeWithDevTools } from '@redux-devtools/extension';
import { combinedReducer } from "./reducers/index.js";

export const store = createStore(combinedReducer, composeWithDevTools())

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
