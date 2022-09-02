import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Routes, Route, useMatch } from 'react-router-dom'

import Blogs from './components/Blogs'
import Login from './components/Login'
import Info from './components/Info'
import Users from './components/Users'
import User from './components/User'

import { setInitUser } from './reducers/userReducer'
import { setInitUsers } from './reducers/usersReducer'
import { logout } from './reducers/userReducer'

import './index.css'

const App = () => {
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

  const { name } = user
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setInitUser())
  }, [])

  useEffect(() => {
    dispatch(setInitUsers())
  }, [])

  const match = useMatch('/users/:id')

  const userSelected = match
    ? users.find((item) => item.id === match.params.id)
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
