import React from 'react'

const User = ({ userSelected: user }) => {
  if (!user) {
    return null
  }

  const { blogs, name } = user

  return (
    <>
      <h3>{name}</h3>
      <h4>added blogs</h4>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
