import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Info from './components/Info'

import './index.css'

import blogService from './services/blogs'
import authService from './services/auth'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState({})

  const [info, setInfo] = useState({ message: '', status: '' })

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

  useEffect(() => {
    const newBlogs = blogs
    setBlogs(newBlogs)
  }, [blogs])

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

  const createBlog = async (blogForm) => {
    try {
      const { blog } = await blogService.addBlog(blogForm)
      setBlogs([...blogs, blog])
      logInfo('Blog added', 'success')
    } catch (error) {
      const message = error.response.data.error
      logInfo(message, 'error')
    }
  }

  const updateBlog = async (blog) => {
    try {
      const { blog: blogAdded } = await blogService.updateBlog(blog)
      const newBlogs = blogs.map((item) =>
        blog.id === item.id ? blogAdded : item
      )
      setBlogs(newBlogs)
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
        <Blogs
          blogs={blogs.sort((a, b) => b.likes - a.likes)}
          user={user}
          logout={logout}
          createBlog={createBlog}
          updateBlog={updateBlog}
        />
      ) : (
        <Login loginUser={loginUser} />
      )}
    </div>
  )
}

export default App
