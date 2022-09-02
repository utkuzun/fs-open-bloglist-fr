import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { loginUser } from '../reducers/userReducer'
import { displayInfo } from '../reducers/infoReducer'

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  })

  const { username, password } = loginForm

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLoginFormChange = (e) => {
    const { name, value } = e.target
    setLoginForm({ ...loginForm, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(loginUser(loginForm))
      setLoginForm({ username: '', password: '' })
      const message = `user ${username} logged in`
      navigate('/')
      dispatch(displayInfo(message, 'success'))
    } catch (error) {
      setLoginForm({ username: '', password: '' })
      const message = error.response.data.error
      dispatch(displayInfo(message, 'error'))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor='username'>username</label>
        <input
          type='text'
          name='username'
          value={username}
          onChange={handleLoginFormChange}
        />
      </div>
      <div>
        <label htmlFor='password'>password</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={handleLoginFormChange}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default Login
