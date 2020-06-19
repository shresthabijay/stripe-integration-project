import React from 'react'
import { Redirect } from 'react-router-dom'

export const ProtectedRoute = ({ checkFunction , redirectPath, children }) => checkFunction() ? children : <Redirect path={redirectPath}/>