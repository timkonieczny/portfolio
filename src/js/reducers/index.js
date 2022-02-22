import { combineReducers } from "redux"
import history from "./history"
import progress from "./progress"
import webGL from "./webgl"

export const combinedReducer = combineReducers({ history, progress, webGL })