import React from 'react'

import { Link } from 'react-router-dom'

const User = ({ userSelected: user }) => {
  if (!user) {
    return null
  }

  const { blogs, name } = user

  return (
    <section>
      <h3>{name}</h3>
      <h4>added blogs</h4>
      {blogs.length > 0 ? (
        <ul className='blog-list flex-col'>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>no blogs posted</p>
      )}
    </section>
  )
}

export default User
