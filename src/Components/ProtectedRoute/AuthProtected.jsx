import React from 'react'
import { useContext } from 'react'
import { authContext } from '../../contexts/Authcontext'
import { Navigate } from 'react-router-dom'
import Home from '../Home/Home'
import Login from '../Login/Login'

export default function AuthProtected({children}) {
    const {isLoggin, setIsLoggin} = useContext(authContext)
  return <>
      {isLoggin? <Navigate to ={"/home"}/> : children}
    </>
  
}
