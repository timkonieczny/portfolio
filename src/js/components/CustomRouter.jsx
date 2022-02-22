import React from "react"
import { useLayoutEffect, useState } from "react"
import { useStore } from "react-redux"
import { Router } from "react-router-dom"
import { pushHistoryLocation, setCurrentLocation, setHistoryAction } from "../actions"
import { useAppDispatch } from "../hooks"

export const CustomRouter = ({ history, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  })

  const dispatch = useAppDispatch()
  const store = useStore()

  const onHistoryChange = (args) => {
    const { history: { locations, currentLocation: lastLocation } } = store.getState()

    if (args.action === "POP") {
      const lastIndex = locations.indexOf(lastLocation)
      const currentIndex = locations.indexOf(args.location.key)

      if (lastIndex === -1 && currentIndex === -1)  // When there is no history yet (on initial load) just dispatch a pop
        dispatch(setHistoryAction(args.action)) // pop
      else {
        // Otherwise check if the back or the forward button was pressed
        if (lastIndex > currentIndex) //back
          // TODO: rename actions
          dispatch(setHistoryAction(args.action)) // pop
        else //forward
          dispatch(setHistoryAction("PUSH"))  // push
      }
    } else {
      dispatch(setHistoryAction(args.action))
      dispatch(pushHistoryLocation(args.location.key, lastLocation))
    }
    dispatch(setCurrentLocation(args.location.key))
    setState(args)
  }

  useLayoutEffect(() => history.listen(onHistoryChange), [history])

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  )
}