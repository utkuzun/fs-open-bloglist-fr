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

  const [blogForm, setBlogForm] = useState({ title: '', author: '', url: '' })

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      setUser(user)
      blogService.createAuthToken(user)
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
      setLoginForm({ username: '', password: '' })
      console.log(error.response.data.error)
    }
  }

  const handleAddblogSubmit = async (e) => {
    e.preventDefault()
    try {
      const { blog } = await blogService.addBlog(blogForm)
      setBlogs([...blogs, blog])
      setBlogForm({ title: '', author: '', url: '' })
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  const handleLoginFormChange = (e) => {
    const { name, value } = e.target
    setLoginForm({ ...loginForm, [name]: value })
  }
  const handleBlogFormChange = (e) => {
    const { name, value } = e.target
    setBlogForm({ ...blogForm, [name]: value })
  }

  const logout = () => {
    setUser({})
    window.localStorage.removeItem('user')
    blogService.removeToken()
  }

  return (
    <div>
      {user.username ? (
        <Blogs
          blogs={blogs}
          user={user}
          logout={logout}
          blogForm={blogForm}
          handleBlogFormChange={handleBlogFormChange}
          handleAddblogSubmit={handleAddblogSubmit}
        />
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
