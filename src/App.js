import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Info from './components/Info'

import blogService from './services/blogs'

import './index.css'

import authService from './services/auth'

const App = () => {
  const [user, setUser] = useState({})

  const [info, setInfo] = useState({ message: '', status: '' })

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
    } catch (error) {
      const message = error.response.data.error
      logInfo(message, 'error')
    }
  }

  const logout = () => {
    setUser({})
    window.localStorage.removeItem('user')
    blogService.removeToken()
  }

  const logInfo = (message, status) => {
    setInfo({ message, status })
    setTimeout(() => {
      setInfo({ message: '', status: '' })
    }, 5000)
  }

  return (
    <div>
      <Info info={info} />
      {user.username ? (
        <Blogs user={user} logout={logout} logInfo={logInfo} />
      ) : (
        <Login loginUser={loginUser} />
      )}
    </div>
  )
}

export default App
