import React from "react"
import { useLayoutEffect, useState } from "react"
import { Router } from "react-router-dom"
import { setHistoryAction } from "../actions"
import { useAppDispatch } from "../hooks"

export const CustomRouter = ({ history, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  })

  const dispatch = useAppDispatch()

  const onHistoryChange = (args) => {
    dispatch(setHistoryAction(args.action))
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