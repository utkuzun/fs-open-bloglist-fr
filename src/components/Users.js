import React from 'react'
import { useSelector } from 'react-redux/es/exports'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <section>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              <h4>blogs created</h4>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>{' '}
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Users
