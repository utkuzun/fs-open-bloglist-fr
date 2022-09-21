import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Routes, Route, useMatch, Navigate } from 'react-router-dom'

import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Login from './components/Login'
import Info from './components/Info'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu'

import { setInitUser } from './reducers/userReducer'
import { setInitUsers } from './reducers/usersReducer'
import { getInitialBlogs } from './reducers/blogReducer'

import './index.css'

const App = () => {
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

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
    <main>
      <Menu />
      <Info />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path='/users/:id'
          element={<User userSelected={userSelected} />}
        />
        <Route
          path='/blogs/:id'
          element={<Blog blogSelected={blogSelected} />}
        />
        <Route path='/users' element={<Users />} />
        <Route
          path='/'
          element={user.username ? <Blogs /> : <Navigate replace to='/login' />}
        />
      </Routes>
    </main>
  )
}

export default App
