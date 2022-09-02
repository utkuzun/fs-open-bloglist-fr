import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blogs from './components/Blogs'
import Login from './components/Login'
import Info from './components/Info'

import { setInitUser } from './reducers/userReducer'

import './index.css'

const App = () => {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setInitUser())
  }, [])

  return (
    <div>
      <Info />
      {user.username ? <Blogs /> : <Login />}
    </div>
  )
}

export default App
