import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'

const Menu = () => {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const { name } = user

  if (!user.username) {
    return null
  }

  return (
    <nav>
      <div className='nav-links flex'>
        <Link to='/'>blogs</Link>
        <Link to='/users'>users</Link>
      </div>
      <div className='nav-info flex'>
        <p>{name} logged in</p>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
    </nav>
  )
}

export default Menu
