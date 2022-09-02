import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blogs from './components/Blogs'
import Login from './components/Login'
import Info from './components/Info'
import Users from './components/Users'

import { setInitUser } from './reducers/userReducer'
import { setInitUsers } from './reducers/usersReducer'

import './index.css'

const App = () => {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setInitUser())
  }, [])

  useEffect(() => {
    dispatch(setInitUsers())
  }, [])

  return (
    <div>
      <Info />
      {user.username ? (
        <>
          <Blogs />
          <Users />
        </>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default App
