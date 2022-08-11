import React from 'react'
import Blog from './Blog'
import AddBlog from './AddBlog'
import ToggleBox from './ToggleBox'

const Blogs = ({ blogs, user, logout, createBlog, updateBlog, removeBlog }) => {
  const { name } = user
  return (
    <div>
      <h2>blogs</h2>
      <p>{name} logged in</p>
      <button onClick={logout}>Logout</button>
      <br />
      <ToggleBox buttonLabel={'add blog'}>
        <AddBlog createBlog={createBlog} />
      </ToggleBox>
      <br />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  )
}

export default Blogs
