import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'

import blogService from './services/blogs'
import authService from './services/auth'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState({})
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  })

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await authService.login(loginForm)
      setUser(user)
      setLoginForm({ username: '', password: '' })
      blogService.createAuthToken(user)
      window.localStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  const handleLoginFormChange = (e) => {
    const { name, value } = e.target
    setLoginForm({ ...loginForm, [name]: value })
  }

  const logout = () => {
    setUser({})
    window.localStorage.removeItem('user')
  }

  return (
    <div>
      {user.username ? (
        <Blogs blogs={blogs} user={user} logout={logout} />
      ) : (
        <Login
          loginForm={loginForm}
          handleSubmit={handleSubmit}
          handleLoginFormChange={handleLoginFormChange}
        />
      )}
    </div>
  )
}

export default App
