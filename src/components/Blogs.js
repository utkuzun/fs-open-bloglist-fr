import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, user, logout }) => {
  const { name } = user
  return (
    <div>
      <h2>blogs</h2>
      <p>{name} logged in</p>
      <button onClick={logout}>Logout</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Blogs
