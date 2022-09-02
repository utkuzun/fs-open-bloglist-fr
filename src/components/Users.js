import React from 'react'
import { useSelector } from 'react-redux/es/exports'

const Users = () => {
  const users = useSelector((state) => state.users)
  console.log(users)

  return (
    <>
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
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
