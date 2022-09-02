import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Routes, Route, useMatch } from 'react-router-dom'

import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Login from './components/Login'
import Info from './components/Info'
import Users from './components/Users'
import User from './components/User'

import { setInitUser } from './reducers/userReducer'
import { setInitUsers } from './reducers/usersReducer'
import { logout } from './reducers/userReducer'
import { getInitialBlogs } from './reducers/blogReducer'

import './index.css'

const App = () => {
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  const { name } = user
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setInitUser())
  }, [])

  useEffect(() => {
    dispatch(setInitUsers())
  }, [])

  useEffect(() => {
    dispatch(getInitialBlogs())
  }, [])

  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')

  const userSelected = matchUser
    ? users.find((item) => item.id === matchUser.params.id)
    : null

  const blogSelected = matchBlog
    ? blogs.find((item) => item.id === matchBlog.params.id)
    : null

  return (
    <div>
      <Info />
      <h2>blogs</h2>
      <p>{name} logged in</p>
      <button onClick={() => dispatch(logout())}>Logout</button>
      {user.username ? (
        <Routes>
          <Route
            path='/users/:id'
            element={<User userSelected={userSelected} />}
          />
          <Route
            path='/blogs/:id'
            element={<Blog blogSelected={blogSelected} />}
          />
          <Route path='/users' element={<Users />} />
          <Route path='/' element={<Blogs />} />
        </Routes>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default App
