import React, { useState } from 'react'

const Login = ({ loginUser }) => {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  })

  const { username, password } = loginForm

  const handleLoginFormChange = (e) => {
    const { name, value } = e.target
    setLoginForm({ ...loginForm, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await loginUser(loginForm)
      setLoginForm({ username: '', password: '' })
    } catch (error) {
      setLoginForm({ username: '', password: '' })
      const message = error.response.data.error
      console.log(message, 'error')
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
      <button type='submit'>Login</button>
    </form>
  )
}

export default Login
