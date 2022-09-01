import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Blogs from './components/Blogs'
import Login from './components/Login'
import Info from './components/Info'

import blogService from './services/blogs'

import { displayInfo } from './reducers/infoReducer'

import './index.css'

import authService from './services/auth'

const App = () => {
  const [user, setUser] = useState({})

  const dispatch = useDispatch()

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      setUser(user)
      blogService.createAuthToken(user)
    }
  }, [])

  const loginUser = async (loginForm) => {
    try {
      const user = await authService.login(loginForm)
      setUser(user)
      blogService.createAuthToken(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      const message = `user ${user.name} logged in`
      dispatch(displayInfo(message, 'success'))
    } catch (error) {
      const message = error.response.data.error
      dispatch(displayInfo(message, 'error'))
    }
  }

  const logout = () => {
    setUser({})
    window.localStorage.removeItem('user')
    blogService.removeToken()
  }

  return (
    <div>
      <Info />
      {user.username ? (
        <Blogs user={user} logout={logout} />
      ) : (
        <Login loginUser={loginUser} />
      )}
    </div>
  )
}

export default App
