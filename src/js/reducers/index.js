import { combineReducers } from "redux"
import historyReducer from "./historyReducer"
import progressReducer from "./progressReducer"
import webGLReducer from "./webglReducer"

export const combinedReducer = combineReducers({ historyReducer, progressReducer, webGLReducer })