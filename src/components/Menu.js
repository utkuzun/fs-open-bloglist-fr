import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'

const Menu = () => {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const { name } = user

  return (
    <nav>
      {user.username ? (
        <>
          <Link to='/'>blogs</Link>
          <Link to='/users'>users</Link>
          <p>{name} logged in</p>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </>
      ) : null}
    </nav>
  )
}

export default Menu
