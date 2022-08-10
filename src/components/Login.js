import React from 'react'

const Login = ({ loginForm, handleLoginFormChange, handleSubmit }) => {
  const { username, password } = loginForm

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
