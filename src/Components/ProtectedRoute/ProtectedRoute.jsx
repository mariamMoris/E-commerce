import React from 'react'
import { useContext } from 'react'
import { authContext } from '../../contexts/Authcontext'
import Login from '../Login/Login'

export default function ProtectedRoute({children}) {
    const {isLoggin, setIsLoggin} = useContext(authContext)
  return <>
        {isLoggin ? children : <Login/>}
        {/* isLoggin ? children : <Navigate to = "/login"/> */}
    </>
  
}
